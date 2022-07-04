import { useState } from 'react';
import { TextInput, View, StyleSheet, Button, Alert } from 'react-native';
import { CardField, CardFieldInput, useConfirmPayment } from '@stripe/stripe-react-native';
import { fetchPaymentIntentClientSecret } from '../helpers';

const PaymentCard = () => {
    const [name, setName] = useState("");
    const [cardDetails, setCardDetails] = useState<CardFieldInput.Details>();
    const { confirmPayment, loading } = useConfirmPayment();

    const handlePayment = async () => {
        if (!cardDetails?.complete || !name) return Alert.alert('Error', 'Please enter all details!')
        const billingDetails = {
            name: name,
        }

        try {
            const { clientSecret, error } = await fetchPaymentIntentClientSecret();
            if (error) console.error("Unable to process payment");
            else {
                const { paymentIntent, error } = await confirmPayment(clientSecret, {
                    type: 'Card',
                    billingDetails: billingDetails,
                });
                if (error) {
                    Alert.alert('Payment Confirmation Error', `${error.message}`)
                    console.log(error);
                }
                else if (paymentIntent) Alert.alert('Success', 'Payment Successful');
            }
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <View style={styles.view}>
            <TextInput 
                autoCapitalize='none'
                placeholder='Name'
                keyboardType='name-phone-pad'
                onChangeText={(value) => setName(value)}            
                style={styles.textInput}
            />
            <CardField 
                style={styles.cardField}
                onCardChange={cardDetails => {
                    setCardDetails(cardDetails)
                }}
            />
            <Button
                title='Pay' 
                disabled={loading}
                onPress={handlePayment}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    cardField: {
        width: '100%',
        height: 50,
    },
    view: {
        marginTop: 50,
    },
    textInput: {
        marginHorizontal: 15,
    },
});

export default PaymentCard;