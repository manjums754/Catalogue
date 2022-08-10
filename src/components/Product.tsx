import React from 'react';
import {Text, Image, View, StyleSheet, TouchableOpacity} from 'react-native';
export function Product({name, price, image,special_price, onPress}) {
  console.log('special_price',special_price)
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image
        style={styles.thumb}
        source={{ uri:'https://uat.grandiose.ae/media/catalog/product' + image}}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{name}</Text>
        {special_price == 0 ? <Text style={styles.price}>$ {price}</Text> :
          <><Text style={styles.priceStrike}>$ {price}</Text><Text style={styles.price}>$ {special_price}</Text></> 
          }
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowColor: 'black',
    shadowOffset: {
      height: 0,
      width: 0,
    },
    elevation: 1,
    marginVertical: 20,
  },
  thumb: {
    height: 200,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    width: 150,
    justifyContent:'center'
  },
  infoContainer: {
    padding: 16,
  },
  name: {
    fontSize: 18,
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
    color: 'red',
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },
  
});