import Login from "../pages/login";
import {useAuth} from "./authentication-provider";
import restService from "../services/rest.service";
import {useHistory} from "react-router";


export default function RequireAuthentication({children}) {
    const {isAuthenticated} = useAuth();

    restService.redirect = useHistory()

    if (!isAuthenticated()) {
        console.log("Unauthenticated");
        return <Login/>;
    }

    return children;
}
