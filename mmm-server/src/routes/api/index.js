import express from 'express';
import { accountsRouter } from './accounts';
import { categoriesRouter } from './categories';
import { transactionsRouter } from './transactions';

export const apiRouter = express.Router();
apiRouter.use('/accounts', accountsRouter);
apiRouter.use('/categories', categoriesRouter);
apiRouter.use('/transactions', transactionsRouter);
