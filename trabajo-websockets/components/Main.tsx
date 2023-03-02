import Header from "@/components/Header";
import {useEffect, useState} from "react";
import Login from "@/components/Login";
import Juego from "@/components/Juego";
import {ContenedorContext, IContenedorContext, IJugador} from "@/components/ContenedorContext";
import {io} from "socket.io-client";


const servidorWebSockets = "http://localhost:11202";
const socket = io(servidorWebSockets);


export default function Main() {
    const [esLogin, setEsLogin] = useState(true);
    const [jugador, setJugador] = useState<IJugador>({} as IJugador);
    const [isConnected, setIsConnected] = useState(false);

    const objetoContenedorContext: IContenedorContext = {jugador, setJugador};

    useEffect(() => {
            socket.on('connect', () => {
                setIsConnected(true);
                console.log('Conectado al servidor de WebSockets');
            });
            socket.on('disconnect', () => {
                setIsConnected(false);
                console.log('Desconectado del servidor de WebSockets');
            });

            socket.on('escucharEventoUnirseSala', (mensajeResultado: string) => {
                console.log(mensajeResultado)
            });


        }, []
    )


    const unirseSala = (datosJugador: IJugador) => {
        console.log('metodo unirseSala', datosJugador);
        socket.emit('unirseSala', datosJugador, (mensajeResultado: string) => {
            console.log(mensajeResultado)
        });
    }


    return (
        <div>
            <ContenedorContext.Provider value={objetoContenedorContext}>
                <Header/>
                {esLogin && <Login setEsLogin={setEsLogin} unirseSala={unirseSala}/>}
                {!esLogin &&
                    <Juego  socket={socket}/>
                }
            </ContenedorContext.Provider>
        </div>
    )
}