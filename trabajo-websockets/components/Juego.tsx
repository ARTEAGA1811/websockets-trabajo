import st from '../styles/juego.module.css';
import {useContext, useEffect, useState} from "react";
import {ContenedorContext} from "@/components/ContenedorContext";
import {listaCartasNombre, listaCartasImagen} from "@/data/datosCartas";
import Carta, {ICartaImg, ICartaNombre} from "@/components/Carta";

export default function (props: { socket: any }) {
    const {jugador, setJugador} = useContext(ContenedorContext)
    const [listaCartas, setListaCartas] = useState([] as (ICartaNombre | ICartaImg)[]);

    const [seleccionadas, setSeleccionadas] = useState([] as number[]);
    const [resueltas, setResueltas] = useState([] as number[]);
    const generarCartasAleatorias = () => {
        //Crea un array juntando las dos listas, pero en orden aleatorio
        //const listaCartas = [...listaCartasNombre, ...listaCartasImagen].sort(() => Math.random() - 0.5);
        const listaCartas = [...listaCartasNombre, ...listaCartasImagen]
        console.log(listaCartas);
        return listaCartas;
    }
    useEffect(() => {
        setListaCartas(generarCartasAleatorias());

        props.socket.on('escucharEventoRegistrarCarta', (mensajeResultado: { idSala: number, listaCartas: number[] }) => {
            console.log("resultado del escucharEventoResueltas : ", mensajeResultado)
            setResueltas(mensajeResultado.listaCartas);
        });
    }, [])

    const esNombre = (carta: ICartaNombre | ICartaImg) => {
        return Object.keys(carta).includes('nombre');
    }

    const agregarSeleccionada = (id: number) => {
        console.log("agregarSeleccionada", id);
        console.log("seleccionadas", seleccionadas);

        setSeleccionadas([...seleccionadas, id]);
    }
    const validarCartasSeleccionadas = () => {
        console.log(seleccionadas);
        if (seleccionadas.length == 2) {
            const [id1, id2] = seleccionadas;
            if (id1 === id2) {
                registrarCarta([...resueltas, id1]);
                setResueltas([...resueltas, id1]);
            }
            setSeleccionadas([]);
        }
    }

    useEffect(() => {
        validarCartasSeleccionadas();
    }, [seleccionadas]);

    const esCartaResuelta = (id: number) => {
        return resueltas.includes(id);
    }

    const registrarCarta = (miListaResueltasW: number[]) => {
        props.socket.emit('registrarCarta', {
            idSala: jugador.idSala,
            listaCartas: miListaResueltasW
        }, (mensajeResultado: string) => {
            console.log(mensajeResultado)
        });
    }
    return (
        <div className={st.contenedor_juego}>
            {listaCartas.map(
                (carta, index) => {
                    return (
                        <Carta carta={carta} esNombre={esNombre(carta)} agregarSeleccionada={agregarSeleccionada}
                               esResuelta={esCartaResuelta(carta.id)}
                               key={index} socket={props.socket}/>
                    )
                })
            }

        </div>
    );
}