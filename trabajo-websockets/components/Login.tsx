import {useForm} from "react-hook-form";
import {useContext} from "react";
import {ContenedorContext, IJugador} from "@/components/ContenedorContext";
export default function Login(props: { setEsLogin: any, unirseSala:any }) {
    const {setJugador} = useContext(ContenedorContext)
    const {unirseSala} = props

    const {handleSubmit, register, formState: {errors, isValid}} = useForm<IJugador>(
        {
            defaultValues: {
                idSala: 1,
                nombre: "",
            },
            mode: "all"
        }
    )

    const controladorSubmit = (datos: IJugador) => {
        props.setEsLogin(false);
        const datosJugador: IJugador = {
            idSala: datos.idSala,
            nombre: datos.nombre,
        }
        setJugador(datosJugador);

        unirseSala(datosJugador);
    }

    return (
        <>
            <div className={"container"}>
                <form className={"m-4 border  p-3"} onSubmit={handleSubmit(controladorSubmit)}>
                    <div className={"mb-3"}>
                        <label htmlFor="salaId">Sala ID</label>
                        <input
                            className={"form-control"}
                            placeholder={"Ingresa tu sala ID"}
                            type="text"
                            id={"salaId"}
                            {...register('idSala', {required: 'Campo requerido'})}
                        />
                    </div>
                    <div className={"mb-3"}>
                        <label htmlFor="nombre">Nombre de usuario</label>
                        <input
                            className={"form-control"}
                            placeholder={"Ingresa tu nombre de usuario"}
                            type="text"
                            id={"nombre"}
                            {...register("nombre", {
                                required: "Campo requerido",
                            })}
                        />
                    </div>
                    <div className={"d-flex justify-content-center gap-4"}>
                        <button type="submit" className={"btn btn-primary"}>Unirse o crear sala</button>
                        <button type="reset" className={"btn btn-warning"}>Borrar</button>
                    </div>
                </form>
            </div>
        </>
    )
}