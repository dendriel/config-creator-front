import {Route, Switch} from "react-router-dom";
import Login from "./pages/login";
import Home from "./pages/home";
import NotFound from "./pages/notfound";
import Directory from "./pages/directory";
import Template from "./pages/template";
import TemplateCreate from "./pages/template-create";
import ResourceCreate from "./components/template/ResourceCreate";
import Configuration from "./pages/configuration";
import Project from "./pages/project";
import ProjectCreate from "./pages/project-create";


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
            <Route path="/template/edit/:id">
                <TemplateCreate />
            </Route>
            <Route path="/template">
                <Template />
            </Route>

            <Route path="/configuration/create">
                {/*<Configuration*/}
            </Route>
            <Route path="/configuration">
                <Configuration />
            </Route>

            <Route path="/project/create">
                <ProjectCreate />
            </Route>
            <Route path="/project/edit/:id">
                <ProjectCreate />
            </Route>
            <Route path="/project">
                <Project />
            </Route>

            <Route path="/resource/create">
                <ResourceCreate />
            </Route>
            <Route path="*">
                <NotFound />
            </Route>
        </Switch>
    );
}
