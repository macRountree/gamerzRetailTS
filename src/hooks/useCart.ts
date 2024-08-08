import {useEffect, useMemo, useState} from 'react';
import {db} from '../data/db';

import type {Game, CartItem} from '../interfaces';
const useCart = () => {
  const initialCart = (): CartItem[] => {
    const localStorageCart = localStorage.getItem('cart');
    return localStorageCart ? JSON.parse(localStorageCart) : [];
  };
  //* State
  const [data] = useState(db); //*Can't use inside a loop or condition .. if the data is local (db) use useState and default value is db
  const [cart, setCart] = useState(initialCart);

  const MAX_ITEMS = 5;
  const MIN_ITEMS = 1;
  // console.log(data, 'DATA state');

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]); //*Can consume API or local storage use useEffect
  //*avoid use a lot of logic in templates , use a Functions  and send props to child components
  function addtoCart(item: Game) {
    //*If we want to add the same item to the cart, we can't add it again
    const itemExist = cart.findIndex(game => game.id === item.id);
    console.log(itemExist, '-1');
    if (itemExist >= 0) {
      if (cart[itemExist].quantity >= MAX_ITEMS) return;
      const updatedCart = [...cart]; //*pass acopy of the cart
      updatedCart[itemExist].quantity++; //*update the quantity when the item exist
      setCart(updatedCart);
    } else {
      //* < 0

      const newItem: CartItem = {...item, quantity: 1};
      setCart([...cart, newItem]);
    }
  }
  function removeItemFromCart(id: Game['id']) {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  }

  function decreaseQuantity(id: Game['id']) {
    const updatedCart = cart.map(item => {
      if (item.id === id && item.quantity > MIN_ITEMS) {
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      }
      return item;
    });
    setCart(updatedCart);
  }

  function increaseQuantity(id: Game['id']) {
    console.log('increaseQuantity', id);
    const updatedCart = cart.map(item => {
      if (item.id === id && item.quantity < MAX_ITEMS) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });
    setCart(updatedCart);
  }
  function clearCart() {
    setCart([]);
  }

  const isEmpty = useMemo(() => cart.length === 0, [cart]); //*Use memo looks like computed properties	from Vue
  const cartTotal = useMemo(
    () => cart.reduce((total, item) => total + item.quantity * item.price, 0),
    [cart]
  );

  return {
    data,
    cart,
    addtoCart,
    removeItemFromCart,
    decreaseQuantity,
    increaseQuantity,
    clearCart,
    isEmpty,
    cartTotal,
  };
};

export default useCart;
