import express from 'express';
import indexRoutes from './routes/indexRoutes';
import cors from 'cors';
import socketIO from 'socket.io';
import http from 'http';
import * as socket from './sockets/socket';

class Server {
    app: express.Application;
    io: socketIO.Server;
    private  httpServer: http.Server;
    private static _instance: Server;

    private constructor() {
        this.app = express();
        this.config();
        this.routes();
        this.httpServer = new http.Server(this.app);
        this.io = socketIO(this.httpServer);
        this.listenSockets();
    }

    public static get instance() {
        return this._instance || (this._instance = new this());
    }

    private listenSockets() {
        console.log('Escuchando conexiones - sockets');
        this.io.on('connection', cliente => {
            console.log('cliente conectado');
            socket.disconnect(cliente);
            socket.message(cliente, this.io);
        });
    }

    config() {
        this.app.set('port', process.env.PORT || 5000);
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}));
        this.app.use(cors({origin: true, credentials: true}))
    }

    routes() {
        this.app.use('/api', indexRoutes);
    }


    start() {
        this.httpServer.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        });
    }
}

const server = Server.instance;
server.start();
