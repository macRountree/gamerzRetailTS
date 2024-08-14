import {db} from '../data/db';
import {CartItem, Game} from '../interfaces';

export type CartActions =
  | {
      type: 'add-to-cart';
      payload: {item: Game};
    }
  | {
      type: 'remove-from-cart';
      payload: {id: Game['id']};
    }
  | {type: 'decrease-quantity'; payload: {id: Game['id']}}
  | {type: 'increase-quantity'; payload: {id: Game['id']}}
  | {type: 'clear-cart'};

export interface CartState {
  data: Game[];
  cart: CartItem[];
}
const initialCart = (): CartItem[] => {
  const localStorageCart = localStorage.getItem('cart');
  return localStorageCart ? JSON.parse(localStorageCart) : [];
};
export const initialState: CartState = {
  data: db,
  cart: initialCart(),
};
const MAX_ITEMS = 5;
const MIN_ITEMS = 1;
export const cartReducer = (state: CartState, action: CartActions) => {
  if (action.type === 'add-to-cart') {
    const itemExist = state.cart.find(
      game => game.id === action.payload.item.id
    );
    console.log(itemExist, '-1');

    let updatedCart: CartItem[] = [];
    if (itemExist) {
      updatedCart = state.cart.map(game => {
        if (game.id === action.payload.item.id) {
          if (game.quantity < MAX_ITEMS) {
            return {...game, quantity: game.quantity + 1};
          } else {
            return game;
          }
        } else {
          return game;
        }
      });

      //*update the quantity when the item exist
    } else {
      //* < 0

      const newItem: CartItem = {...action.payload.item, quantity: 1};
      updatedCart = [...state.cart, newItem];
    }
    return {...state, cart: updatedCart};
  }

  if (action.type === 'remove-from-cart') {
    // setCart(prevCart => prevCart.filter(item => item.id !== id));
    const updatedCart = state.cart.filter(
      game => game.id !== action.payload.id
    );
    return {...state, cart: updatedCart};
  }

  if (action.type === 'decrease-quantity') {
    const updatedCart = state.cart.map(item => {
      if (item.id === action.payload.id && item.quantity > MIN_ITEMS) {
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      }
      return item;
    });
    return {...state, cart: updatedCart};
  }
  if (action.type === 'increase-quantity') {
    const updatedCart = state.cart.map(item => {
      if (item.id === action.payload.id && item.quantity < MAX_ITEMS) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });
    return {...state, cart: updatedCart};
  }
  if (action.type === 'clear-cart') {
    const updatedCart: CartItem[] = [];

    return {...state, cart: updatedCart};
  }

  return state;
};
