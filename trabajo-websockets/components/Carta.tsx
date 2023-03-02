import {useContext, useEffect, useState} from "react";
import st from "../styles/juego.module.css"
import {ContenedorContext} from "@/components/ContenedorContext";

export interface ICartaNombre {
    id: number;
    nombre: string;

}

export interface ICartaImg {
    id: number;
    img: string;
}

export default function Carta(props: { carta: ICartaNombre | ICartaImg, esNombre: boolean, agregarSeleccionada: any, esResuelta: boolean, socket: any }) {
    const [oculto, setOculto] = useState(true);
    const {jugador} = useContext(ContenedorContext)
    const mostrarCarta = (miId: number, miEsNombre: boolean) => {
        if (miId === props.carta.id && miEsNombre === props.esNombre) {
            setOculto(false);
            //Después de 3 segundos, ocultar la carta
            setTimeout(() => {
                setOculto(true);
            }, 1500);
            props.agregarSeleccionada(miId);
        }
    }

    useEffect(() => {
        props.socket.on('escucharEventoMoverCarta', (mensajeResultado: { idSala: number, idCarta: number, nombre: string, esNombre: boolean }) => {
            console.log("mensaje resultado: ", mensajeResultado)
            mostrarCarta(mensajeResultado.idCarta, mensajeResultado.esNombre)
        });
    }, [])

    const moverCarta = () => {
        console.log('metodo moverCarta', props.carta.id);
        props.socket.emit('moverCarta', {
            ...jugador,
            idCarta: props.carta.id,
            esNombre: props.esNombre
        }, (mensajeResultado: string) => {
            console.log(mensajeResultado)
            mostrarCarta(props.carta.id, props.esNombre)
        });
    }

    if (props.esNombre) {
        const aux = props.carta as ICartaNombre;
        if (props.esResuelta) {
            return (
                <div className={st.padreContainer + " text-bg-success"}>
                    {aux.nombre}

                </div>

            )
        } else {

            return (
                oculto ?
                    <div className={st.padreContainer + " text-bg-warning"} onClick={moverCarta}>
                        ???
                    </div>
                    :
                    <div className={st.padreContainer + " text-bg-info"}>
                        {aux.nombre}
                    </div>

            );
        }
    } else {
        const aux = props.carta as ICartaImg;
        if (props.esResuelta) {
            return (
                <div className={st.padreContainer + " text-bg-success"}>
                    <div className={st.personaje_contenedor}>
                        <img src={aux.img} className={st.imagen}/>
                    </div>
                </div>
            )
        } else {
            return (
                oculto ?
                    <div className={st.padreContainer + " text-bg-warning"} onClick={moverCarta}>
                        ???
                    </div>
                    :
                    <div className={st.padreContainer + " text-bg-info"}>
                        <div className={st.personaje_contenedor}>
                            <img src={aux.img} className={st.imagen}/>
                        </div>
                    </div>
            );
        }
    }
    ;

}