import AppHeader from './components/AppHeader';
import AppFooter from './components/AppFooter';
import Home from './components/Home'
import CategoryBookList from './components/CategoryBookList';
import {
  HashRouter as Router,
  Routes,
  Route,
} from "react-router-dom"
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import ConfirmationPage from "./components/ConfirmationPage";

function App() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/HaoBookstoreReactTransact/api/categories')
            .then((result) => setCategories(result.data ))
            .catch(console.error);
    }, []);

    // useEffect(() => {
    //     axios.get('http://webdev.cs.vt.edu:8080/HaoBookstoreReactTransact/api/categories')
    //         .then((result) => setCategories(result.data ))
    //         .catch(console.error);
    // }, []);



    return (
      // <Router basename={"HaoBookstoreReactState"}>
      <Router>
        <AppHeader catList={categories}/>
        <Routes>home
          {/*<Route path="/" element={<Home catList={categories}/>} />*/}
          {/*<Route path="/categories" element={<CategoryBookList catList={categories}/>} />*/}
          {/*<Route path="/categories/:id" element={<CategoryBookList catList={categories} />} />*/}
            <Route path="/" element={<Home />} />
            <Route path="/categories" element={<CategoryBookList />} />
            <Route path="/categories/:id" element={<CategoryBookList />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            {/*<Route path="/confirmation" element={<Confirmation />} />*/}
            <Route path="/confirmation" element={<ConfirmationPage />} />
            <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
        <AppFooter />
      </Router>
  );
}

export default App;

