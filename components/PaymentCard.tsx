import { useState, useEffect } from 'react';
import { Button, Alert, View } from 'react-native';
import { useStripe } from '@stripe/stripe-react-native';
import { fetchPaymentSheetParams } from '../helpers';

const PaymentCard = () => {
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const [loading, setLoading] = useState(false);

    const initializePaymentSheet = async () => {
        const {
            paymentIntent,
            ephemeralKey, 
            customer,
            publishableKey
        } = await fetchPaymentSheetParams() || {};
        

        const { error } = await initPaymentSheet({
            customerId: customer,
            customerEphemeralKeySecret: ephemeralKey,
            paymentIntentClientSecret: paymentIntent,
            merchantDisplayName: 'wavy',
        })

        if (!error) {
            console.log(error);
            setLoading(true);
        }
    }

    const openPaymentSheet = async () => {
        const { error } = await presentPaymentSheet();

        if (error) {
        Alert.alert(`Error code: ${error.code}`, error.message);
        } else {
        Alert.alert('Success', 'Your order is confirmed!');
        }
    }

    useEffect(() => {
        initializePaymentSheet();
    }, []);

    return (
        <View style={{ marginTop: 50 }}>
            <Button 
                title='Checkout'
                disabled={!loading}
                onPress={openPaymentSheet}
            />
        </View>
    )

}

export default PaymentCard;