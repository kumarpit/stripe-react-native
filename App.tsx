import { useState, useEffect } from 'react';
import { StripeProvider as _StripeProvider } from '@stripe/stripe-react-native';
import type { Props as StripeProviderProps } from '@stripe/stripe-react-native/lib/typescript/src/components/StripeProvider';
import { fetchPublishableKey } from './helpers';
import PaymentCard from './components/PaymentCard';

const StripeProvider = _StripeProvider as React.FC<StripeProviderProps>;

export default function App() {
  const [publishableKey, setPublishableKey] = useState("");

  useEffect(() => {
    const init = async () => {
      const publishableKey = await fetchPublishableKey();
      if (publishableKey) setPublishableKey(publishableKey);
    }

    init();
  }, [])

  return (
    <StripeProvider 
      publishableKey={publishableKey}
    >
        <PaymentCard />
    </StripeProvider>
  );
}