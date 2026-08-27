import React from 'react';
import AuthHero from '../../components/AuthHero.js';

export default function RegisterHero() {
  return <AuthHero label="USER_REGISTRATION_INIT" />;
}

export const layout = {
  areaId: 'customerRegisterFormTitleBefore',
  sortOrder: 1
};
