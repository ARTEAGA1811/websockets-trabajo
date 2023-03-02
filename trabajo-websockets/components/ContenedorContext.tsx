import {createContext, Dispatch, SetStateAction} from "react";

export interface IJugador {
    idSala: number;
    nombre: string;
}

export interface IContenedorContext {
    jugador: IJugador;
    setJugador:  Dispatch<SetStateAction<IJugador>>
}

export const ContenedorContext = createContext<IContenedorContext>({} as IContenedorContext);