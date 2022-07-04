const API_URL = 'http://192.168.1.18:3000';
import { Alert } from "react-native";

export const fetchPublishableKey = async () => {
    try {
        const response = await fetch(`${API_URL}/config`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const { publishableKey } = await response.json();
        return publishableKey;
    } catch (err) {
        console.log(err);
        console.warn('Unable to fetch publishable key. Is your server running?');
        Alert.alert('Error', 'Unable to fetch publishable key. Is your server running?');
    }
}

export const fetchPaymentIntentClientSecret = async () => {
    const response = await fetch(`${API_URL}/create-payment-intent`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    const { clientSecret, error } = await response.json();
    return { clientSecret, error };
}