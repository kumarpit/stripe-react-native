import { useState, useEffect } from 'react';
import { Text } from 'react-native';
import PaymentCard from "../components/PaymentCard"
import { fetchPublishableKey } from "../helpers";
import { StripeProvider as _StripeProvider } from '@stripe/stripe-react-native';
import type { Props as StripeProviderProps } from '@stripe/stripe-react-native/lib/typescript/src/components/StripeProvider';
import { CheckoutScreenProps } from '../navigation/types';

const StripeProvider = _StripeProvider as React.FC<StripeProviderProps>;

const CheckoutScreen = ({ route }: CheckoutScreenProps) => {
    const [publishableKey, setPublishableKey] = useState("");   
    const { customerId, products } = route.params;

    const sum = products.reduce((acc, curr) => {
        return acc + parseInt(curr.price)
    }, 0)

    useEffect(() => {
        const init = async () => {
          const publishableKey = await fetchPublishableKey();
          if (publishableKey) setPublishableKey(publishableKey);
        }
    
        init();
      }, [])
      
    return (
        <>
            {products.map((product, index) => {
                return <Text key={index}>{product.name} {product.price}</Text>
            })}
            <Text>{`Total ${sum}`}</Text>
            <StripeProvider 
                publishableKey={publishableKey}
            >
                <PaymentCard customerId={customerId} products={products} />    
            </StripeProvider>
        </>
    )
}

export default CheckoutScreen;