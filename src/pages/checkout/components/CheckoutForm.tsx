import React, { useEffect, useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { send } from '@emailjs/browser';

import { ROUTES } from '@/constants';
import { cn } from '@/utils';
import { useCart } from '@/hooks';
import { GetDeliveryOptionDTO, GetTaxDTO, getTaxes } from '@/api';
import { Button, Checkbox, Radio } from '@/components';

import { OrderSummary } from './OrderSummary';
import { OrderSuccessModal } from './OrderSuccessModal';

const CheckoutForm: React.FC = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const validationSchema = useMemo(
    () =>
      z.object({
        fullName: z
          .string()
          .min(1, t('form_common.required_field_error'))
          .regex(/^[А-Яа-яA-Za-z\s-]+$/, t('checkout_form.full_name_field_error')),
        phoneNumber: z
          .string()
          .min(1, t('form_common.required_field_error'))
          .regex(/^\d+$/, t('checkout_form.phone_number_field_error')),
        email: z.string().min(1, t('form_common.required_field_error')).email(t('form_common.invalid_field_error')),
        deliveryMethod: z.string(),
        comment: z.string().optional(),
        personalData: z.boolean().refine(value => value === true, t('form_common.required_field_error')),
      }),
    [i18n.language],
  );

  type FormDataType = z.infer<typeof validationSchema>;

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    control,
    watch,
    reset,
  } = useForm<FormDataType>({
    defaultValues: {
      fullName: '',
      phoneNumber: '',
      email: '',
      deliveryMethod: 'pickup',
      comment: '',
      personalData: false,
    },
    resolver: zodResolver(validationSchema),
    mode: 'all',
  });

  useEffect(() => {
    reset();
  }, [i18n.language]);

  const deliveryMethod = watch('deliveryMethod');

  const { data: taxes } = useQuery(['taxes'], () => getTaxes(), {
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    retry: 2,
  });

  const { cartItems, netPrice, discount, deliveryOptions, deleteProducts } = useCart();

  let selectedDeliveryOption: GetDeliveryOptionDTO | undefined;
  let vatTax: GetTaxDTO['data'] | undefined;
  let totalPrice: number | undefined;
  let vat: number | undefined;

  if (deliveryOptions && taxes) {
    vatTax = taxes.data.find(tax => tax.type === 'vat');
    selectedDeliveryOption = deliveryOptions.find(option => option.type === deliveryMethod);
    vat = vatTax!.value * netPrice;
    totalPrice = netPrice - discount + selectedDeliveryOption!.price + vat;
  }

  const [showModal, setShowModal] = useState(false);

  const onSubmit = async (data: FormDataType) => {
    const products = cartItems.map(product => ({
      id: product.id,
      product: `${product.productType} ${product.manufacturer} ${product.model}`,
      price: product.price,
      quantity: product.quantity,
      totalProductPrice: product.price * product.quantity,
    }));

    const options = {
      productsCount: cartItems.reduce((total, product) => total + product.quantity, 0),
      deliveryType: selectedDeliveryOption!.label,
      deliveryPrice: selectedDeliveryOption!.price,
      products,
      vat: vat,
      totalPrice,
      customerFullName: data.fullName,
      customerEmail: data.email,
      customerPhoneNumber: data.phoneNumber,
      customerComment: data.comment,
    };

    const responseStatus = await send(
      import.meta.env.VITE_EMAILJS_SERVICE_1_ID,
      import.meta.env.VITE_EMAILJS_ORDER_TEMPLATE,
      options,
      {
        publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY_1,
      },
    );

    setShowModal(true);
    reset();
  };

  const handleModalClose = () => {
    deleteProducts();
    setShowModal(false);
    navigate(ROUTES.HOME);
  };

  if (!deliveryOptions) {
    return (
      <div className="w-full">
        <p className="text-error text-xl 2xl:text-2xl text-center px-4 py-2.5">{t('common_messages.server_error')}</p>
      </div>
    );
  }

  return (
    <form autoComplete="off" onSubmit={handleSubmit(onSubmit)} className="relative">
      <div className="grid 2xl:grid-cols-[1fr_1fr_33%] 2xl:gap-x-5 gap-y-12 3xl:gap-y-16">
        <div className="2xl:col-span-2 flex flex-col gap-8">
          <h2 className="text-xl 2xl:text-2xl">{t('checkout_form.personal_data_label')}</h2>
          <div className="grid 2xl:grid-rows-2 2xl:grid-cols-2 gap-5">
            <div className="relative flex flex-col gap-1">
              <label
                htmlFor="fullName"
                className={cn('text-xl 2xl:text-2xl', errors.fullName ? 'text-error' : 'text-neutral-900/65')}
              >
                {t('checkout_form.full_name_field')}
              </label>
              <input
                id="fullName"
                type="text"
                className="text-xl 2xl:text-2xl border border-neutral-900/65 rounded h-12"
                {...register('fullName')}
              />
              {errors.fullName && (
                <p className="absolute right-0 top-1 text-error text-base">{errors.fullName.message}</p>
              )}
            </div>
            <div className="relative flex flex-col gap-1">
              <label
                htmlFor="phoneNumber"
                className={cn('text-xl 2xl:text-2xl', errors.phoneNumber ? 'text-error' : 'text-neutral-900/65')}
              >
                {t('checkout_form.phone_number_field')}
              </label>
              <input
                id="phoneNumber"
                type="text"
                className="text-xl 2xl:text-2xl border border-neutral-900/65 rounded h-12"
                {...register('phoneNumber')}
              />
              {errors.phoneNumber && (
                <p className="absolute right-0 top-1 text-error text-base">{errors.phoneNumber.message}</p>
              )}
            </div>
            <div className="relative flex flex-col gap-1">
              <label
                htmlFor="email"
                className={cn('text-xl 2xl:text-2xl', errors.email ? 'text-error' : 'text-neutral-900/65')}
              >
                Email
              </label>
              <input
                id="email"
                type="text"
                className="text-xl 2xl:text-2xl border border-neutral-900/65 rounded h-12"
                {...register('email')}
              />
              {errors.email && <p className="absolute right-0 top-1 text-error text-base">{errors.email.message}</p>}
            </div>
          </div>
        </div>
        <div className="2xl:row-start-2 flex flex-col gap-5">
          <div className="flex flex-col gap-8">
            <h2 className="text-xl 2xl:text-2xl">{t('checkout_form.delivery_method_label')}</h2>
            <div className="flex flex-col gap-2.5">
              {deliveryOptions.map(option => (
                <div key={option.id} className="flex items-center gap-5">
                  <Controller
                    name="deliveryMethod"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Radio
                        variant="checkbox"
                        id={option.id.toString()}
                        checked={value === option.type}
                        onChange={() => onChange(option.type)}
                      />
                    )}
                  />
                  <label htmlFor={option.id.toString()} className="opacity-65 text-xl 2xl:text-2xl">
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
            {deliveryMethod === 'pickup' && (
              <p className="text-xl 2xl:text-2xl">{t('checkout_form.pickup_delivery_method_message')}</p>
            )}
          </div>
          <div className="relative flex flex-col gap-1">
            <label htmlFor="comment" className="opacity-65 text-xl 2xl:text-2xl">
              {t('checkout_form.comment_field')}
            </label>
            <input
              id="comment"
              type="text"
              className="text-xl 2xl:text-2xl border border-neutral-900/65 rounded h-12"
              {...register('comment')}
            />
          </div>
        </div>
        <div className="hidden 2xl:flex col-start-3 row-span-2 flex-col gap-6">
          <div>
            <OrderSummary selectedDeliveryMethod={deliveryMethod} />
            <Button type="submit" variant="outline" className="font-medium rounded w-full h-12">
              {t('checkout_form.submit_button')}
            </Button>
            <OrderSuccessModal open={showModal} onClose={handleModalClose} />
          </div>
          <div className="hidden 2xl:flex gap-6">
            <Controller
              name="personalData"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Checkbox id="personalData" checked={value} onChange={() => onChange(!value)} />
              )}
            />
            <div>
              <label htmlFor="personalData" className="text-xl 2xl:text-2xl opacity-65 underline">
                {t('checkout_form.personal_data_processing_agreement')}
              </label>
              {errors.personalData && <p className="text-error text-base">{errors.personalData?.message}</p>}
            </div>
          </div>
        </div>
      </div>
      <div className="2xl:hidden flex gap-6 mt-12 3xl:mt-16">
        <Controller
          name="personalData"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Checkbox id="personalData" checked={value} onChange={() => onChange(!value)} />
          )}
        />
        <div>
          <label htmlFor="personalData" className="text-xl 2xl:text-2xl opacity-65 underline">
            {t('checkout_form.personal_data_processing_agreement')}
          </label>
          {errors.personalData && <p className="text-error text-base">{errors.personalData?.message}</p>}
        </div>
      </div>
      <div className="2xl:hidden mt-12">
        <OrderSummary selectedDeliveryMethod={deliveryMethod} />
        <Button type="submit" disabled={isSubmitting} variant="outline" className="font-medium rounded w-full h-12">
          {t('checkout_form.submit_button')}
        </Button>
        <OrderSuccessModal open={showModal} onClose={handleModalClose} />
      </div>
    </form>
  );
};

export { CheckoutForm };
