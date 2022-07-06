import { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { AuthScreenProps } from '../navigation/types';

const AuthScreen = ({ navigation } : AuthScreenProps) => {    
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    return (
        <View style={{ marginTop: 50 }}>
            <TextInput 
                placeholder='username'
                onChangeText={text => setUsername(text)}
                value={username}
            />
            <TextInput 
                placeholder='password'
                onChangeText={text => setPassword(password)}
                value={password}
            />
            <Button 
                title='Login'
                onPress={() => navigation.navigate('Checkout')}
            />
            <Button 
                title='Signup'
                onPress={() => navigation.navigate('Checkout')}
            />
        </View>
    )
}

export default AuthScreen;