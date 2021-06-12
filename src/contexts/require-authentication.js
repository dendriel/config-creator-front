import Login from "../pages/login";
import {useAuth} from "./authentication-provider";


export default function RequireAuthentication({children}) {
    const {isAuthenticated} = useAuth();

    console.log("auth: " + isAuthenticated)
    if (!isAuthenticated && window.location.pathname !== '/login') {
        console.log("Unauthenticated");
        return <Login/>;
    }

    return children;
}
