import { useState, useEffect } from 'react';
import PaymentCard from "../components/PaymentCard"
import { fetchPublishableKey } from "../helpers";
import { StripeProvider as _StripeProvider } from '@stripe/stripe-react-native';
import type { Props as StripeProviderProps } from '@stripe/stripe-react-native/lib/typescript/src/components/StripeProvider';
import { CheckoutScreenProps } from '../navigation/types';

const StripeProvider = _StripeProvider as React.FC<StripeProviderProps>;

const CheckoutScreen = ({ route }: CheckoutScreenProps) => {
    const [publishableKey, setPublishableKey] = useState("");   
    const { customerId, productsId } = route.params;

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
            <PaymentCard customerId={customerId} productsId={productsId} />    
        </StripeProvider>
    )
}

export default CheckoutScreen;