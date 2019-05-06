import { action, computed, decorate, observable } from 'mobx';
import { Category } from '../models';
import { CategoryService } from '../services';
import { RootStore } from './RootStore';

export class CategoryStore {
    rootStore: RootStore;
    loading = false;
    error?: Error;
    categories: Array<Category> = [];
    selectedCategoryId = 0;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    init() {}

    destroy() {}

    reset() {
        this.categories = [];
        this.error = undefined;
        this.loading = true;
    }

    setCategories(categories: Array<Category>) {
        // Sort by category name
        categories.sort((a, b) => {
            const nameA = a.name.toLowerCase();
            const nameB = b.name.toLowerCase();
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0;
        });

        this.categories = categories;
        this.loading = false;
    }

    setError(e: Error) {
        this.error = e;
    }

    setSelectedCategoryId(categoryId: number) {
        this.selectedCategoryId = categoryId;
    }

    get selectedCategory() {
        return this.categories.find(
            category => category.id === this.selectedCategoryId
        );
    }

    getCategory(categoryId: number): Category | undefined {
        return this.categories.find(category => category.id === categoryId);
    }

    async fetchCategories() {
        // if categories have been cached, don't fetch again
        if (this.categories.length > 0) {
            return true;
        }

        try {
            this.reset();
            const data = await CategoryService.getCategories();
            this.setCategories(data);
        } catch (e) {
            this.setError(e);
        }
    }
}

decorate(CategoryStore, {
    loading: observable,
    error: observable,
    categories: observable.shallow,
    selectedCategoryId: observable,
    selectedCategory: computed,
    reset: action,
    setCategories: action,
    setError: action,
    setSelectedCategoryId: action
});
