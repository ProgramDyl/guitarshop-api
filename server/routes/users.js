import express from 'express';
import { PrismaClient } from '@prisma/client';
import { hashPassword, comparePassword } from '../lib/utility.js';
import session from 'express-session';

const usersRouter = express.Router();

const prisma = new PrismaClient();

//sign up -- POST
usersRouter.post('/signup', async (req, res) => {
    
    //get user inputs
    const { email, password, first_name, last_name } = req.body;

    //validate inputs
    if (!email || !password || !first_name || !last_name) {
        return res.status(400).send('Missing: Required Field(s).');
    }

    //check for existing user
    const existingCustomer = await prisma.customer.findUnique({
        where: {
            email: email,
        }
    });
    if (existingCustomer) {
        return res.status(400).send('User already exists');
    };

    //hash pw
    const hashedPassword = await hashPassword(password);

    //add user to db
    const customer = await prisma.customer.create({
        data: {
            customer_id: customer_id,
            first_name: first_name,
            last_name: last_name,
            email: email,
            password: hashedPassword
        }
    });

    //send response
    res.json({'customer' : email});
});

//log-in -- POST
usersRouter.post('/login', async (req, res) => {

    //get user inputs
    const { email, password } = req.body;
    //validate inputs
    if (!email || !password) {
        return res.status(400).send('Missing required fields.');
    };
    //find user in db
    const existingCustomer = await prisma.customer.findUnique({
        where: {
            email: email,
        }
    });
    if (!existingCustomer) {
        return res.status(404).send('User not found');
    }

    //compare/verify password entered to stored pw
    const passwordMatch = await comparePassword(password, existingCustomer.password);
    if (!passwordMatch) {
        return res.status(401).send('Invalid password');
    }
    
    //setup user session data
    req.session.email = existingCustomer.email;
    req.session.customer_id = existingCustomer.customer_id;
    req.session.first_name = existingCustomer.first_name;
    req.session.last_name = existingCustomer.last_name;
    console.log('logged in customer: ', + req.session.customer_id + '\n' + req.session.email);

    //send response
    res.send('login successful');
});

//logout
usersRouter.get('/logout', (req, res) => {
    req.session.destroy();
    res.send('Logout successful.');
});

//get user session
usersRouter.get('/session', (req, res) => {

    try{
    res.json({ 'id: ' : req.session.customer_id , 'email: ' : req.session.email , 'Name ' : req.session.first_name + ' ' + req.session.last_name });
    } catch {
        return res.status(401).send('User not logged in.');
    }

});

export default usersRouter;

