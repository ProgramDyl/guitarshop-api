import express from 'express';
import cors from 'cors'; //allow client app to connect to server app 
import usersRouter from './routes/users.js';
import homeRouter from './routes/home.js';
import guitarsRouter from './routes/guitars.js';
import purchaseRouter from './routes/purchase.js';
import session from 'express-session';
import dotenv from 'dotenv';
import PasswordValidator from 'password-validator';

dotenv.config();
const port = process.env.PORT || 3000;
const app = express();



//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// cors middleware
app.use(cors({
    origin: 'http://localhost:5173', // react client
    credentials: true // allow cookies
  }));

// express-session middleware
app.use(session({
    secret: 'fkldjbnfdkFTFT5efd3$$sdg89F',
    resave: false,
    saveUninitialized: true,
    cookie: { 
      httpOnly: true,
      secure: false,  // Set to `true` if using HTTPS in production
      sameSite: 'lax',  // Consider 'none' if client and server are on different origins
      maxAge: 3600000 // 1 hour in milliseconds
    }
  }));


//routes
app.use('/api/', homeRouter);
app.use('/api/users', usersRouter);
app.use('/api/guitars', guitarsRouter);
app.use('/api/purchase', purchaseRouter);


//error handling
app.use((err, req, res, next) => {
  console.error('Unhandled error: ', err);
  res.status(500).send('Internal server error');
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});


