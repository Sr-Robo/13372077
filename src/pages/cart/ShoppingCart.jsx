import Area from '@components/common/Area.js';
import { useCartState } from '@components/frontStore/cart/CartContext.js';
import { CartItems } from '@components/frontStore/cart/CartItems.js';
import { CartTotalSummary } from '@components/frontStore/cart/CartTotalSummary.js';
import { CouponForm } from '@components/frontStore/CouponForm.js';
import { DefaultCartItemList } from '@components/frontStore/cart/DefaultCartItemList.js';
import { ShoppingCartEmpty } from '@components/frontStore/cart/ShoppingCartEmpty.js';
import { _ } from '@evershop/evershop/lib/locale/translate/_';
import React from 'react';
import './ShoppingCartOverride.scss';

const Title = () => {
  return (
    <div className="shopping-cart-header mb-8 text-center">
      <h1 className="shopping-cart-title cpk-h1 tracking-tight" style={{ color: 'var(--cpk-color-contrast)' }}>
        {_('CARRINHO')}
      </h1>
    </div>
  );
};

export default function ShoppingCart({ checkoutUrl }) {
  const { data: cart } = useCartState();
  return (
    <div className="cart cpl-cart-wrap page-width mt-10 mb-20">
      {cart.items.length > 0 ? (
        <>
          <Title />
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_360px] items-start">
            <div className="cpl-cart-items-wrap">
              <CartItems>
                {({ items, showPriceIncludingTax, loading, onRemoveItem }) => (
                  <DefaultCartItemList
                    items={items}
                    showPriceIncludingTax={showPriceIncludingTax}
                    loading={loading}
                    onRemoveItem={onRemoveItem}
                  />
                )}
              </CartItems>
              <div className="cpl-coupon-form">
                <CouponForm />
              </div>
              <Area id="shoppingCartAfterItems" noOuter />
            </div>

            <div className="cart-summary cpl-cart-summary cpk-order-summary">
              <Area id="shoppingCartBeforeSummary" noOuter />

              <div className="summary-content">
                <CartTotalSummary />
              </div>

              <Area id="shoppingCartBeforeCheckoutButton" noOuter />

              <div className="shopping-cart-checkout-btn mt-6">
                <button
                  onClick={() => (window.location.href = checkoutUrl)}
                  className="cpk-btn cpk-glitch w-full cpk-glitch-btn group"
                  data-text={_('Proceed to checkout')}
                >
                  <span className="cpk-btn-bg" aria-hidden="true" />
                  {_('Proceed to checkout')}
                </button>
              </div>

              <a
                href="/"
                className="mt-6 block text-center text-sm continue-shopping-link"
              >
                {_('Continuar comprando')}
              </a>
              <Area id="shoppingCartAfterSummary" noOuter />
            </div>
          </div>
        </>
      ) : (
        <ShoppingCartEmpty />
      )}
    </div>
  );
}

export const layout = {
  areaId: 'content',
  sortOrder: 15
};

export const query = `
  query Query {
    checkoutUrl: url(routeId: "checkout")
  }
`;
