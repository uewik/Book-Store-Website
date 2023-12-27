import '../assets/css/global1.css'
import '../assets/css/header-dropdown1.css';
import {Link, useNavigate} from 'react-router-dom';
import logo from '../assets/images/site/bookstore-logo.png';
import cate from '../assets/images/site/categories.png';
import search from '../assets/images/site/search.png';
import {CatProp, ShoppingCartItem} from "../types";
import {useContext} from "react";
import {CartStore} from "../contexts/CartContext";
import {handleCategoryClick} from "./LeftCategory";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCartShopping, faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";

function AppHeader(props:CatProp) {
  const {cart} = useContext(CartStore);

  const cartQuantity = (cart.length === 0) ? 0 : cart.reduce((total, item) => total + item.quantity, 0);
  return (
    <div>
      <div className="flex top-strip">
        <div><b>Welcome, please</b>&nbsp;</div>
        <a href=""><b>log in</b></a>
      </div>

      <div className="flex header">
        <div className="flex logo-box">
          {/*<Link to={"/"}>*/}
          {/*  <a><img src={logo}*/}
          {/*    alt="logo"*/}
          {/*    width="100"*/}
          {/*    height="64.71" /></a>*/}
          {/*</Link>*/}
          {/*<Link to={"/"}>*/}
          {/*  <a style={{ color: '#FF002E', fontSize: '50px', textDecoration: 'none' }}>*/}
          {/*    HowBooks</a>*/}
          {/*</Link>*/}
          <Link to={"/"}>
            <img src={logo}
                    alt="logo"
                    width="100"
                    height="64.71" />
          </Link>
          <Link to={"/"} style={{ color: '#FF002E', fontSize: '50px', textDecoration: 'none' }}>
              HowBooks
          </Link>

        </div>
        <div className="flex search_category">
          <div>
            <form className="flex search" >
              <input type="text" placeholder={"Search by Title"} className="search-bar" />
              <div className="header-dropdown">
                <button className="categories-button" >
                  <img src={cate} alt="categories" />
                </button>
                <ul className="list">
                  {props.catList.map((item) =>
                      // <Link to = {"/categories/" + item.name}><li><a>{item.name}</a></li></Link>
                    // <Link to = {"/categories/" + item.name}><li>{item.name}</li></Link>
                    <Link key={item.categoryId} to = {"/categories/" + item.name} onClick={() => handleCategoryClick(item.name)}>
                      <li>{item.name}</li>
                    </Link>
                  )}
                </ul>
              </div>
              {/*<div style={{ backgroundColor: '#ff3a3a' }} >*/}
              {/*  <img src={search} alt="" />*/}
              {/*</div>*/}
              <button className="search-icon" >
                {/*<img src={search} alt="search" />*/}
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </button>
            </form>
          </div>

        </div>
        {/* <!-- <input className="btn-cart" type="image" src="images/site/cart.png" alt="cart" width="132px" height="46px"> --> */}
        <Link to="/cart">
          <button className="btn-cart">
            <FontAwesomeIcon icon={faCartShopping}/> cart {cartQuantity}
          </button>
        </Link>
      </div>
    </div>
  )
}
export default AppHeader;

