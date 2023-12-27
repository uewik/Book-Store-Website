import { createContext } from 'react';
import { CategoryItem } from "../types";

export const Category = createContext<CategoryItem[] | []>([]);
Category.displayName = 'CategoryContext';