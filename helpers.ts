import { Alert } from "react-native";
import { Method, Product, User } from './types';

const API_URL = 'http://192.168.1.18:3000';

const request = async <TResponse>(endpoint: string, method: Method, body: any = {body: ''}): Promise<TResponse> => {
    let response;

    switch(method) {
        case (Method.GET):
            response = await fetch(`${API_URL}/${endpoint}`, {
                method: method,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            break;
        case (Method.POST):
            response = await fetch(`${API_URL}/${endpoint}`, {
                method: method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            })
    }
    return response.json();
}

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

export const fetchPaymentSheetParams = async (customerId: string, products: Product[]) => {
    try {
        const response = await fetch(`${API_URL}/payment-sheet`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                customerId: customerId,
                products: products
            })
        })
        const { paymentIntent, ephemeralKey, customer, publishableKey } = await response.json();

        return {
            paymentIntent,
            ephemeralKey,
            customer,
            publishableKey
        }
    } catch (err) {
        console.warn("Unable.");
    }
}

export const signupUser = async (username: string, password: string) => {
    try {
        let customer = await request<any>('customer', Method.GET);

        const response = await request<User>('signup', Method.POST, {
            username: username,
            password: password,
            customerId: customer.id
        })
        
        return response;
    } catch (err) {
        console.log(err);
    }
}

export const loginUser = async (username: string, password: string) => {
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })  

        return response;
    } catch(err) {
        console.log(JSON.stringify(err));
    }
}

export const fetchProducts = async () => {
    try {
        const response = await request<Product[]>('products', Method.GET);
        return response;
    } catch (err) {
        console.warn(err);
    }
}