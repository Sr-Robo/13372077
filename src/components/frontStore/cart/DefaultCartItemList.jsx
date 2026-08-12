import { Area } from '@components/common/Area.js';
import { Image } from '@components/common/Image.js';
import { ProductNoThumbnail } from '@components/common/ProductNoThumbnail.js';
import { useCatalogImageDimensions } from '@components/common/useCatalogImageDimensions.js';
import { CartItem } from '@components/frontStore/cart/CartContext.js';
import { ItemQuantity } from '@components/frontStore/cart/ItemQuantity.js';
import { _ } from '@evershop/evershop/lib/locale/translate/_';
import { deriveProductImageSize } from '@evershop/evershop/lib/util/deriveProductImageSize.js';
import { Minus, Plus, Trash2 } from 'lucide-react';
import React from 'react';

/**
 * Re-skin (2026-07-10): a flex line-item list matching the reference — 96px
 * bordered thumbnail, then a content block with name/SKU/variant + line total
 * on the top row and the qty stepper + Remove on the bottom row, items divided
 * by rules. (Was a 3-column ExtendableTable.)
 */
export const DefaultCartItemList = ({
  items,
  showPriceIncludingTax = true,
  loading = false,
  onRemoveItem
}) => {
  // Fixed 96px square display (h-24 w-24 + object-cover); base 200 keeps it sharp on retina.
  const thumbSize = deriveProductImageSize(200, useCatalogImageDimensions());
  return (
    <>
      <Area id="cartItemListBefore" noOuter />

      <div className="cpl-cart-table-header hidden md:flex justify-between px-2">
        <div className="w-[60%]">{_('Produto')}</div>
        <div className="w-[40%] flex justify-between text-right">
          <div className="w-1/3">{_('Preço')}</div>
          <div className="w-1/3 text-center">{_('Qtd')}</div>
          <div className="w-1/3">{_('Subtotal')}</div>
        </div>
      </div>

      <div className="cart__items divide-y">
        {items.map((row) => {
          const totalValue = showPriceIncludingTax
            ? row.lineTotalInclTax?.text
            : row.lineTotal?.text;
          const priceValue = showPriceIncludingTax
            ? row.sellPriceInclTax?.text
            : row.sellPrice?.text;

          return (
            <div key={row.cartItemId} className="cart__item flex flex-col md:flex-row gap-6 py-6 items-start md:items-center">
              <div className="flex gap-4 w-full md:w-[60%]">
                <div className="shrink-0">
                  {row.thumbnail ? (
                    <Image
                      src={row.thumbnail}
                      alt={row.productName}
                      width={thumbSize.width}
                      height={thumbSize.height}
                      sizes="100px"
                      objectFit="cover"
                      className="h-24 w-24 border cpl-product-image"
                    />
                  ) : (
                    <div className="h-24 w-24 border cpl-product-image flex items-center justify-center">
                      <ProductNoThumbnail width={96} height={96} />
                    </div>
                  )}
                </div>
                <div className="flex flex-col justify-center min-w-0">
                  <a
                    href={row.productUrl}
                    className="font-medium hover:underline mb-1"
                    style={{ color: 'var(--cpk-color-contrast)' }}
                  >
                    {row.productName}
                  </a>
                  <div className="mt-1 text-xs text-muted-foreground">
                    {_('SKU: ${sku}', { sku: row.productSku })}
                  </div>
                  {row.variantOptions?.map((option) => (
                    <div
                      key={option.optionId}
                      className="mt-0.5 text-xs text-muted-foreground"
                    >
                      {option.attributeName}: {option.optionText}
                    </div>
                  ))}
                  {row.errors?.map((error, index) => (
                    <div key={index} className="mt-0.5 text-xs text-destructive">
                      {error}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex w-full md:w-[40%] justify-between items-center text-right mt-4 md:mt-0">
                <div className="w-1/3 hidden md:block cpl-item-price">
                  {priceValue || totalValue}
                </div>

                <div className="w-auto md:w-1/3 flex justify-center">
                  <ItemQuantity
                    initialValue={row.qty}
                    cartItemId={row.cartItemId}
                    min={1}
                    max={99}
                  >
                    {({ quantity, increase, decrease }) => (
                      <div className="inline-flex items-center border cpl-quantity-selector">
                        <button
                          onClick={decrease}
                          disabled={loading || quantity <= 1}
                          className="p-2 text-muted-foreground disabled:opacity-40"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-8 text-center text-sm tabular-nums" style={{ color: 'var(--cpk-color-contrast)' }}>
                          {quantity}
                        </span>
                        <button
                          onClick={increase}
                          disabled={loading}
                          className="p-2 text-muted-foreground disabled:opacity-40"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    )}
                  </ItemQuantity>
                </div>

                <div className="w-auto md:w-1/3 flex flex-col items-end gap-2">
                  <div className="cpl-item-subtotal tabular-nums">
                    {totalValue}
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      onRemoveItem?.(row.cartItemId);
                    }}
                    className="inline-flex items-center gap-1 mt-1 text-destructive"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    <span>{_('Remover')}</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <Area id="cartItemListAfter" noOuter />
    </>
  );
};
