import '../assets/css/global1.css'
import '../assets/css/header-dropdown1.css';

import Braiding from '../assets/images/categories/Braiding.png';
import PovertybyAmerica from '../assets/images/categories/PovertybyAmerica.png';
import z1619 from '../assets/images/categories/1619.png';
import Research from '../assets/images/categories/The Craft of Research.png';

import {BookItem, CatProp, HomeBook} from "../types";
import LeftCategory from "./LeftCategory";
import CategoryBookListItem from "./CategoryBookListItem";

import HomeBookItem from "./HomeBookItem";
import {useEffect, useState} from "react";
import axios from "axios";
const handleClick = () => {
    window.location.href = 'category1.html';
};
// function Home(props:CatProp) {
function Home() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/HaoBookstoreReactTransact/api/categories/name/Science/books')
            .then((result) => setBooks(result.data ))
            .catch(console.error);
    }, []);

    // useEffect(() => {
    //     axios.get('http://webdev.cs.vt.edu:8080/HaoBookstoreReactTransact/api/categories/name/Science/books')
    //         .then((result) => setBooks(result.data ))
    //         .catch(console.error);
    // }, []);

    return (

        <div>
            <div className="flex middle">
                {/*<LeftCategory catList={props.catList}/>*/}
                <LeftCategory />

                <div className="flex right">
                    <p style={{ marginTop: '20px' }}>Discover a world of literary treasures at HowBooks. We are your premier
                        destination for all things books, where the magic of storytelling comes to life
                        with just a click. Whether you're a passionate bookworm, a curious explorer, or
                        a casual reader, our virtual shelves are brimming with endless possibilities.
                    </p>
                    {/* <img className="new-arrivals" src="images/site/new arrivals.png" alt="new arrivals" width="776px" height="96px" /> */}
                    <div style={{ color: 'rgba(32, 109, 76, 0.73)', fontSize: '30px', position: 'relative' }}>
                        <b style={{ fontSize: '70px', color: '#2f6d4b', position: 'relative', top: '10px' }}>N</b><span>ew Arrivals</span>
                        <div style={{ width: '800px', height: '1px', backgroundColor: '#7ea590', position: 'absolute', bottom: '5px', left: '60px' }}></div>
                    </div>

                    <div className="flex index-image-items">
                        {books.filter((book: HomeBook) => book.isFeatured)
                            .map((book:HomeBook) => (
                            <HomeBookItem key={book.bookId} bookId={book.bookId} title={book.title} author={book.author} isFeatured={book.isFeatured}/>))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;
