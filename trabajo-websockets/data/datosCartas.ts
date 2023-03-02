//Cartas de nombres

import {ICartaImg, ICartaNombre} from "@/components/Carta";
import pikachuImg from "@/assets/pikachu.png";
import charmanderImg from "@/assets/charmander.png";
import bulbasaurImg from "@/assets/bulbasaur.png";
import squirtleImg from "@/assets/squirtle.png";

const listaCartasNombre: ICartaNombre[] = [
    {
        id: 1,
        nombre: 'Pikachu',
    },
    {
        id: 2,
        nombre: 'Charmander',
    },
    {
        id: 3,
        nombre: 'Bulbasaur',
    },
    {
        id: 4,
        nombre: 'Squirtle',
    },
    // {
    //     id: 5,
    //     nombre: 'Caterpie',
    // },
    // {
    //     id: 6,
    //     nombre: 'Weedle',
    // },
    // {
    //     id: 7,
    //     nombre: 'Pidgey',
    // },
    // {
    //     id: 8,
    //     nombre: 'Rattata',
    // },
]

const listaCartasImagen: ICartaImg[] = [
    {
        id: 1,
        img: pikachuImg.src,
    },
    {
        id: 2,
        img: charmanderImg.src,
    },
    {
        id: 3,
        img: bulbasaurImg.src,
    },
    {
        id: 4,
        img: squirtleImg.src,
    }
]

export {
    listaCartasNombre,
    listaCartasImagen
}
