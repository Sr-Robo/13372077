import { Form } from '@components/common/form/Form.js';
import { InputField } from '@components/common/form/InputField.js';
import { toast } from '@components/common/ui/Sonner.js';
import {
  Coupon,
  CouponActions,
  CouponState
} from '@components/frontStore/Coupon.js';
import { _ } from '@evershop/evershop/lib/locale/translate/_';
import React from 'react';
import { useForm } from 'react-hook-form';

export function CouponForm() {
  const form = useForm();
  const coupon = form.watch('coupon');
  return (
    <Coupon
      onApplySuccess={() => {
        toast.success(_('Coupon applied successfully!'));
      }}
      onError={() => {
        toast.error(_('Invalid coupon'));
      }}
      onRemoveSuccess={() => {
        toast.success(_('Coupon removed successfully!'));
      }}
    >
      {(state, actions) => (
        <div className="coupon-form mt-4">
          <Form form={form} method="POST" submitBtn={false}>
            <div className="flex justify-between gap-3 items-end">
              <div className="w-4/5">
                <InputField
                  name="coupon"
                  required
                  validation={{
                    required: {
                      value: true,
                      message: _('Coupon code is required')
                    }
                  }}
                  defaultValue={state.appliedCoupon || ''}
                  disabled={!!state.appliedCoupon}
                  placeholder={_('Enter coupon code')}
                  wrapperClassName="mb-0 form-field cpk-input-wrapper"
                />
              </div>
              <div className="col-span-1">
                <button
                  type="button"
                  disabled={state.isLoading}
                  onClick={async () => {
                    if (state.appliedCoupon) {
                      await actions.removeCoupon();
                    } else {
                      const isValid = await form.trigger();
                      if (isValid) {
                        actions.applyCoupon(coupon);
                      }
                    }
                  }}
                  className="cpk-btn cpk-glitch"
                  style={{ padding: '0.8em 1.5em' }}
                  data-text={state.appliedCoupon ? _('Remove') : _('Apply')}
                >
                  <span className="cpk-btn-bg" aria-hidden="true" />
                  {state.appliedCoupon ? _('Remove') : _('Apply')}
                </button>
              </div>
            </div>
          </Form>
        </div>
      )}
    </Coupon>
  );
}
