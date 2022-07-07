import { StackScreenProps } from "@react-navigation/stack"

export type RootStackParamList = {
    Auth: undefined,
    Checkout: { customerId: string, productsId: string[] },
    Products: { customerId: string }
}

export type AuthScreenProps = StackScreenProps<RootStackParamList, 'Auth'>
export type CheckoutScreenProps = StackScreenProps<RootStackParamList, 'Checkout'>
export type ProductsScreenProps = StackScreenProps<RootStackParamList, 'Products'>