import { CategoryRepository } from '../repositoties';

function getCategory(id) {
    return CategoryRepository.getCategory(id);
}

function getCategories() {
    return CategoryRepository.getCategories();
}

function createCategory(category) {
    return CategoryRepository.createCategory(category);
}

function updateCategory(category) {
    return CategoryRepository.updateCategory(category);
}

function deleteCategory(id) {
    return CategoryRepository.deleteCategory(id);
}

export const CategoryService = {
    getCategory,
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory
};
