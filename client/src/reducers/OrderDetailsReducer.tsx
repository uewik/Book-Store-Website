import { OrderDetail } from "../types";
import {initialState} from "../contexts/OrderDetailsContext";


interface UpdateAction {
    type: 'UPDATE';
    payload: OrderDetail;
}

interface ClearAction {
    type: 'CLEAR';
}

type Action = UpdateAction | ClearAction;

export const orderDetailsReducer = (state: OrderDetail, action: Action): OrderDetail => {
    switch (action.type) {
        case 'UPDATE':
            return { ...state, ...action.payload };
        case 'CLEAR':
            return initialState;
        default:
            return state;
    }
};
