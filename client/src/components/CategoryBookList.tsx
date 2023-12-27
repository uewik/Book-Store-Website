import '../assets/css/global1.css'
import '../assets/css/header-dropdown1.css';

import {CatProp} from "../types";
import LeftCategory from "./LeftCategory";
import CategoryBookListItem from './CategoryBookListItem';
import {BookItem} from "../types";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
// function CategoryBookList(props:CatProp) {
function CategoryBookList() {

    const {id} = useParams ();
    const [category, setCategory] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8080/HaoBookstoreReactTransact/api/categories/name/${id}/books/`)
            .then((result) => setCategory(result.data ))
            .catch(console.error);
    }, [id]);

    // useEffect(() => {
    //     axios.get(`http://webdev.cs.vt.edu:8080/HaoBookstoreReactTransact/api/categories/name/${id}/books/`)
    //         .then((result) => setCategory(result.data ))
    //         .catch(console.error);
    // }, [id]);

    return (
        <div>
            <div className="flex middle">
                {/*<LeftCategory catList={props.catList}/>*/}
                <LeftCategory />

                <div className="flex right">
                    <div className="flex image-items">
                        {category.map((book:BookItem) => (
                            <CategoryBookListItem  key={book.bookId} bookId={book.bookId} isPublic={book.isPublic} price={book.price} title={book.title} author={book.author} categoryId={book.categoryId}/>))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CategoryBookList;
