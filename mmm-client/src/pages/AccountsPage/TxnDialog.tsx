import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/styles';
import { Field, Form, Formik } from 'formik';
import * as yup from 'yup';
import { Select, TextInput } from '../../components';
import { Category, TransactionInput } from '../../models';
import { stringToNumber } from '../../utils';

const useStyles = makeStyles({
    dialogPaper: {
        width: 400
    },
    content: {
        display: 'flex',
        flexDirection: 'column'
    },
    selectStyle: {
        width: '100%'
    }
});

// This is to allow amount field to be blank for new transactions
// See https://github.com/jaredpalmer/formik/issues/961#issuecomment-473191907
export interface FormInput {
    id?: number;
    txnDate: string;
    payee: string;
    memo: string;
    amount: string;
    accountId: number;
    categoryId: number;
}

export interface TxnDialogProps {
    formInput: FormInput;
    categories: Array<Category>;
    onSave: (txn: TransactionInput) => void;
    onCancel: () => void;
}

export const TxnDialog = ({
    formInput,
    categories,
    onSave,
    onCancel
}: TxnDialogProps) => {
    const classes = useStyles();

    // Based on https://stackoverflow.com/a/5917250/293680
    // Commas optional as long as they're consistent
    // Can't start with "."
    // Pass: 1,000,000, 1000000, 1000000.00 -1000
    // Fail: 10000,000, 1,00,00
    const money = new RegExp('^-?(\\d+|\\d{1,3}(,\\d{3})*)(\\.\\d+)?$');

    const validationSchema = yup.object().shape({
        txnDate: yup.date().required(),
        payee: yup.string().required(),
        amount: yup
            .string()
            .matches(money)
            .required(),
        accountId: yup.number().required(),
        categoryId: yup.number().required()
    });

    function mapFormInputToEntity(values: FormInput): TransactionInput {
        const { amount, ...rest } = values;
        return {
            amount: stringToNumber(values.amount),
            ...rest
        };
    }

    return (
        <Formik<FormInput>
            initialValues={formInput}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
                onSave(mapFormInputToEntity(values));
                setSubmitting(false);
            }}
            render={({ submitForm }) => (
                <Dialog open={true} classes={{ paper: classes.dialogPaper }}>
                    <DialogTitle>
                        {formInput.id
                            ? 'Edit Transaction'
                            : 'Create Transaction'}
                    </DialogTitle>
                    <DialogContent className={classes.content}>
                        <Form>
                            <Field
                                name="txnDate"
                                component={TextInput}
                                label="Date"
                                type="date"
                                fullWidth
                            />
                            <Field
                                name="payee"
                                component={TextInput}
                                label="Payee"
                                fullWidth
                            />
                            <Field
                                name="categoryId"
                                component={Select}
                                label="Category"
                                options={categories}
                                className={classes.selectStyle}
                            />
                            <Field
                                name="amount"
                                component={TextInput}
                                label="Amount"
                                fullWidth
                            />
                            <Field
                                name="memo"
                                component={TextInput}
                                label="Memo"
                                fullWidth
                            />
                        </Form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={onCancel} color="secondary">
                            CANCEL
                        </Button>
                        <Button onClick={submitForm} color="primary">
                            SAVE
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
        />
    );
};
