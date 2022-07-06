import { useState, useEffect } from 'react';
import PaymentCard from "../components/PaymentCard"
import { fetchPublishableKey } from "../helpers";
import { StripeProvider as _StripeProvider } from '@stripe/stripe-react-native';
import type { Props as StripeProviderProps } from '@stripe/stripe-react-native/lib/typescript/src/components/StripeProvider';

const StripeProvider = _StripeProvider as React.FC<StripeProviderProps>;

const CheckoutScreen = () => {
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
    )
}

export default CheckoutScreen;