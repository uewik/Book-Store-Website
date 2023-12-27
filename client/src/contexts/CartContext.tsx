import {createContext, Dispatch, ReactNode, Reducer, useEffect, useReducer, useState} from "react";
import {cartReducer, AppActions} from "../reducers/CartReducer";
import { ShoppingCartItem} from "../types";

const initialCartState:ShoppingCartItem[] =  []
export const CartStore = createContext<{
    cart: ShoppingCartItem[];
    dispatch: Dispatch<any>;
}>({
    cart: initialCartState,
    dispatch: () => null
});

CartStore.displayName = 'CartContext';

const storageKey = 'cart';


function CartContext ({ children } : { children: ReactNode })  {
    // const [state, dispatch] = useReducer(
    //     cartReducer as Reducer<ShoppingCartItem[], AppActions>,
    //     initialCartState
    // );
    const [cart, dispatch] =useReducer(cartReducer, initialCartState,
        (initialState) => {
            try {
                const storedCart = JSON.parse(localStorage.getItem(storageKey) || '[]');
                return storedCart as ShoppingCartItem[] || initialState;
            } catch (error) {
                console.log('Error parsing cart', error);
                return initialState;
            }
        },
    );

    return (
        <CartStore.Provider value={{cart:cart, dispatch}}>{children}</CartStore.Provider>
    );
}
export default CartContext;
