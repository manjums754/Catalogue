import React, {useEffect, useState, useContext} from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Product } from '../components/Product';
import axios from 'axios';

import { CartContext } from '../../CartContext';

export function ProductsList ({navigation}) {
function renderProduct({item: product}) {
    return (
      <Product {...product} 
      onPress={() => {
        navigation.navigate('ProductDetails', {
          productId: product.id,
        });
      }}
      />
    );
  }

  const [products, setProducts] = useState([]);

  const { setProduct } = useContext(CartContext);

  useEffect( () => {
     getProducts();
  },[]);

  async function getProducts() {  
    const api1 = 'https://uat.grandiose.ae/rest/V1/products/6291030200070';
    const item1 =  await getApi(api1);
    const api2 = 'https://uat.grandiose.ae/rest/V1/products/6291030200049';
    const item2 =  await getApi(api2);
  }
  async function getApi(api1) {  
     await axios.get(api1, { headers: {"Content-Type": "application/json","Authorization" : `Bearer 3ogqzxcpd6teaww79puqjiibgbcy11a1`} })
    .then(async res => {
       let custom_attributes = res.data.custom_attributes;

       const id = custom_attributes[custom_attributes.findIndex((item) => (item.attribute_code == 'erp_item_no'))]?.value ?? 0;
       const name = res.data.name ?? "";
       const description = custom_attributes[custom_attributes.findIndex((item) => (item.attribute_code == 'erp_description'))]?.value ?? "";
       const price = custom_attributes[custom_attributes.findIndex((item) => (item.attribute_code == 'cost'))]?.value ?? 0;
       const special_price = custom_attributes[custom_attributes.findIndex((item) => (item.attribute_code == 'special_price'))]?.value ?? 0;
       const image = custom_attributes[custom_attributes.findIndex((item) => (item.attribute_code == 'image'))]?.value ?? "";
       console.log('Item11',products)
      //  const newProduct = [...products,{id,name,description,price,special_price,image}]
      //  setProducts(newProduct);
      // setProducts([...products,{id,name,description,price,special_price,image}]);
       setProducts((prevItems) => {
        console.log('prevItems',prevItems);
        return [...prevItems,{id,name,description,price,special_price,image}]
      })
       console.log("2",{id,name,description,price,special_price,image})
       setProduct(id,name,description,price,special_price,image);
      
    })
    .catch((error) => {
        console.log('error', error);
    });
}

  return (
    <View>
    {products && <FlatList
      style={styles.productsList}
      contentContainerStyle={styles.productsListContainer}
      // keyExtractor={(item) => item.id.toString()}
      data={products}
      renderItem={renderProduct}
    /> 
    }
    </View>
  );
}
const styles = StyleSheet.create({
  productsList: {
    backgroundColor: '#eeeeee',
  },
  productsListContainer: {
    backgroundColor: '#eeeeee',
    paddingVertical: 8,
    marginHorizontal: 8,
  },
});