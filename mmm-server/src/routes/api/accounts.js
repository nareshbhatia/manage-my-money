import express from 'express';
import asyncHandler from 'express-async-handler';
import { AccountService } from '../../services';

export const accountsRouter = express.Router();

// Get all accounts
accountsRouter.get(
    '/',
    asyncHandler(async (req, res) => {
        const accounts = await AccountService.getAccounts();
        res.send(accounts);
    })
);

// Get one account
accountsRouter.get(
    '/:id',
    asyncHandler(async (req, res) => {
        const { id } = req.params;
        const account = await AccountService.getAccount(id);
        res.send(account);
    })
);

// Create an account
accountsRouter.post(
    '/',
    asyncHandler(async (req, res) => {
        const accountData = req.body;
        const account = await AccountService.createAccount(accountData);
        res.send(account);
    })
);

// Update an account
accountsRouter.put(
    '/:id',
    asyncHandler(async (req, res) => {
        const accountData = req.body;
        const account = await AccountService.updateAccount(accountData);
        res.send(account);
    })
);

// Delete an account
accountsRouter.delete(
    '/:id',
    asyncHandler(async (req, res) => {
        const { id } = req.params;
        await AccountService.deleteAccount(id);
        res.status(204).send(); // No Content
    })
);
