import express from 'express';
import asyncHandler from 'express-async-handler';
import { CategoryService } from '../../services';

export const categoriesRouter = express.Router();

// Get all categories
categoriesRouter.get(
    '/',
    asyncHandler(async (req, res) => {
        const categories = await CategoryService.getCategories();
        res.send(categories);
    })
);

// Get one category
categoriesRouter.get(
    '/:id',
    asyncHandler(async (req, res) => {
        const { id } = req.params;
        const category = await CategoryService.getCategory(id);
        res.send(category);
    })
);

// Create an category
categoriesRouter.post(
    '/',
    asyncHandler(async (req, res) => {
        const categoryData = req.body;
        const category = await CategoryService.createCategory(categoryData);
        res.send(category);
    })
);

// Update an category
categoriesRouter.put(
    '/:id',
    asyncHandler(async (req, res) => {
        const categoryData = req.body;
        const category = await CategoryService.updateCategory(categoryData);
        res.send(category);
    })
);

// Delete an category
categoriesRouter.delete(
    '/:id',
    asyncHandler(async (req, res) => {
        const { id } = req.params;
        await CategoryService.deleteCategory(id);
        res.status(204).send(); // No Content
    })
);
