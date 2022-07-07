import { Text, View, Button } from "react-native";
import { Product } from "../types";

const ProductCard = ({ product, handler } : { product: Product, handler: (product: Product) => void }) => {
    return (
        <View style={{ padding: 10, marginVertical: 5, width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
            <View>
                <Text>{product.name}</Text>
                <Text>{product.price} INR</Text>
            </View>
            <View>
                <Button 
                    title='add'
                    onPress={() => handler(product)}
                />
            </View>
        </View>
    )
}

export default ProductCard;