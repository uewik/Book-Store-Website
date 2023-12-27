import React, {createContext, useReducer, useContext, ReactNode, Dispatch} from 'react';
import { orderDetailsReducer} from '../reducers/OrderDetailsReducer';
import {OrderDetail} from "../types";

export const initialState: OrderDetail = {
    order: {
        orderId: 0,
        amount: 0,
        dateCreated: Date.now(),
        confirmationNumber: 0,
        customerId: 0,
    },
    customer: {
        customerName: '',
        address: '',
        phone: '',
        email: '',
        ccNumber: 'xxxx',
        ccExpDate: 0,
    },
    books: [
        {
            bookId: 0,
            title: 'Example Book Title',
            author: 'Author Name',
            price: 0.0,
            isPublic: true,
            categoryId: 0,
        },
    ],
    lineItems: [
        {
            bookId: 0,
            orderId: 0,
            quantity: 0,
        },
    ],
};
export const OrderDetailsContext = createContext<{
    state: OrderDetail;
    dispatch: Dispatch<any>;
}>({
    state: initialState,
    dispatch: () => null,
});

interface OrderDetailsProviderProps {
    children: ReactNode;
}

export const OrderDetailsProvider: React.FC<OrderDetailsProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(orderDetailsReducer, initialState);

    return (
        <OrderDetailsContext.Provider value={{ state:state, dispatch }}>
            {children}
        </OrderDetailsContext.Provider>
    );
};

