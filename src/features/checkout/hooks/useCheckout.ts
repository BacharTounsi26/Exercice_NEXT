"use client";

import { useCallback }                    from "react";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/useAppStore";
import { submitOrder, resetCheckout }     from "../state/CheckoutSlice";
import {
  selectCheckoutOrder, selectCheckoutError,
  selectCheckoutStatus, selectIsSubmitting, selectIsSuccess,
} from "../state/Selectors";
import { selectCart }             from "@/features/cart/state/selectors";
import type { CheckoutFormData }  from "@/shared/types/CheckoutFormData";

export function useCheckout() {
  const dispatch     = useAppDispatch();

  const cart         = useAppSelector(selectCart);
  const order        = useAppSelector(selectCheckoutOrder);
  const status       = useAppSelector(selectCheckoutStatus);
  const error        = useAppSelector(selectCheckoutError);
  const isSubmitting = useAppSelector(selectIsSubmitting);
  const isSuccess    = useAppSelector(selectIsSuccess);

  const submit = useCallback((form: CheckoutFormData) => {
    if (!cart) return;
    dispatch(submitOrder({ cart, form }));
  }, [dispatch, cart]);

  const reset = useCallback(() => {
    dispatch(resetCheckout());
  }, [dispatch]);

  return {
    cart, order, status, error,
    isSubmitting, isSuccess,
    submit, reset,
  };
}
