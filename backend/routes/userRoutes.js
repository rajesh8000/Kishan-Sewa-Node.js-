import express from 'express'
const router = express.Router()

import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  sendpasswordlink,
  verifyUser,
  changePassword,
  //emailSend,
  // changePassword,
} from '../controllers/userController.js'
import { protect, admin } from '../middleware/authMiddleware.js'
//import { sendToken } from '../utils/generateToken.js'

router.route('/').post(registerUser).get(protect, admin, getUsers)
router.post('/login', authUser)
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)
router
  .route('/:id')
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser)




router.route('/:id/:token').post(changePassword)

router.route('/sendpasswordlink').post(sendpasswordlink)
router.route('/forgot/:id/:token').get(verifyUser)


export default router
