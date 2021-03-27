
// import  { Logger } from '../logger/logger';
// import { JwtAuthService } from '../auth/jwtAuth.service';// const jwtAuthService = new JwtAuthService(config, Logger);

// app.get('/', (req, res) => {
//     res.send('Hello World')
// });

// app.get('/menuCategory', (req, res) => {
//     const result = (async() => await db.collection('menuCategories').find({name: 'test1'}))();
//     result.then((data) => {
//         console.log(data);
//         res.send(data.toArray());
//     });
//     result.catch((err) => {
//         console.log(err)
//         res.sendStatus(500).send(err.message);
//     })
// })
// app.post('/menuCategory', (req, res) => {
//     const {categoryId, name}  = req.body;
//     const result = (async() => await db.collection('menuCategories').insert({categoryId, name}))();
//     result.then((data) => {
//         console.log(data);
//         res.send(data.ops);
//     });
//     result.catch((err) => {
//         console.log(err)
//         res.sendStatus(500).send(err.message);
//     })
// })

// function validate(req: Request, res: Response, next: () => void): void{
//     const { accessToken } = req.body;
//     const isValidUser = jwtAuthService.verifyToken(accessToken);
//     if(isValidUser)
//         next();
//     else
//         res.status(403).send('Unauthorized access');
// }

// app.get('/greet' , validate, (req: Request, res: Response) => {
//     const name = req.query.name
//     res.send(`Hello greetings for ${name}`)
// });

// app.post('/login' , (req, res) => {
//     const { email, password } = req.body;
//     if (email === password) {
//         const payload = Object.freeze({
//             name: email,
//             iat: Date.now()
//         });
//         const accessToken = jwtAuthService.getToken(payload);
//         res.send({accessToken});
//     } else {
//         res.sendStatus(401);
//     }
// });

import express, { Router } from 'express';
import dotenv from 'dotenv';
import { RouteHandler } from './routes';
import { makeExpressCallback, registerRoutes } from './express-callback';
import { loginController } from './controllers/login.controller';
import { Config } from '../config/index';
import { DbFactory } from '../db/factory';

dotenv.config();

class Server{

    private app: express.Application;
    private config: Config;
    private dbFactory: DbFactory;

    constructor() {
        this.app = express();
        this.app.use(express.json());
    }
    getApp = (): express.Application => {
        return this.app;
    }
    private init = () => {
        console.log('Hello');
        this.config = new Config(process.env);
        this.dbFactory = new DbFactory(this.config);
        this.dbFactory.init();
        const routeHandler = new RouteHandler(Router(), this.config);

        routeHandler.addRoute(loginController.getRoute(), registerRoutes(loginController));
    };

    start = () => {
        this.init();
        const port = this.config.getValue('port') || 3000;
        this.app.listen(port, () => {
            console.log(`Server listening on port ${port}`);
            const routeHandler = new RouteHandler(Router(), this.config);
            this.app.get('/', (req, res) => {
                console.log('normal api');
            })
        })
    }
}
export const server =  new Server();
