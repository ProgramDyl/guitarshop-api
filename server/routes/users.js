import express from 'express';
import { PrismaClient } from '@prisma/client';
import { hashPassword, comparePassword } from '../lib/utility.js';

const router = express.Router();

const prisma = new PrismaClient();

//sign up -- POST
router.post('/signup', async (req, res) => {
    
    //get user inputs
    const { email, password, first_name, last_name } = req.body;

    //validate inputs
    if (!email || !password || !first_name || !last_name) {
        return res.status(400).send('Missing: Required Field(s).');
    }

    //check for existing user
    const existingUser = await prisma.customer.findUnique({
        where: {
            email: email,
        }
    });
    if (existingUser) {
        return res.status(400).send('User already exists');
    };

    //hash pw
    const hashedPassword = await hashPassword(password);

    //add user to db
    const customer = await prisma.customer.create({
        data: {
            first_name: first_name,
            last_name: last_name,
            email: email,
            password: hashedPassword
        }
    });

    //send response
    res.json({'customer' : email});
});

//login
router.get('/login', (req, res) => {
    res.send('Login');
});

//logout
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.send('Logout successful.');
});

//get user session
router.get('/getSession', (req, res) => {
    res.send('session');
});



export default router;

