import  "../assets/css/checkout.css"
//import { isCreditCard, isMobilePhone, isvalidEmail } from '../utils';
import {BookItem, CustomerForm, months, OrderDetail, OrderDetails, years} from "../types";
import {CartStore} from "../contexts/CartContext";
import {ChangeEvent, FormEvent, useContext, useState} from "react";
import { useNavigate} from "react-router-dom";
import {CartTypes} from "../reducers/CartReducer";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusCircle} from "@fortawesome/free-solid-svg-icons/faPlusCircle";
import {faMinusCircle} from "@fortawesome/free-solid-svg-icons/faMinusCircle";
import {isCreditCard, isMobilePhone, isvalidEmail} from "../utils";
import {OrderDetailsContext} from "../contexts/OrderDetailsContext";

import axios from "axios";





function CheckoutPage()
{
    const {state, dispatch: orderDispatch} = useContext(OrderDetailsContext);


    const getBookImageUrl = function (book: BookItem): string {
      // let filename = book.title.toLowerCase();
      let filename = book.title;
      // filename = filename.replace(/ /g, "-");
      // filename = filename.replace(/'/g, "");
      // filename = filename + ".gif";
      filename = filename + ".jpg";
      try {
         return require('../assets/images/books/' + filename);
      } catch (_) {
         return require('../assets/images/books/A Little Life.jpg');
      }
   };

   /*
    * This will be used by the month and year expiration of a credit card
    *  NOTE: For example yearFrom(0) == <current_year>
   */
   function yearFrom(index: number) {
      return new Date().getFullYear() + index;
   }

   const {cart, dispatch} = useContext(CartStore);
   const navigate = useNavigate();

   // TO DO code that calculates the total price of your cart
   const cartTotalPrice = cart.reduce((acc, item) => acc + item.quantity * item.book.price, 0);
   // TO DO the code that calculates the total number of items in your cart
   const cartQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);

   const [nameError, setNameError] = useState("");

   // TO DO error states for the rest of the input elements
   const [addressError, setAddressError] = useState("");
   const [phoneError, setPhoneError] = useState("");
   const [emailError, setEmailError] = useState("");
   const [ccNumberError, setCcNumberError] = useState("");
   // const [ccExpiryMonthError, setCcExpiryMonthError] = useState("");
   // const [ccExpiryYearError, setCcExpiryYearError] = useState("");

   const [formData, setFormData] = useState({name: "",address:"", phone:"",email: "",ccNumber: "", ccExpiryMonth:1,ccExpiryYear:2023});

   const [checkoutStatus, setCheckoutStatus] = useState("");
    const [ccExpiryDateError, setCcExpiryDateError] = useState("");

   function isValidForm()
   {
       var result = true;
       if (formData.name.length < 4 || formData.name.length > 45) {
           setNameError("Name must be between 4 and 45 characters long!");
           // return false;
           result = false;
       } else {
           setNameError("");
       }
       // Validation for address
       if (formData.address.trim().length < 4 || formData.address.trim().length > 45) {
           setAddressError("Address must be between 4 and 45 characters long!");
           // return false;
           result = false;
       } else {
           setAddressError("");
       }
       // Validation for phone
       if (!isMobilePhone(formData.phone)) {
           setPhoneError("Invalid phone number");
           // return false;
           result = false;
       } else {
           setPhoneError("");
       }
       // Validation for Email
       if (!isvalidEmail(formData.email)) {
           setEmailError("Invalid email address");
           // return false;
           result = false;
       } else {
           setEmailError("");
       }
       // Validation for credit card number
       if (!isCreditCard(formData.ccNumber)) {
           setCcNumberError("Invalid credit card number");
           // return false;
           result = false;
       } else {
           setCcNumberError("");
       }
       return result;
   }

   function handleInputChange(event:ChangeEvent<HTMLInputElement|HTMLSelectElement>) {

      const { name, value } = event.target;

      switch (name) {
         case 'name':
            setFormData((prevFormData) => ({...prevFormData, [name]: value}));
            if(value.length < 4 || value.length > 45) {
               setNameError("Name must be between 4 and 45 characters long!");
            }
            else {
                   setNameError("");
                 }
            break;

         case 'address':
             setFormData((prevFormData) => ({...prevFormData, [name]: value}));
             if(value.length < 4 || value.length > 45) {
                 setAddressError("Address must be between 4 and 45 characters long!");
             }
             else {
                 setAddressError("");
             }
            break;

         case 'phone':
            setFormData((prevFormData) => ({...prevFormData, [name]: value}));
            isMobilePhone(value) ? setPhoneError("") : setPhoneError("Invalid Phone Number");
            break;

         case 'email':
            setFormData((prevFormData) => ({...prevFormData, [name]: value}));
            isvalidEmail(value) ? setEmailError("") : setEmailError("Invalid Email");
            break;

         case 'ccNumber':
            setFormData((prevFormData) => ({...prevFormData, [name]: value}));
            isCreditCard(value) ? setCcNumberError("") : setCcNumberError("Invalid Credit Card Number");
            break;

         case 'ccExpiryMonth':
            setFormData((prevFormData) => ({...prevFormData, [name]:parseInt(value,10)}));
            break;
         case 'ccExpiryYear':
            setFormData((prevFormData) => ({...prevFormData, [name]: parseInt(value,10)}));
            break;
         default:
            break;
      }
   }

    async function submitOrder(event:FormEvent) {
        event.preventDefault();
        console.log("Submit order");
        const isFormCorrect =  isValidForm();
        console.log(isFormCorrect);
        if (!isFormCorrect) {
            setCheckoutStatus("ERROR");
        }
        else {
            setCheckoutStatus("PENDING");
            const orders = await placeOrder({
                name: formData.name,
                address: formData.address,
                phone: formData.phone,
                email: formData.email,
                ccNumber: formData.ccNumber,
                ccExpiryMonth: formData.ccExpiryMonth,
                ccExpiryYear: formData.ccExpiryYear,
            })
            if(orders) {
                setCheckoutStatus("OK");
                navigate('/confirmation');}
            else{
                console.log("Error placing order");
            }
        }
    }

    const placeOrder =  async (customerForm: CustomerForm) =>  {
        const order = { customerForm: customerForm, cart:{itemArray:cart} };

        const orders = JSON.stringify(order);
        // console.log(orders);     //you can uncomment this to see the orders JSON on the console
        // const url = 'api/orders';
        const url = '/HaoBookstoreReactTransact/api/orders';
        const orderDetails: OrderDetail = await axios.post(url, orders,
            {headers: { "Content-Type": "application/json", } })
            .then((response) => {
                    dispatch({type: CartTypes.CLEAR});
                    console.log("response data: ", response.data);
                    return response.data;
            })
            .catch((error)=> {
                console.log(error);
                if (error.response.data.includes("Please enter a valid expiration date")) {
                    setCcExpiryDateError("ERROR");
                    return null;
                }
            });

        const orderDetailsData:OrderDetail = orderDetails;
        console.log("order details Data: ", orderDetailsData);
        console.log("order details: ", orderDetails);
        orderDispatch({ type: 'UPDATE', payload: orderDetailsData });

        return orderDetails;
    }

   return (
       <section className="checkout-cart-table-view">
          <div className="checkout-page-body">
             <div>
                <form
                    // ref={formRef}
                    className="checkout-form"
                    onSubmit = {submitOrder}
                    method="post"
                >
                   <div>
                      <label htmlFor="fname">Name</label>
                      <input
                          type="text"
                          size={20}
                          name="name"
                          id="fname"
                          value={formData.name}
                          onChange={handleInputChange}
                      />
                   </div>
                   <> {nameError && <div className="error"> {nameError}</div>}</>

                  <div>
                     <label htmlFor="address">Address</label>
                     <input
                         type="text"
                         size={20}
                         name="address"
                         id="address"
                         value={formData.address}
                         onChange={handleInputChange}
                     />
                  </div>
                  <> {addressError && <div className="error"> {addressError}</div>}</>

                  <div>
                      <label htmlFor="phone">Phone</label>
                      <input
                           type="text"
                           size={20}
                           name="phone"
                           id="phone"
                           value={formData.phone}
                           onChange={handleInputChange}
                      />
                  </div>
                  <> {phoneError && <div className="error"> {phoneError}</div>}</>

                     {/*add the form elements for email Together with the error display*/}
                  <div>
                     <label htmlFor="email">Email</label>
                     <input
                         type="text"
                         size={20}
                         name="email"
                         id="email"
                         value={formData.email}
                         onChange={handleInputChange}
                     />
                  </div>
                  <> {emailError && <div className="error"> {emailError}</div>}</>

                        {/*add the form elements for Credit card Together with the error display*/}
                 <div>
                      <label htmlFor="ccNumber">Credit Card</label>
                      <input
                        type="text"
                        size={20}
                        name="ccNumber"
                        id="ccNumber"
                        value={formData.ccNumber}
                        onChange={handleInputChange}
                      />
                 </div>
                 <> {ccNumberError && <div className="error"> {ccNumberError}</div>}</>


                  <div >
                      <label htmlFor="ccExpiryMonth">Exp Date</label>
                      <select style={{color:'black', border: '1px solid #000'}} name ="ccExpiryMonth" value ={formData.ccExpiryMonth} onChange={handleInputChange}>
                         { months.map((month, i) => (
                             <option  key={i}  value={i + 1}  >
                                { month }
                             </option>
                         ))}
                      </select>

                     <select style={{color:'black', border: '1px solid #000'}} name ="ccExpiryYear" value ={formData.ccExpiryYear} onChange={handleInputChange}>
                         { years.map((year, i) => (
                             <option  key={i}  value={yearFrom(year)}  >
                                 { yearFrom(year) }
                             </option>
                         ))}
                     </select>
                  </div>
 
                </form>
             </div>

              <div>
                  <form className='total-form'>
                      <div className="checkout-box">
                          <div className="checkout-flex-container">
                              <div className="checkout-flex-labels">
                                  <div>Items ({cartQuantity}):</div>
                                  <div>Surcharge: </div>
                                  <div><strong>Total</strong></div>
                              </div>
                              <div className="checkout-flex-prices">
                                  <div>{cartTotalPrice}</div>
                                  {/*<div>{(cartTotalPrice * 0.1).toFixed(2)}</div>*/}
                                  <div>5</div>
                                  <div className="horizontal-line">
                                      {/*<strong>{(cartTotalPrice * 1.1).toFixed(2)}</strong>*/}
                                      <strong>{cartTotalPrice + 5}</strong>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div className="checkout-button">
                          <button className="submit-button" onClick={(event) =>
                          {submitOrder(event)}}>Complete Purchase</button>
                      </div>
                  </form>
              </div>

              <div>
                      {/*The following code displays different string based on the */}
                      {/*value of the checkoutStatus*/}
                      {/*Note the ternary operator*/}
                      {
                         checkoutStatus !== ''?
                             <>
                                <section className="checkoutStatusBox" >
                                   { (checkoutStatus === 'ERROR')?
                                   <div> Error: Please fix the problems above and try again. </div> :
                                       (ccExpiryDateError === 'ERROR') ? <div> Error: Please enter a valid credit card
                                               expiration date. </div> : ( checkoutStatus === 'PENDING'?
                                           <div> Processing... </div> : (checkoutStatus === 'OK'?
                                               <div> Order placed... </div>:
                                               <div> An unexpected error occurred, please try again. </div>))
                                   }
                                </section>
                             </>
                             :<></>}
                   </div>
                </div>

          <div >
             {/*This displays the information about the items in the cart*/}
             <ul className="checkout-cart-info">
                {
                   cart?.map((item, i) => (
                       // <div className ="checkout-cart-book-item" >
                       <div className ="checkout-cart-book-item" key={i}>
                          <div className="checkout-cart-book-image" >
                       {/*   <div className="checkout-cart-book-image" key = {i} >*/}
                             <img src={getBookImageUrl(item.book)} alt="title" className ="checkout-cart-info-img"
                                  width="20%"
                                  height="20%"
                             />
                          </div>
                          <div className="checkout-cart-book-info">
                             <div className="checkout-cart-book-title">{ item.book.title }</div>

                             <div className="checkout-cart-book-subtotal">
                              {/*The total cost of this specific book displayed here*/}
                             </div>
                             <div className="checkout-cart-book-quantity">
                                <button  className="checkout-icon-button inc-button"      onClick={() => {
                                   dispatch({ type: CartTypes.ADD, book:item.book, id: item.book.bookId });
                                }} >
                                   <i className="fas fa-plus-circle"><FontAwesomeIcon icon={faPlusCircle} /></i>
                                </button>
                                <button className="checkout-num-button">{ item.quantity }</button>
                                <button className="checkout-icon-button dec-button"
                                        onClick={() => {
                                           dispatch({ type: CartTypes.REMOVE, book:item.book, id: item.book.bookId });
                                        }}
                                >
                                   <i className="fas fa-minus-circle"><FontAwesomeIcon icon={faMinusCircle} /></i>
                                </button>
                             </div>
                          </div>
                       </div>
                   )) }
             </ul>
          </div>
       </section>
   )}

export default CheckoutPage;