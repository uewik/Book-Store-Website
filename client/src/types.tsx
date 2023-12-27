// import Classics from './assets/images/categories/classics.jpg';
// import Fantasy from './assets/images/categories/fantasy.jpg';
// import Mystery from './assets/images/categories/mystery.jpg';
// import Romance from './assets/images/categories/romance.jpg';

export interface Order {
  orderId: number;
  amount: number;
  dateCreated: number;
  confirmationNumber: number;
  customerId: number;
}

export interface LineItem {
  bookId: number;
  orderId: number;
  quantity: number;
}
export interface Customer {
  customerName: string;
  address: string;
  phone: string;
  email: string;
  ccNumber: string;
  ccExpDate: number;
}

export interface OrderDetail {  //orderDetails in project 10
  order: Order;
  customer: Customer;
  books: BookItem[];
  lineItems: LineItem[];
}

export interface OrderDetails {
  order: Order;
  customer: CustomerForm;
  books: BookItem[];
}

export interface CustomerForm {
  name: string;
  address: string;
  phone: string;
  email: string;
  ccNumber: string;
  ccExpiryMonth: number;
  ccExpiryYear: number;
}

export interface BookItem {
  bookId: number;
  title: string;
  author: string;
  price: number;
  isPublic: boolean;
  categoryId: number;
}

export interface HomeBook {
  bookId: number;
  title: string;
  author: string;
  isFeatured: boolean;
}

export interface CatProp{
  catList:CategoryItem[];
}

export interface CategoryItem {
  categoryId: number;
  name: string;
}
// export const categoryImages: Record<string, any> = {
//   classics: Classics,
//   fantasy : Fantasy,
//   mystery : Mystery,
//   romance : Romance
// };

// export const categoryList = [
//   { categoryId: 1001, name: "Science" },
//   { categoryId: 1002, name: "Art" },
//   { categoryId: 1003, name: "Computer" },
//   { categoryId: 1004, name: "Fiction" },
// ];



//this interface represents the items(books) in our shopping cart
export class ShoppingCartItem {
  id:number;
  book: BookItem;
  quantity: number;

  constructor(theBook: BookItem) {
    this.id = theBook.bookId;
    this.book = theBook;
    this.quantity = 1;
  }
}
// this is used by the reducer. You can define it on the CartReducer
export const initialCartState:ShoppingCartItem[] =  [];
export interface ContextProps {
  children: JSX.Element | JSX.Element[]
}
export const months: string[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const years = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];


export interface Order {
  orderId: number;
  amount: number;
  dateCreated: number;
  confirmationNumber: number;
  customerId: number;
}


export interface ServerErrorResponse {
  reason: string;
  message: string;
  fieldName: string;
  error: boolean;
}

// export const bookList = [
//   {
//     bookId: 1001,
//     title: "Enough",
//     author: "Cassidy Hutchinson",
//     price: 20,
//     isPublic: true,
//   },
//   {
//     bookId: 1002,
//     title: "Poverty, By America",
//     author: "Matthew Desmond",
//     price: 9,
//     isPublic: false,
//   },
//   {
//     bookId: 1003,
//     title: "Braiding Sweetgrass",
//     author: "Robin Wall",
//     price: 60,
//     isPublic: true,
//   },
//   {
//     bookId: 1004,
//     title: "The Craft of Research",
//     author: "Wayne C booth",
//     price: 4,
//     isPublic: false,
//   },
//   {
//     bookId: 1005,
//     title: "Made for Living",
//     author: "Amber Lewis",
//     price: 20,
//     isPublic: false,
//   },  {
//     bookId: 1006,
//     title: "Chanel",
//     author: "Daniele bott",
//     price: 25,
//     isPublic: true,
//   },  {
//     bookId: 1007,
//     title: "The Art of War",
//     author: "Sunn Tzu",
//     price: 11,
//     isPublic: true,
//   },  {
//     bookId: 1008,
//     title: "Ways of Seeing",
//     author: "John Berger",
//     price: 9,
//     isPublic: false,
//   },  {
//     bookId: 1009,
//     title: "Elon Musk",
//     author: "Walter Isaacson",
//     price: 16,
//     isPublic: true,
//   },   {
//     bookId: 1010,
//     title: "Chip War",
//     author: "Chris Miller",
//     price: 12,
//     isPublic: false,
//   },{
//     bookId: 1011,
//     title: "Build",
//     author: "Tony Fadell",
//     price: 11,
//     isPublic: true,
//   },{
//     bookId: 1012,
//     title: "The Manager's Path",
//     author: "Camille Fournier",
//     price: 13,
//     isPublic: false,
//   },{
//     bookId: 1013,
//     title: "The 1619 Project",
//     author: "Nikole Hannah",
//     price: 12,
//     isPublic: true,
//   },{
//     bookId: 1015,
//     title: "The Housemaid",
//     author: "Freida McFadden",
//     price: 4,
//     isPublic: true,
//   },{
//     bookId: 1014,
//     title: "A Little Life",
//     author: "Hanya Yanagihara",
//     price: 8,
//     isPublic: false,
//   }, {
//     bookId: 1016,
//     title: "Never Lie",
//     author: "Freida McFadden",
//     price: 42,
//     isPublic: false,
//   }
// ];