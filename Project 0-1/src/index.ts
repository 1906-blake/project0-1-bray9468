//npm install @types/jest jest ts-jest ts-node typescript
import express from 'express';
import bodyParser from 'body-parser';
import { usersRouter } from './routers/users.router'
import { reimbursementsRouter } from './routers/reimbursements.router';
import { authRouter } from './routers/auth.router';

// specify the port will run on
const port = 8012;
const app = express();

/**
 * Loggin middleware
 * This callback will be invoked anytime a request is made 
 * regardless of url or http method
 *  */ 
app.use((req, res, next) => {
    console.log(`request made with url: ${req.url} and method ${req.method}`)
    next(); // pass request on to search for the next piece of middleware
});

// set up body parser to convert json body to object stored on req.body
app.use(bodyParser.json());




/*******************************************
 * Register Routers
 ******************************************/
app.use('/users', usersRouter);
app.use('/reimbursements', reimbursementsRouter);
app.use(authRouter);




app.listen(port, () => {
    console.log('app started on port: ' + port)
});