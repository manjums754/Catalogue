
import React, {useEffect, useState, useContext} from 'react';
import {
  Text, 
  Image, 
  View, 
  ScrollView, 
  SafeAreaView, 
  Button, 
  StyleSheet,
  TextInput,
  TouchableOpacity
  } from 'react-native';

import { CartContext } from '../../CartContext';

export function ProductDetails({route}) {
  const { productId } = route.params;
  const [product, setProduct] = useState({});
  const [qty,setQty] = useState('1');
  
  const { addItemToCart, getProduct } = useContext(CartContext);
  
  useEffect(() => {
    setProduct(getProduct(productId));
  });
  
  function onAddToCart() {
    addItemToCart(product.id,parseInt(qty));
  }

  const increaseQty = () => {
    // const newQty = (parseInt(qty) + 1).toString();
    setQty((prevQty) => (parseInt(prevQty) + 1).toString());
  }

  const decreaseQty = () => {
        const newQty = parseInt(qty)
        if(newQty > 1) {
        setQty((parseInt(qty) - 1).toString());
        }
    }
    
  
  
  return (
    <SafeAreaView>
      {product && <ScrollView>
        <Image
          style={styles.image}
          source={{ uri:'https://uat.grandiose.ae/media/catalog/product' + product.image}}
        />
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{product.name}</Text>
          {product.special_price == "" ? <Text style={styles.price}>$ {product.price}</Text> :
          <><Text style={styles.priceStrike}>$ {product.price}</Text><Text style={styles.price}>$ {product.special_price}</Text></> 
          }
          <Text style={styles.description}>{product.description}</Text>
          <View style={styles.qtyContent}>
          <TouchableOpacity
            style={styles.button}
            onPress={decreaseQty}
          >
            <Text style={{color:'black',marginLeft: 10}}> - </Text>
          </TouchableOpacity>

          <TextInput 
            value={qty} 
            style={styles.qtyInput}
            onChangeText={newText => setQty(parseInt(newText))}
            keyboardType="numeric"
          />

          <TouchableOpacity
            style={styles.button}
            onPress={increaseQty}>
            <Text style={{color:'black',marginLeft: 5}}> + </Text>
          </TouchableOpacity>
          </View>
          <Button
            onPress={onAddToCart}
            title="Add to cart"
            / >
         
        </View>
      </ScrollView>
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'grey',
    borderRadius: 16,
    shadowOpacity: 0.2,
    shadowRadius: 4,
    color: '#787878',
    shadowColor: 'black',
    shadowOffset: {
      height: 0,
      width: 0,
    },
    elevation: 1,
    marginVertical: 20,
  },
  image: {
    height: 300,
    width: '100%'
  },
  infoContainer: {
    padding: 16,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#787878',
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#787878',
  },
  priceStrike: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    color: 'red',
  },
  description: {
    fontSize: 16,
    fontWeight: '400',
    color: '#787878',
    marginBottom: 16,
  },
  qtyInput:{
    backgroundColor: 'orange',
    width:50,
    height:35,
  },
  button:{
    borderColor:'grey',
    borderWidth:1,
    width:30,
    color: '#787878',
    margin:1
  },
  qtyContent:{
    flexDirection:'row',
    margin:5
  }
});