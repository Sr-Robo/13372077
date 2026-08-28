import React from 'react';
import { useProduct } from '@components/frontStore/catalog/ProductContext';

// E3: Mini descrição do produto — valor vem do metafield cpk.mini_desc
// (provisionado via theme.json). Sem valor preenchido → não renderiza nada
// (o campo é opcional no admin — nem todo produto precisa ter).
export default function ProductMiniDesc() {
  const product = useProduct();

  // metafields vem como array de { namespace, key, type, value }
  const miniDesc = product.metafields?.find(
    (mf) => mf.namespace === 'cpk' && mf.key === 'mini_desc'
  );

  if (!miniDesc?.value) {
    return null;
  }

  return (
    <p className="cpk-mini-desc">{miniDesc.value}</p>
  );
}

export const layout = {
  areaId: 'productPageMiddleRight',
  sortOrder: 25
};
