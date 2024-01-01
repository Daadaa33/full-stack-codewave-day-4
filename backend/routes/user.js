import express from 'express';
import { LoginUser,  getUsers, registerUser , getUsersID} from '../controller/userController.js';


const userRouter = express.Router();



userRouter.post('/register', registerUser);
userRouter.post('/login', LoginUser);
userRouter.get('/', getUsers);
userRouter.get('/:username', getUsersID);


export default userRouter;