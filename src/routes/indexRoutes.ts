import {Router, Request, Response} from "express";


export class IndexRoutes {
    router: Router;
    constructor() {
        this.router = Router();
        this.routes();
    }



    routes() {
        this.router.get('/', (req:Request, res: Response) => res.send('Hello World'));
        this.router.post('/', (req: Request, res: Response) => {
            const data = req.body.test;
            console.log(data);
            res.json({
                data
            });
        })
    }
}

const indexRoutes = new IndexRoutes();
indexRoutes.routes();

export default indexRoutes.router;
