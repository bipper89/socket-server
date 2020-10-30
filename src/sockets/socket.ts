import {Socket} from "socket.io";
import socketIO from "socket.io";

export const disconnect = (cliente: Socket) => {
    cliente.on('disconnect', () => console.log('Cliente desconectado'));
}

export const message = (cliente: Socket, io: socketIO.Server) => {
    cliente.on('message', (payload: {from: string, msj: string}) => {
        console.log('mensaje recibido: ', payload);
        io.emit('new-message', payload);
    });
}

