import '../assets/css/global1.css'
import '../assets/css/header-dropdown1.css';

import {HomeBook} from "../types";

const bookImageFileName =  (book:HomeBook) => {
    let name = book.title;
    return `${name}.jpg`;
};

export default  function HomeBookItem(props:HomeBook) {
    return (
        <a>
            <img
                // src={`../assets/images/books/${props.title}.jpg`}
                src={require('../assets/images/books/' + bookImageFileName(props))}
                alt={props.title} height="200px"
            />
            {/*<p>{props.title}</p>*/}
            {/*<p style={{ color: 'rgba(0, 0, 0, 0.5)' }}>{props.author}</p>*/}
            <div className="book-title">{props.title }</div>
            <div className="book-author">{ props.author }</div>
        </a>
    )
}
