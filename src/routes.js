import {Route, Switch} from "react-router-dom";
import Login from "./pages/login";
import Home from "./pages/home";
import NotFound from "./pages/notfound";
import Directory from "./pages/directory";
import Template from "./pages/template";
import TemplateCreate from "./pages/template-create";


export default function Routes() {
    return (
        <Switch>
            <Route exact path="/">
                <Home />
            </Route>
            <Route path="/login">
                <Login />
            </Route>
            <Route path="/directory">
                <Directory />
            </Route>

            <Route path="/template/create">
                <TemplateCreate />
            </Route>
            <Route path="/template">
                <Template />
            </Route>
            <Route path="*">
                <NotFound />
            </Route>
        </Switch>
    );
}
