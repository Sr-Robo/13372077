import React from 'react';
import AuthHero from '../../components/AuthHero.js';

export default function LoginHero() {
  return <AuthHero label="AUTH_PROTOCOL_INIT" />;
}

export const layout = {
  areaId: 'customerLoginFormTitleBefore',
  sortOrder: 1
};
