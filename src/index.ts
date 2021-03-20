import express from 'express';
import dotenv from 'dotenv';
import {Request, Response} from 'express';
import mongoose from 'mongoose';
import  { Logger } from '../logger/logger';
import { JwtAuthService } from '../auth/jwtAuth.service';

dotenv.config();
const mongoConnString = process.env.DB_CONNECTION_STRING;

const app: express.Application = express();
app.use(express.json());

const port = process.env.port || 3000

const jwtAuthService = new JwtAuthService(process.env, Logger);

app.get('/' , (req, res) => {
    res.send('Hello World')
});
app.get('/menuCategory', (req, res) => {
    const result = (async() => await db.collection('menuCategories').find({name: 'test1'}))();
    result.then((data) => {
        console.log(data);
        res.send(data.toArray());
    });
    result.catch((err) => {
        console.log(err)
        res.sendStatus(500).send(err.message);
    })
})
app.post('/menuCategory', (req, res) => {
    const {categoryId, name}  = req.body;
    const result = (async() => await db.collection('menuCategories').insert({categoryId, name}))();
    result.then((data) => {
        console.log(data);
        res.send(data.ops);
    });
    result.catch((err) => {
        console.log(err)
        res.sendStatus(500).send(err.message);
    })
})

function validate(req: Request, res: Response, next: () => void): void{
    const { accessToken } = req.body;
    const isValidUser = jwtAuthService.verifyToken(accessToken);
    if(isValidUser)
        next();
    else
        res.status(403).send('Unauthorized access');
}

app.get('/greet' , validate, (req: Request, res: Response) => {
    const name = req.query.name
    res.send(`Hello greetings for ${name}`)
});
// app.get('/menuCategory' , (req: Request, res: Response) => {
//     const name = req.query.name
//     res.send(`Hello ${name}`)
// })
app.post('/login' , (req, res) => {
    const { email, password } = req.body;
    if (email === password) {
        const payload = Object.freeze({
            name: email,
            iat: Date.now()
        });
        const accessToken = jwtAuthService.getToken(payload);
        res.send({accessToken});
    } else {
        res.sendStatus(401);
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})
mongoose.connect(mongoConnString, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('DB connected');
});