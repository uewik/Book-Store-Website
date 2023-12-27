import {Link, NavLink} from "react-router-dom";
import {CategoryItem} from "../types";
import '../assets/css/LeftCategory.css'
import { useContext } from 'react';
import { Category } from "../contexts/CategoryContext";

export const handleCategoryClick = (categoryName: string) => {
    localStorage.setItem('lastViewedCategory', categoryName);
}
// export default function LeftCategory(props: CatProp) {
export default function LeftCategory() {
    const categories = useContext<CategoryItem[]>(Category);

    return (
        <div className="flex_left">
            <div className="flex_categories">
                <div className="title">Categories</div>
                {/*{props.catList.map((category) => (*/}
                {/*    <NavLink*/}
                {/*        to={"/categories/" + category.name}*/}
                {/*        key={category.name}*/}
                {/*    >*/}
                {/*        {({ isActive }) => (*/}
                {/*            <button className="left-buttons">*/}
                {/*                <span className={isActive ? 'active-span' : ''}>{category.name}</span>*/}
                {/*                <span className={isActive ? 'active-span' : ''}>&gt;</span>*/}
                {/*            </button>*/}
                {/*        )}*/}
                {/*    </NavLink>*/}
                {/*))}*/}

                {categories.map((category) => (
                    <NavLink
                        to={"/categories/" + category.name}
                        key={category.name}
                        onClick={() => handleCategoryClick(category.name)}
                    >
                        {({ isActive }) => (
                            <button className="left-buttons">
                                <span className={isActive ? 'active-span' : ''}>{category.name}</span>
                                <span className={isActive ? 'active-span' : ''}>&gt;</span>
                            </button>
                        )}
                    </NavLink>
                ))}
            </div>

            <Link to={"/categories/Science"} >
                <button className="shop">Shop Now</button>
            </Link>
        </div>
    )
}