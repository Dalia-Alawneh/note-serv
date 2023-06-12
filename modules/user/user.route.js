import {Router} from 'express'
import * as userController from './controller/user.controller.js'
import { auth } from '../middleware/auth.middleware.js'
import asyncHandler from '../../Services/asyncHandler.js'
const router = Router()

router.get('/profile', auth,asyncHandler(userController.getUser))
router.delete('/delete', auth,asyncHandler(userController.deleteUser))
router.patch('/change_password', auth,asyncHandler(userController.changePassword))
router.put('/update', auth,asyncHandler(userController.updateUser))

export default router