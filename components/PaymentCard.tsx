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
        } = await fetchPaymentSheetParams();

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

// const [name, setName] = useState("");
//     const [cardDetails, setCardDetails] = useState<CardFieldInput.Details>();
//     const { confirmPayment, loading } = useConfirmPayment();

//     const handlePayment = async () => {
//         if (!cardDetails?.complete || !name) return Alert.alert('Error', 'Please enter all details!')
//         const billingDetails = {
//             name: name,
//         }

//         try {
//             const { clientSecret, error } = await fetchPaymentIntentClientSecret();
//             if (error) console.error("Unable to process payment");
//             else {
//                 const { paymentIntent, error } = await confirmPayment(clientSecret, {
//                     type: 'Card',
//                     billingDetails: billingDetails,
//                 });
//                 if (error) {
//                     Alert.alert('Payment Confirmation Error', `${error.message}`)
//                     console.log(error);
//                 }
//                 else if (paymentIntent) Alert.alert('Success', 'Payment Successful');
//             }
//         } catch (err) {
//             console.error(err);
//         }
//     }

//     return (
//         <View style={styles.view}>
//             <TextInput 
//                 autoCapitalize='none'
//                 placeholder='Name'
//                 keyboardType='name-phone-pad'
//                 onChangeText={(value) => setName(value)}            
//                 style={styles.textInput}
//             />
//             <CardField 
//                 style={styles.cardField}
//                 onCardChange={cardDetails => {
//                     setCardDetails(cardDetails)
//                 }}
//             />
//             <Button
//                 title='Pay' 
//                 disabled={loading}
//                 onPress={handlePayment}
//             />
//         </View>
//     )

export default PaymentCard;