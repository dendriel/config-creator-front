import {Route, Switch} from "react-router-dom";
import Login from "../pages/login";
import Dashboard from "../pages/dashboard";
import NotFound from "../pages/notfound";


export default function Routes() {
    return (
        <Switch>
            <Route exact path="/">
                <Dashboard />
            </Route>
            <Route path="/login">
                <Login />
            </Route>

            <Route path="*">
                <NotFound />
            </Route>
        </Switch>
    );
}
