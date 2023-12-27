import '../assets/css/Confirmation.css'
import ConfirmationTable from "./ConfirmationTable";
import {useContext} from "react";
// import {OrderDetailsStore} from "../Contexts/OrderDetailContext";
import {OrderDetailsContext, OrderDetailsProvider} from "../contexts/OrderDetailsContext";


function ConfirmationPage() {
    const { state} = useContext(OrderDetailsContext);
    const orderDate = () => {
        let date = new Date(state.order.dateCreated);
        return ( date.toLocaleString());
    };
    const ccExpDate = (): Date =>{
        return new Date(state.customer.ccExpDate);
    };
    const formatPhoneNumber = () => {
        const cleanedPhoneNumber = state.customer.phone.replace(/[\s()-]+/g, '');

        const areaCode = cleanedPhoneNumber.slice(0, 3);
        const middle = cleanedPhoneNumber.slice(3, 6);
        const last = cleanedPhoneNumber.slice(6);
        return `${areaCode}-${middle}-${last}`;
    };
    const formatCreditCardInfo = () => {
        const lastFourDigits = state.customer.ccNumber.slice(-4);
        const expDate = new Date(state.customer.ccExpDate);
        const expMonth = expDate.getMonth() + 1; // Months are 0-indexed
        const expYear = expDate.getFullYear();
        return `**** **** **** ${lastFourDigits} (${expMonth.toString().padStart(2, '0')}-${expYear})`;
    };

    return (
        <div className="confirmationView">
            <ul>
                {/*<li>Confirmation #: 123456789</li>*/}
                <li>Confirmation #: {state?.order?.confirmationNumber}</li>
                <li>Order Date: {orderDate()}</li>
            </ul>
            <ConfirmationTable/>
            <ul>
                <li><b>Name:</b> {state?.customer?.customerName}</li>
                <li><b>Address:</b> {state?.customer?.address}</li>
                <li><b>Email:</b> {state?.customer?.email}</li>
                {/*<li><b>Phone:</b> 703-555-1212</li>*/}
                <li><b>Phone:</b> {formatPhoneNumber()}</li>
                {/*<li><b>Credit Card:</b> **** **** **** 1111 (08-2020)</li>*/}
                <li><b>Credit Card:</b>{formatCreditCardInfo()}</li>
            </ul>
            <div id="customerInfo"></div>
        </div>
    )
}
export default ConfirmationPage;