import React, {createContext, useState} from 'react';


export const CartContext = createContext();

export function CartProvider(props) {
  const [items, setItems] = useState([]);
  const [products, setProducts] = useState([]);
  

async function setProduct(id,name,description,price,special_price,image){
      await setProducts((prevItems) => [...prevItems, {'id':id,'name':name,'description':description,'price':price,'special_price':special_price,'image':image}])
        console.log("products",products);
}
function getProduct(){
    return products;
}

function getProduct(id){
    console.log('getting product');
    return products.find((product) => (product.id == id));
}

function addItemToCart(id,qty) {
const product = getProduct(id);
setItems((prevItems) => {
    const item = prevItems.find((item) => (item.id == id));
    console.log('product.price',product.price)
    if(!item) {
        return [...prevItems, {
            id,
            qty: qty,
            product,
            totalPrice: parseFloat(product.price)
        }];
    }
    else { 
        return prevItems.map((item) => {
        if(item.id == id) {
            item.qty = item.qty + qty;
            item.totalPrice = parseFloat(product.price) * item.qty;
            console.log('item.totalPrice',item.totalPrice)
        }
        return item;
        });
    }
});

}

function getItemsCount() {
    return items.reduce((sum, item) => (sum + item.qty), 0);
}
  
function getTotalPrice() {
    return items.reduce((sum, item) => (sum + item.totalPrice), 0);
}  
  
return (
    <CartContext.Provider 
        value={{items, setItems, getItemsCount, addItemToCart, getTotalPrice, getProduct, setProduct}}>
        {props.children}
    </CartContext.Provider>
);
}
