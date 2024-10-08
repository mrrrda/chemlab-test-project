import React from 'react';
import { useTranslation } from 'react-i18next';

import Layout from '../layout';
import { CheckoutForm } from './components';

const CheckoutPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Layout>
      <main className="px-8 md:px-14 lg:px-20 2xl:px-26 mb-10 2xl:mb-16">
        <div className="flex flex-col gap-12 3xl:gap-16">
          <h1 className="text-5xl">{t('checkout_page.title')}</h1>
          <div className="flex gap-5">
            <div className="grow-2">
              <CheckoutForm />
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export { CheckoutPage };
