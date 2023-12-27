import {useEffect, useState, ReactNode} from "react";
import axios from "axios";
import { Category } from "../contexts/CategoryContext";

function CategoryContext ({ children } : { children: ReactNode })  {
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
        <Category.Provider value ={categories}>{children}</Category.Provider>
    );
}
export default CategoryContext;