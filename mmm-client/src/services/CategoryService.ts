import axios from 'axios';
import { Category } from '../models';

const api = process.env.REACT_APP_API_URL;

function getCategories(): Promise<Array<Category>> {
    return axios.get(`${api}/categories`).then(resp => resp.data);
}

// function getCategory(id) {
// }
//
// function createCategory(category) {
// }
//
// function updateCategory(category) {
// }
//
// function deleteCategory(id) {
// }

export const CategoryService = {
    getCategories
    // getCategory,
    // createCategory,
    // updateCategory,
    // deleteCategory
};
