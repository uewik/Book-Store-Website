import '../assets/css/CategoryBookListItem.css';
import '../types'
import "../types";
import {BookItem} from "../types";
import {useContext} from "react";
import {CartStore} from "../contexts/CartContext";
import {CartTypes} from "../reducers/CartReducer";
import {asDollarsAndCents} from "../utils";
import {faCartPlus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const bookImageFileName =  (book:BookItem) => {
  // let name = book.title.toLowerCase();
  let name = book.title;
  // name = name.replace(/ /g, "-");
  // name = name.replace(/'/g, "");
  return `${name}.jpg`;
};

function CategoryBookListItem(props:BookItem) {
    const  {dispatch} = useContext(CartStore);
    const addBookToCart = () => {
        dispatch({ id: props.bookId, type: CartTypes.ADD, item:props });
    };

    return (
        <li className="flex book-item">
            <a>
                <img src={require('../assets/images/books/' + bookImageFileName(props))} alt="book.title" height="200px"
                />

                {props.isPublic && (<button className="RN-button">Read Now</button>)}
            </a>
            <div className='right'>
                <div className="book-title">{props.title }</div>
                <div className="book-author">{ props.author }</div>
                {/*<div className="book-price">${ (props.price / 100).toFixed(2) }</div>*/}
                {/*<div className="book-price">{ (props.price).toFixed(2) }</div>*/}
                <div className="book-price">{ asDollarsAndCents(props.price) }</div>
                <button className="ATC-button" onClick={addBookToCart}>
                    <FontAwesomeIcon icon={faCartPlus} style={{color: "#ff002d",}} /> Add to Cart
                </button>
            </div>
        </li>

    )
}
export default CategoryBookListItem;
