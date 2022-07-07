import { useState, useEffect } from 'react';
import { ScrollView, Button } from 'react-native';
import ProductCard from '../components/ProductCard';
import { fetchProducts } from '../helpers';
import { ProductsScreenProps } from '../navigation/types';
import { Product } from '../types';

const ProductsScreen = ({ navigation, route } : ProductsScreenProps) => {
    const [ products, setProducts ] = useState<Product[]>([]);
    const [ selectedProducts, setSelectedProducts ] = useState<string[]>([]);

    const handleAdd = (id: string) => {
        setSelectedProducts([...selectedProducts, id]);
        console.log(selectedProducts);
    }

    useEffect(() => {
        const init = async () => {
            const response = await fetchProducts();
            if (response != null) setProducts(response);
        }
        init();
    }, [])  

    return (
        <>
            <ScrollView>
                {products.map((product, index) => {
                    return <ProductCard product={product} handler={handleAdd} key={index} />
                }
            )}
            </ScrollView>
            <Button title={`checkout ${selectedProducts.length}`} onPress={() => navigation.navigate('Checkout', { 
                customerId: route.params.customerId, 
                productsId: selectedProducts
            })} />
        </>
    )
}

export default ProductsScreen;