import { useEffect, useMemo, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
  PaymentRequestButtonElement,
} from '@stripe/react-stripe-js';
import { api } from '../api/client.js';
import { useCart } from '../state/CartContext.jsx';

const stripePromise = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
  ? loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)
  : null;

function PaymentForm({ total, disabled, clientSecret }) {
  const stripe = useStripe();
  const elements = useElements();
  const { clear } = useCart();
  const [status, setStatus] = useState('');
  const [paymentRequest, setPaymentRequest] = useState(null);

  useEffect(() => {
    if (!stripe || !total || !clientSecret) return;
    const pr = stripe.paymentRequest({
      country: 'US',
      currency: 'usd',
      total: { label: 'WebShop Café', amount: Math.round(total * 100) },
      requestPayerName: true,
      requestPayerEmail: true,
    });
    pr.canMakePayment().then((result) => {
      if (result) {
        setPaymentRequest(pr);
        pr.on('paymentmethod', async (event) => {
          const { error } = await stripe.confirmPayment(
            {
              clientSecret,
              confirmParams: { return_url: window.location.href },
              payment_method: event.paymentMethod.id,
            },
            { handleActions: false },
          );
          if (error) {
            setStatus(error.message || 'Payment failed');
            event.complete('fail');
          } else {
            event.complete('success');
            setStatus('Success!');
            clear();
            await stripe.confirmPayment({ clientSecret });
          }
        });
      }
    });
  }, [stripe, total, clientSecret, clear]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;
    setStatus('Processing…');
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: window.location.href },
    });
    if (error) {
      setStatus(error.message || 'Payment failed');
    } else {
      setStatus('Success!');
      clear();
    }
  };

  if (disabled) {
    return <p className="text-sm text-slate-500">Add menu items before checking out.</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-slate-100 rounded-2xl p-4 space-y-4">
      <h2 className="font-semibold">Payment</h2>
      {paymentRequest && stripe ? (
        <PaymentRequestButtonElement
          options={{
            paymentRequest,
            style: { paymentRequestButton: { type: 'buy', theme: 'dark', height: '48px' } },
          }}
        />
      ) : (
        <PaymentElement />
      )}
      <button
        type="submit"
        disabled={!stripe}
        className="w-full bg-emerald-600 text-white rounded-xl py-3 font-semibold"
      >
        Pay ${total.toFixed(2)}
      </button>
      {status && <p className="text-sm text-emerald-600">{status}</p>}
    </form>
  );
}

export default function CheckoutForm({ total, disabled }) {
  const [clientSecret, setClientSecret] = useState(null);
  const intentOptions = useMemo(() => ({ appearance: { theme: 'stripe' }, clientSecret }), [clientSecret]);

  useEffect(() => {
    if (!stripePromise || total <= 0) return;
    api.createPaymentIntent({ amount: total, currency: 'usd' }).then((data) => setClientSecret(data.clientSecret));
  }, [total]);

  if (!stripePromise) {
    return (
      <div className="bg-white border border-amber-200 text-amber-700 rounded-2xl p-4">
        Add a Stripe publishable key to enable Apple Pay + card checkout.
      </div>
    );
  }

  if (!clientSecret) {
    return <p className="text-sm text-slate-500">Preparing secure checkout…</p>;
  }

  return (
    <Elements stripe={stripePromise} options={intentOptions}>
      <PaymentForm total={total} disabled={disabled} clientSecret={clientSecret} />
    </Elements>
  );
}
