import { View } from "react-native"
import { useState, useEffect } from 'react';
import PaymentCard from "../components/PaymentCard"
import { fetchPublishableKey } from "../helpers";
import { StripeProvider } from "@stripe/stripe-react-native";

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