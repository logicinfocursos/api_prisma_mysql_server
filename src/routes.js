import { Router } from "express"

import UserController from "./controllers/UserController"
import PostController from "./controllers/PostController"



const router = Router()

router.post('/user', UserController.create)
router.get('/users', UserController.findAll)
router.get('/user/:id', UserController.find)
router.put('/user/:id', UserController.update)
router.delete('/user/:id', UserController.delete)

router.post('/post/user/:id', PostController.create)
router.get('/posts', PostController.findAll)
router.get('/post/:id', PostController.find)
router.put('/post/:id', PostController.update)
router.delete('/post/:id', PostController.delete)

export { router }