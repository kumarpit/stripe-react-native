import { StackScreenProps } from "@react-navigation/stack"

export type RootStackParamList = {
    Auth: undefined,
    Checkout: { customerId: string }
}

export type AuthScreenProps = StackScreenProps<RootStackParamList, 'Auth'>
export type CheckoutScreenProps = StackScreenProps<RootStackParamList, 'Checkout'>