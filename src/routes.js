import {Route, Switch} from "react-router-dom";
import Login from "./pages/login";
import Home from "./pages/home";
import NotFound from "./pages/notfound";
import Directory from "./pages/directory";
import Template from "./pages/template";
import TemplateCreate from "./pages/template-create";
import Project from "./pages/project";
import ProjectCreate from "./pages/project-create";
import Resource from "./pages/resource";
import ResourceCreate from "./pages/resource-create";
import CollectionEditor from "./pages/collection-editor";


export default function Routes() {
    return (
        <Switch>
            <Route exact path="/">
                <Home />
            </Route>
            <Route path="/home">
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

            <Route path="/project/create">
                <ProjectCreate />
            </Route>
            <Route path="/project/edit/:id">
                <ProjectCreate />
            </Route>
            <Route path="/project">
                <Project />
            </Route>


            <Route path="/resource/edit/:projectId/:id">
                <ResourceCreate />
            </Route>
            <Route path="/resource/create/:projectId">
                <ResourceCreate />
            </Route>
            <Route path="/resource">
                <Resource />
            </Route>

            <Route path="/collection/edit/:id">
                <CollectionEditor />
            </Route>

            <Route path="*">
                <NotFound />
            </Route>
        </Switch>
    );
}
