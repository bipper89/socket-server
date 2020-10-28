import express from 'express';
import indexRoutes from './routes/indexRoutes';
import cors from 'cors';

class Server {
    app: express.Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    config() {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}));
        this.app.use(cors({origin: true, credentials: true}))
    }

    routes() {
        this.app.use('/api', indexRoutes);
    }


    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        });
    }
}

const server = new Server();
server.start();
