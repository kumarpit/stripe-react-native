import { createStackNavigator } from '@react-navigation/stack';
import AuthScreen from '../screens/AuthScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import { RootStackParamList } from './types';

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Auth" component={AuthScreen} />
            <Stack.Screen name="Checkout" component={CheckoutScreen} />
        </Stack.Navigator>
    )
}

export default RootNavigator;