import express from 'express';
import { Signup,VerifyOtp,ForgotPassword,Login,ResetPassword, NewsletterForm, NotifiedUsers, ContactForm, VerifyPassword, UpdateAccountDetails, AccountDetailsOTP } from '../Controllers/authController.js';
import { GetTotalCountUsersOrders } from '../Controllers/adminController.js';

const router = express.Router();

router.post('/signup', Signup);
router.post('/verify-otp', VerifyOtp);
router.post('/login', Login);
router.post('/forgot-password', ForgotPassword);
router.post('/reset-password',ResetPassword);
router.post('/newsletter-form',NewsletterForm);
router.post('/notify-country',NotifiedUsers);
router.post('/contact',ContactForm);
router.post('/api/check-current-password',VerifyPassword)
router.post('/update-account-details',UpdateAccountDetails);
router.post('/change-details-otp',AccountDetailsOTP)
router.post('/verify-password',VerifyPassword);
router.get('/users/:uid',GetTotalCountUsersOrders)

export default router;
