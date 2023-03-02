import {ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway} from "@nestjs/websockets";
import {Server, Socket} from "socket.io";

export interface IJugador {
    idSala: number;
    nombre: string;
}

@WebSocketGateway(
    11202, //Puerto donde está escuchando el servidor de websockets.
    {
        cors: {
            origin: '*', //Habilita la conexión desde cualquier origen (IP).
        }
    }
)
export class EventosGateway {
    @SubscribeMessage('unirseSala') //Nombre del metodo para recibir eventos.
    devolverUnirseSala(
        @MessageBody() dataJugador: IJugador,
        @ConnectedSocket() socket: Socket
    ) {
        console.log('Mensaje recibido', dataJugador);
        socket.join(dataJugador.idSala.toString());

        socket.broadcast.to(dataJugador.idSala.toString()).emit(
            'escucharEventoUnirseSala',
            {
                mensaje: 'Se unió un jugador a la sala'
            }
        );

        return {mensaje: 'ok'} //Callback
    }

    @SubscribeMessage('moverCarta')
    devolverMoverCarta(
        @MessageBody() miMensaje: { idSala: number, idCarta: number, nombre: string, esNombre: boolean },
        @ConnectedSocket() socket: Socket
    ) {
        console.log('Mensaje recibido de carta', miMensaje);
        socket.join(miMensaje.idSala.toString());

        socket.broadcast.to(miMensaje.idSala.toString()).emit(
            'escucharEventoMoverCarta',
            {
                idSala: miMensaje.idSala,
                idCarta: miMensaje.idCarta,
                nombre: miMensaje.nombre,
                esNombre: miMensaje.esNombre
            }
        );

        return {mensaje: 'ok'} //Callback
    }

    @SubscribeMessage('registrarCarta')
    devolverRegistrarCarta(
        @MessageBody() miMensaje: { idSala: number, listaCartas: number[] },
        @ConnectedSocket() socket: Socket
    ) {
        console.log('Mensaje recibido de carta', miMensaje);
        socket.join(miMensaje.idSala.toString());

        socket.broadcast.to(miMensaje.idSala.toString()).emit(
            'escucharEventoRegistrarCarta',
            {
                idSala: miMensaje.idSala,
                listaCartas: miMensaje.listaCartas
            }
        );

        return {mensaje: 'ok'} //Callback
    }
}