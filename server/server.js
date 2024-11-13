import express from 'express';
import cors from 'cors'; //allow client app to connect to server app 
import usersRouter from './routes/users.js'


const port = process.env.PORT || 3000;
const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cors());

//routes
app.use('/api/users', usersRouter);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});


