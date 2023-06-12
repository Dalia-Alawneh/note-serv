import {Router} from 'express' 
import * as noteController from './controller/note.controller.js'
import asyncHandler from '../../Services/asyncHandler.js'
import { auth } from '../middleware/auth.middleware.js'
const router = Router()

router.get('/',auth,asyncHandler(noteController.getNotes))
router.post('/add',auth,asyncHandler(noteController.addNote))
export default router