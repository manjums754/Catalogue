import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Button, FlatList, StyleSheet,Image } from 'react-native';

import { CartContext } from '../../CartContext';

export function Cart ({navigation}) {

  const {items, getItemsCount, getTotalPrice} = useContext(CartContext);
  
  function Totals() {
    let [total, setTotal] = useState(0);
    useEffect(() => {
      setTotal(getTotalPrice());
    });
    return (
       <View style={styles.cartLineTotal}>
          <Text style={[styles.lineLeft, styles.lineTotal]}>Total</Text>
          <Text style={styles.lineRight}>$ {total}</Text>
       </View>
    );
  }

  function renderItem({item}) {
    console.log('item',item.product.image)
    return (
       <View style={styles.cartItemContainer}>
        <Image
          source={{ uri:'https://uat.grandiose.ae/media/catalog/product/' + item.product.image}}
          style={{flex:0.3,margin:3,borderRadius:20,height:100}}
        />
        <View style={{flex:0.7}}>
          <Text style={styles.lineLeft}>{item.product.name} x {item.qty}</Text>
          <Text style={styles.lineLeft}>Qty : {item.qty} </Text>
          <Text style={styles.lineLeft}>Price : {item.product.price}</Text>
          <Text style={styles.lineLeft}>Sub Total : ${item.totalPrice}</Text>
          </View>
       </View>
    );
  }
  
  return (
    <FlatList
      style={styles.itemsList}
      contentContainerStyle={styles.itemsListContainer}
      data={items}
      renderItem={renderItem}
      keyExtractor={(item) => item.product.id.toString()}
      ListFooterComponent={Totals}
    />
  );
}

const styles = StyleSheet.create({
  cartLine: { 
    flexDirection: 'column',
  },
  cartLineTotal: { 
    flexDirection: 'row',
    borderTopColor: '#dddddd',
    borderTopWidth: 1
  },
  lineTotal: {
    fontWeight: 'bold',    
  },
  lineLeft: {
    fontSize: 15, 
    color:'#333333' 
  },
  lineRight: { 
    flex: 1,
    fontSize: 20, 
    fontWeight: 'bold',
    lineHeight: 40, 
    color:'#333333', 
    textAlign:'right',
  },
  itemsList: {
    backgroundColor: '#eeeeee',
  },
  itemsListContainer: {
    backgroundColor: '#eeeeee',
    paddingVertical: 8,
    marginHorizontal: 8,
  },
  cartItemContainer:{flexDirection:'row',backgroundColor:'#eeeeee',margin:2,borderRadius:10,borderWidth:1,borderColor:'#dddddd'}
});