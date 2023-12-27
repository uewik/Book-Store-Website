import  "../assets/css/CartTable.css"
import { BookItem } from "../types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons/faChevronLeft';
import {faChevronRight} from '@fortawesome/free-solid-svg-icons/faChevronRight';
import {faMinusCircle} from '@fortawesome/free-solid-svg-icons/faMinusCircle';
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons/faPlusCircle';

import {faPlus, faMinus, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {useContext} from "react";
import {CartStore} from "../contexts/CartContext";

import {useNavigate} from "react-router-dom";
import {asDollarsAndCents} from "../utils";


const getBookImageUrl = function (book: BookItem): string {
    // let filename = book.title.toLowerCase();
    let filename = book.title;
    // filename = filename.replace(/ /g, "-");
    // filename = filename.replace(/'/g, "");
    filename = filename + ".jpg";
    try {
        return require('../assets/images/books/' + filename);
    } catch (_) {
        // return require('../assets/images/books/the-iliad.gif');
        return require('../assets/images/books/A Little Life.jpg');
    }
};
 function CartTable()
 {
     const navigate = useNavigate();
     const {cart, dispatch} = useContext(CartStore);
     const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
     const subtotal = cart.reduce((acc, item) => acc + item.quantity * item.book.price, 0);
     const incrementQuantity = (itemID:number) => {dispatch({type: 'ADD', id: itemID})};
     const decrementQuantity = (itemID:number) => {dispatch({type: 'REMOVE', id: itemID})};
     const removeBook = (itemID:number) => {dispatch({type: 'REMOVEBOOK', id: itemID})};
     const clearCart = () => {dispatch({type: 'CLEAR'})};

     return (

    <div className="cart-table">
        <ul className = "cart2">
            <li className="table-heading">
                <div className="heading-book">Book</div>
                {/*<div className="heading-price">Price / Quantity</div>*/}
                <div className="heading-price">Price</div>
                <div className="heading-quantity">Quantity</div>
                <div className="heading-subtotal">Amount</div>
                <div className="heading-operation">Operation</div>
            </li>

            {cart.map((item) => (
                <li className="item-heading" key={item.id}>
                    <div className="cart-book-image">
                        <img className="cart2" src={getBookImageUrl(item.book)} alt={item.book.title} />
                    </div>
                    <div className="cart-book-title">{item.book.title}</div>
                    {/*<div className="cart-book-price">${(item.book.price).toFixed(2)}</div>*/}
                    <div className="cart-book-price">{asDollarsAndCents(item.book.price)}</div>
                    <div className="cart-book-quantity">
                        <button className="icon-button dec-button" onClick={() => decrementQuantity(item.id)}>
                            <i className="fas fa-minus-circle"><FontAwesomeIcon icon={faMinusCircle} /></i>
                        </button>
                        <span className="quantity">{item.quantity}</span>&nbsp;
                        <button className="icon-button inc-button" onClick={() => incrementQuantity(item.id)}>
                            <i className="fas fa-plus-circle"><FontAwesomeIcon icon={faPlusCircle} /></i>
                        </button>
                    </div>
                    {/*<div className="cart-book-subtotal">${(item.quantity * item.book.price).toFixed(2)}</div>*/}
                    <div className="cart-book-subtotal">{asDollarsAndCents(item.quantity * item.book.price)}</div>
                    <div className="cart-book-operation">

                        {/*<button className="icon-button trash-button" onClick={() => decrementQuantity(item.id)}>*/}
                        <button className="icon-button trash-button" onClick={() => removeBook(item.id)}>
                            <i className="fas fa-trash-alt"><FontAwesomeIcon icon={faTrashAlt} /></i>
                        </button>
                    </div>
                    <div className="line-sep"></div>
                </li>
            ))}

            <li className="cart-summary">
                <button onClick={clearCart} className="clear-cart">Clear Cart</button>
                <div className="total-items">Total Item{totalItems === 1 ? '' : 's'}: {totalItems}</div>
                <div className="subtotal">Subtotal: ${subtotal.toFixed(2)}</div>
            </li>

            <li className="to-checkout">
                <button onClick={() => navigate('/checkout')} className="to-checkout-button">Proceed to Checkout</button>
            </li>
        </ul>
</div>
 )
 }

export default CartTable;

