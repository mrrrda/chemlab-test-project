import React from 'react';
import { useTranslation } from 'react-i18next';

import { useCart } from '@/hooks';
import { Button } from '@/components';

import { ProductItem } from './ProductItem';
import { CartSummary } from './CartSummary';

const CartContents: React.FC = () => {
  const { cartItems, putProducts, selectedProductsQuantity, netPrice, discount, deliveryOptions } = useCart();
  const { t } = useTranslation();

  const handleSelectAll = () => {
    if (cartItems.some(cartItem => !cartItem.selected)) {
      putProducts(cartItems.map(cartItem => ({ ...cartItem, selected: true })));
    } else {
      putProducts(cartItems.map(cartItem => ({ ...cartItem, selected: false })));
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <Button variant="text" className="underline p-0 mr-auto text-xl 2xl:text-2xl" onClick={handleSelectAll}>
        {t('shopping_cart_page.select_all_button')}
      </Button>
      <div className="flex flex-col 2xl:flex-row gap-12">
        <div className="grow">
          {cartItems
            .filter(product => product.quantity > 0)
            .map(product => (
              <ProductItem key={product.id} {...product} />
            ))}
        </div>
        <div className="2xl:w-1/3">
          <CartSummary
            productsCount={selectedProductsQuantity}
            netTotalPrice={netPrice}
            discount={discount}
            deliveryOptions={deliveryOptions}
          />
        </div>
      </div>
    </div>
  );
};

export { CartContents };
