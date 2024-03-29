import express from 'express';
import { CreateAddress,DeleteAddress,EditAddress,RetrieveAddress,addressSetDefault,UserAccountDetails, GetMembershipDetails } from '../Controllers/userController.js';

const router = express.Router();


router.get('/account-details',UserAccountDetails);
router.post('/address',CreateAddress);
router.delete('/address/:id',DeleteAddress);
router.put('/address/:id',EditAddress);
router.get('/retrieve-address',RetrieveAddress);
router.put('/address/:id/set-default',addressSetDefault);
router.get('/api/user-memberships', GetMembershipDetails);


export default router;