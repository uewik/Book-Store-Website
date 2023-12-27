import {ShoppingCartItem, BookItem} from "../types";


export const CartTypes = {
    ADD: 'ADD',
    REMOVE: 'REMOVE',
    CLEAR:'CLEAR',
    REMOVEBOOK: 'REMOVEBOOK'
};

export type AppActions = {
    id:number;
    // type: 'ADD' | 'REMOVE'  | 'CLEAR';
    type: 'ADD' | 'REMOVE'  | 'CLEAR' | 'REMOVEBOOK';
    item: BookItem;
}
export const cartReducer = (state:ShoppingCartItem[], action:AppActions) => {
    switch (action.type) {
        case CartTypes.ADD: {
                /*
                    The following only added the item in the cart for the first time with quantity 1.
                    You have to handle the increment of the quantity if the item
                    is already in the cart
                  */
            const fn = (cartItem:ShoppingCartItem) => cartItem.id === action.id;
            if (state.findIndex(fn) > -1) {
                let temp = [...state];
                temp[state.findIndex(fn)].quantity += 1;
                localStorage.setItem('cart', JSON.stringify(temp));
                return temp;
            }
            else {
                let temp = [
                    ...state,
                    {id: action.id, book: action.item, quantity: 1},
                ];
                localStorage.setItem('cart', JSON.stringify(temp));
                return temp;
            }
        }

        case CartTypes.REMOVE: {
            const fn = (cartItem: ShoppingCartItem) => cartItem.id === action.id;
            const index = state.findIndex(fn)
            if (index > -1) {
                let temp = [...state];
                temp[index].quantity -= 1;
                if (temp[index].quantity === 0) {
                    temp.splice(index, 1);
                }
                localStorage.setItem('cart', JSON.stringify(temp));
                return temp;
            } else {
                localStorage.setItem('cart', JSON.stringify(state));
                return state;
            }
        }

        case CartTypes.REMOVEBOOK: {
            const fn = (cartItem: ShoppingCartItem) => cartItem.id === action.id;
            const index = state.findIndex(fn)
            if (index > -1) {
                let temp = [...state];
                temp.splice(index, 1);
                localStorage.setItem('cart', JSON.stringify(temp));
                return temp;
            } else {
                localStorage.setItem('cart', JSON.stringify(state));
                return state;
            }
        }

        case CartTypes.CLEAR: {
            let temp: ShoppingCartItem[] = [];
            localStorage.setItem('cart', JSON.stringify(temp));
            return temp;
        }
        default:
            throw new Error(`Invalid action type ${action.type}`);
    }
};