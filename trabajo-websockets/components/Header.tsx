import logoPokemon from "../assets/pngegg.png";
export default function Header() {
    return (
        <header className={"bg-primary text-center p-2"}>
            <img src={logoPokemon.src} alt={"logo"} className={"img-fluid "} style={{maxHeight: "4rem"}}/>
        </header>
    )
}