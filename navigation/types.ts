import { StackScreenProps } from "@react-navigation/stack"
import { Product } from "../types"

export type RootStackParamList = {
    Auth: undefined,
    Checkout: { customerId: string, products: Product[] },
    Products: { customerId: string }
}

export type AuthScreenProps = StackScreenProps<RootStackParamList, 'Auth'>
export type CheckoutScreenProps = StackScreenProps<RootStackParamList, 'Checkout'>
export type ProductsScreenProps = StackScreenProps<RootStackParamList, 'Products'>