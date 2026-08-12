import { _ } from '@evershop/evershop/lib/locale/translate/_';
import React from 'react';

export function ShoppingCartEmpty() {
  return (
    <div className="empty-shopping-cart w-full flex justify-center py-20">
      <div className="text-center cpl-empty-cart">
        <h2 className="cpk-h2 mb-4" style={{ color: 'var(--cpk-color-contrast)' }}>{_('CARRINHO')}</h2>
        <div className="mt-2 text-center text-muted-foreground mb-8">
          <span style={{ color: 'var(--cpk-color-contrast-muted)' }}>{_('Seu carrinho está vazio.')}</span>
        </div>
        <div className="flex justify-center mt-8">
          <button 
            onClick={() => (window.location.href = '/')}
            className="cpk-btn cpk-glitch" 
            data-text={_('Retornar à loja')}
          >
            <span className="cpk-btn-bg" aria-hidden="true" />
            <span className="flex space-x-2 items-center">
              <span className="self-center uppercase">
                {_('Retornar à loja')}
              </span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
