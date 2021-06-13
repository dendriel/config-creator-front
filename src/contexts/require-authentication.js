import Login from "../pages/login";
import {useAuth} from "./authentication-provider";
import restService from "../services/api";
import {useHistory} from "react-router";


export default function RequireAuthentication({children}) {
    const {isAuthenticated} = useAuth();

    restService.redirect = useHistory()

    console.log("auth: " + isAuthenticated)

    if (!isAuthenticated) {
        console.log("Unauthenticated");
        return <Login/>;
    }

    return children;
}
