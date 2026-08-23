import PropTypes from 'prop-types';
import React from 'react';
import { Name } from '@components/frontStore/catalog/product/list/item/Name';
import { Thumbnail } from '@components/frontStore/catalog/product/list/item/Thumbnail';
import { Price } from '@components/frontStore/catalog/product/list/item/Price';
import { Rating } from '@components/frontStore/catalog/product/list/item/Rating';
import Area from '@components/common/Area';
import { get } from '@evershop/evershop/lib/util/get';
import { _ } from '@evershop/evershop/lib/locale/translate/_';
import './List.scss';

export default function ProductList({ products = [], countPerRow = 3 }) {
  if (products.length === 0) {
    return (
      <div className="product-list-empty">
        <div className="text-center">{_('There is no product to display')}</div>
      </div>
    );
  }

  // Refatorado da referência: usar o layout em grid CSS padrão do site para colunas flexíveis.
  // 1 coluna = sm, 2 = md, countPerRow = lg
  const colClass = `products-grid cols-${countPerRow}`;

  return (
    <ul className={colClass}>
      {products.map((p) => (
        <li key={p.productId} className="product-item">
          <Area
            id="productListingItem"
            className="product-item-inner"
            product={p}
            coreComponents={[
              {
                component: { default: Thumbnail },
                props: { url: p.url, imageUrl: get(p, 'image.url'), alt: p.name, isSpecial: p.price?.special?.value < p.price?.regular?.value },
                sortOrder: 10,
                id: 'thumbnail'
              },
              {
                component: { default: Name },
                props: { name: p.name, url: p.url, id: p.productId },
                sortOrder: 20,
                id: 'name'
              },
              {
                // Decorativo por enquanto (sem sistema de avaliações) — ver Rating.jsx
                component: { default: Rating },
                sortOrder: 25,
                id: 'rating'
              },
              {
                component: { default: Price },
                props: { ...p.price },
                sortOrder: 30,
                id: 'price'
              }
            ]}
          />
        </li>
      ))}
    </ul>
  );
}

ProductList.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      sku: PropTypes.string,
      productId: PropTypes.number,
      url: PropTypes.string,
      price: PropTypes.shape({
        regular: PropTypes.shape({
          value: PropTypes.number,
          text: PropTypes.string
        }),
        special: PropTypes.shape({
          value: PropTypes.number,
          text: PropTypes.string
        })
      }),
      image: PropTypes.shape({
        alt: PropTypes.string,
        listing: PropTypes.string
      })
    })
  ).isRequired,
  countPerRow: PropTypes.number.isRequired
};
