import { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { AuthScreenProps } from '../navigation/types';
import { signupUser, loginUser } from '../helpers';

export type User = {
    username: string,
    password: string,
    customerId: string
}

const AuthScreen = ({ navigation } : AuthScreenProps) => {    
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ customerId, setCustomerId ] = useState('');

    const signup = async () => {
        const success = await signupUser(username, password);
        if (success) {
            setCustomerId(success.customerId);
            navigation.navigate('Products', { customerId: success.customerId });
        }
    }

    const login = async () => {
        const success = await loginUser(username, password);
        if (success) console.log(success);
    }

    return (
        <View style={{ marginTop: 50 }}>
            <TextInput 
                placeholder='username'
                onChangeText={text => setUsername(text)}
                value={username}
            />
            <TextInput 
                placeholder='password'
                onChangeText={text => setPassword(text)}
                value={password}
            />
            <Button 
                title='Login'
                onPress={() => navigation.navigate('Products', { customerId: customerId })}
            />
            <Button 
                title='Signup'
                onPress={signup}
            />
        </View>
    )
}

export default AuthScreen;