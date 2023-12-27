import '../assets/css/ConfirmationTable.css'

import { asDollarsAndCents } from "../utils";


// import {OrderDetailsStore} from "../Contexts/OrderDetailContext";
import {useContext} from "react";
import {OrderDetailsContext} from "../contexts/OrderDetailsContext";

function ConfirmationTable() {

  const { state} = useContext(OrderDetailsContext);

// A helper function - optional to use
//   const bookAt = function (state: OrderDetail, index: number): BookItem {
//     return state.books[index];
//   };

  const findLineItemForBook = (bookId:number) => {
    return state.lineItems.find(lineItem => lineItem.bookId === bookId);
  };

  const totalBooksOrdered = state.lineItems.reduce((total, lineItem) => total + lineItem.quantity, 0);

  return (
    <table className="confirmation_table">
      <tbody>
      <tr>
            <th style={{ textAlign: 'center'}}>Title</th>
            <th style={{ textAlign: 'center'}}>Quantity</th>
            <th style={{ textAlign: 'center'}}>Price</th>
      </tr>
        {state.books?.map((book, i) => {
          const lineItem = findLineItemForBook(book.bookId);
          return (
              <tr className="confirmation_tr" key={i}>
                <td className="confirmation_td">{book.title}</td>
                {/*<td className="confirmation_td">{book.bookId}</td>*/}
                <td className="confirmation_td">{lineItem ? lineItem.quantity : 'N/A'}</td>
                {/*<td className="confirmation_td">{asDollarsAndCents((book.price)*100)}</td>*/}
                <td className="confirmation_td">{asDollarsAndCents(book.price * (lineItem ? lineItem.quantity : 0))}</td>
              </tr>
          );
        })}
        <tr>
          <td style={{ textAlign: 'center' }}><b>Surcharge :</b></td>
          <td></td>
          <td style={{ textAlign: 'right', paddingRight: '0.5em'}}>{asDollarsAndCents(5)}</td>
        </tr>
        <tr>
          <td style={{ textAlign: 'center'}}><b>Total :</b></td>
          <td style={{ textAlign: 'center'}}>{totalBooksOrdered}</td>
          {/*<td>{asDollarsAndCents((25.00) * 100)}</td>*/}
          <td style={{ textAlign: 'right', paddingRight: '0.5em'}}>{asDollarsAndCents(state.order.amount)}</td>
        </tr>
      </tbody>
    </table>
  )
}

export default ConfirmationTable;