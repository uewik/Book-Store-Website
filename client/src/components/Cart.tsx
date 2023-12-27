import CartTable from "./CartTable";
import {useContext} from "react";
import {CartStore} from "../contexts/CartContext";
import {useNavigate} from "react-router-dom";

function Cart() {
    const {cart} = useContext(CartStore);
    const navigate = useNavigate();

    const handleContinueShopping = () => {
        const lastViewedCategory = localStorage.getItem('lastViewedCategory');

        if (lastViewedCategory) {
            navigate(`/categories/${lastViewedCategory}`);
        } else {
            navigate(`/categories/Science`);
        }
    }

    if (cart.length === 0) {
        return (
            <div>
                <h1>&nbsp;&nbsp;Cart Page</h1>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;Your cart is empty.</p>
                {/*<button className="continue-shop" onClick={() => navigate(-1)}>Continue Shopping</button>*/}
                <button className="continue-shop" onClick={handleContinueShopping}>Continue Shopping</button>
            </div>
        )}
    else {
        return (
            <div>
                <h1>&nbsp;&nbsp;Cart Page</h1>
                <CartTable></CartTable>
                <button className="continue-shop" onClick={handleContinueShopping}>Continue Shopping</button>
            </div>
        )
    }
}
export default Cart;