import { useState } from 'react';
import { View, TextInput, Button } from 'react-native';

const AuthScreen = () => {    
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
                onPress={() => console.log('')}
            />
            <Button 
                title='Signup'
                onPress={() => console.log('')}
            />
        </View>
    )
}

export default AuthScreen;