import { StackScreenProps } from "@react-navigation/stack"

export type RootStackParamList = {
    Auth: undefined,
    Checkout: undefined
}

export type AuthScreenProps = StackScreenProps<RootStackParamList, 'Auth'>