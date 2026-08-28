import React from 'react';
import { useProduct } from '@components/frontStore/catalog/ProductContext';
import { Editor } from '@components/common/Editor';
import PlaceholderNotice from '@components/PlaceholderNotice';

// E5: Tabs CSS-only (radio hack) substituindo a descrição e atributos do
// core. Três abas:
//   1. Descrição — product.description via <Editor>
//   2. Informações adicionais — SKU + attributes em .cpk-meta-list
//   3. Avaliações — 1 review fake + form visual (sem gravação)
//
// Mecânica: <input type="radio" name="cpk-product-tab"> sr-only, <label>
// como botão de aba, painéis controlados por :checked ~ .cpk-tab-panel.
// Zero JavaScript.

export default function ProductSingleTabs() {
  const product = useProduct();

  // Montar lista de specs (mesma lógica do core ProductSingleAttributes)
  const specs = product.attributes
    ? [
        { attributeCode: 'sku', attributeName: 'SKU', optionText: product.sku },
        ...product.attributes
      ]
    : [{ attributeCode: 'sku', attributeName: 'SKU', optionText: product.sku }];

  return (
    <div className="cpk-tabs">
      {/* ── Radios (sr-only) ── */}
      <input
        type="radio"
        name="cpk-product-tab"
        id="cpk-tab-desc"
        className="cpk-tab-radio"
        defaultChecked
      />
      <input
        type="radio"
        name="cpk-product-tab"
        id="cpk-tab-info"
        className="cpk-tab-radio"
      />
      <input
        type="radio"
        name="cpk-product-tab"
        id="cpk-tab-reviews"
        className="cpk-tab-radio"
      />

      {/* ── Labels (botões de aba) ── */}
      <div className="cpk-tab-labels">
        <label htmlFor="cpk-tab-desc" className="cpk-tab-label">
          Descrição
        </label>
        <label htmlFor="cpk-tab-info" className="cpk-tab-label">
          Informações adicionais
        </label>
        <label htmlFor="cpk-tab-reviews" className="cpk-tab-label">
          Avaliações
        </label>
      </div>

      {/* ── Painel: Descrição ── */}
      <div className="cpk-tab-panel cpk-tab-panel--desc">
        {product.description && product.description.length > 0 ? (
          <Editor rows={product.description} />
        ) : (
          <p className="cpk-text-muted">Sem descrição disponível.</p>
        )}
      </div>

      {/* ── Painel: Informações adicionais ── */}
      <div className="cpk-tab-panel cpk-tab-panel--info">
        <dl className="cpk-meta-list">
          {specs.map((attr) => (
            <div key={attr.attributeCode}>
              <dt>{attr.attributeName}</dt>
              <dd>{attr.optionText}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* ── Painel: Avaliações ── */}
      <div className="cpk-tab-panel cpk-tab-panel--reviews">
        {/* Review fake (layout-only) */}
        <div className="cpk-review">
          <div className="cpk-review__header">
            <div className="cpk-review__avatar" aria-hidden="true">M</div>
            <div className="cpk-review__meta">
              <strong className="cpk-review__author">Maria S.</strong>
              <span className="cpk-review__date">22 de agosto de 2026</span>
            </div>
            <div className="cpk-rating cpk-review__stars" aria-hidden="true">
              {Array.from({ length: 5 }, (_, i) => (
                <svg
                  key={i}
                  className="cpk-star"
                  viewBox="0 0 24 24"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              ))}
            </div>
          </div>
          <p className="cpk-review__body">
            Produto excelente! A qualidade do material é muito boa e o design
            ficou incrível. Recomendo demais pra quem curte o estilo.
          </p>
        </div>

        {/* Form de avaliação (visual-only, sem gravação) */}
        <div className="cpk-review-form">
          <h4 className="cpk-review-form__title">Deixe sua avaliação</h4>

          <div className="cpk-review-form__stars">
            <span className="cpk-review-form__label">Sua nota:</span>
            <div className="cpk-rating" aria-hidden="true">
              {Array.from({ length: 5 }, (_, i) => (
                <svg
                  key={i}
                  className="cpk-star"
                  viewBox="0 0 24 24"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              ))}
            </div>
          </div>

          <textarea
            className="cpk-review-form__textarea"
            placeholder="Escreva sua avaliação…"
            rows={4}
            readOnly
          />
          <button type="button" className="cpk-btn cpk-review-form__submit" disabled>
            <span className="cpk-btn-bg" aria-hidden="true" />
            Enviar avaliação
          </button>
          <PlaceholderNotice label="Sistema de avaliações em breve" />
        </div>
      </div>
    </div>
  );
}

export const layout = {
  areaId: 'productSingleDescription',
  sortOrder: 5
};
