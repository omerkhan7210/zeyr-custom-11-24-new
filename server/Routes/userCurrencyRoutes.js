
import express from 'express';
import {CurrencyCode,selectCurrencyCode } from '../Controllers/currencyController.js';

const router = express.Router();

router.post('/user-currency-preferences',CurrencyCode)
router.get('/user-currency-preferences/:userUUID', selectCurrencyCode)

export default router;