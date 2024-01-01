import User from '../models/User.js';
import bcrypt from "bcrypt"
import chalk from 'chalk';

import jwt from "jsonwebtoken"
import { JWT_SECRET } from '../config/config.js';

export const getUsers = async (req, res) => {
    try{
        const users = await User.find()

        if(users){
            res.status(200).send(users)
        }

    }catch(e){
        console.log(`valid to get users , error : ${chalk.red.bold(e)}`)
    }
}

export const getUsersID = async (req, res) => {
    const {username} = req.params
    try{
        const users = await User.find({username })

        if(users){
            res.status(200).send(users)
        }

    }catch(e){
        console.log(`valid to get users , error : ${chalk.red.bold(e)}`)
    }
}

export const registerUser = async (req, res) => {
    try {
        const { password, username, email } = req.body;

        const isUserExists = await User.findOne({
            $or: [
                { email: email.toLowerCase() },
                { username: username.toLowerCase() }
            ]
        });

        if (isUserExists) {
            return res.status(400).send("email or username already exists");
        }

        const userInfo = new User({
            username: username,
            password: password,
            email: email
        });

        await userInfo.save();

        userInfo.password = undefined;

        return res.status(201).send(userInfo);
    } catch (err) {
        console.log("error at registerUser", err.message);
        res.send("something went wrong" + err.message);
    }


};

export const LoginUser = async (req, res) => {
    
    try {
        const { email, password } = req.body;

      const isUserExists = await User.findOne({email : email.toLowerCase()}).select('+password')

  console.error('users login success', );

  if (!isUserExists) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
  
    //   password check
    const passwordCorrect = await isUserExists.comparePassword(password);
    
    if(!passwordCorrect){
        return res.status(404).json({ message: "inCorrect Password"})
    }

    // token
    const expiresIn = 7 * 24 * 60 * 60

    const token = jwt.sign({_id : isUserExists._id}, JWT_SECRET, {
        expiresIn
    })
    
    res.cookie('token', token, {
        httpOnly: true,
        secure : false,
        maxAge : expiresIn * 1000
    })
    isUserExists.password = undefined;

    return res.status(200).json({ ...isUserExists.toJSON(), expiresIn });

} catch (error) {
      console.error('Error occurred during login:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
    
}



