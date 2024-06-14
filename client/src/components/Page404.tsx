import { useNavigate } from "react-router-dom"
import PageNotFound from "../assets/img/404.png"

function Page404() {

    const navigate = useNavigate()
    return (
        <div className="d-flex gap-4 justify-content-center align-items-center flex-column show-top w-100 h-100">
            <img className="h-50 spaceship" src={PageNotFound} alt="404 page not found" />
            <button className="button-50" onClick={() => { navigate("/") }}>Take me Home</button>
        </div>
    )
}

export default Page404