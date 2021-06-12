// Core Components

import styles from './navbar.module.css'
// import {Dropdown} from "bootstrap";


export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
            <a className={`navbar-brand ${styles.title}`} href="/">Config Creator</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault"
                    aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" />
            </button>

            {/*<Dropdown>*/}
            {/*    <Dropdown.Toggle variant="success" id="dropdown-basic">*/}
            {/*        Dropdown Button*/}
            {/*    </Dropdown.Toggle>*/}

            {/*    <Dropdown.Menu>*/}
            {/*        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>*/}
            {/*        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>*/}
            {/*        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>*/}
            {/*    </Dropdown.Menu>*/}
            {/*</Dropdown>*/}

            <div className="collapse navbar-collapse">
                <ul className="navbar-nav mr-auto">
                    {/*// <!--            <li class="nav-item active">-->*/}
                    {/*// <!--                <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>-->*/}
                    {/*// <!--            </li>-->*/}

                    {/*<li className="nav-item dropdown">*/}
                    {/*    <a className="nav-link dropdown-toggle" id="npc-dropdown" data-toggle="dropdown"*/}
                    {/*       aria-haspopup="true" aria-expanded="false">NPC</a>*/}
                    {/*    <div className="dropdown-menu" aria-labelledby="dropdown01">*/}
                    {/*        <a className="dropdown-item" href="#!list/npc">List</a>*/}
                    {/*        <button type="input" className="dropdown-item"*/}
                    {/*                ng-click='$ctrl.changeRoute("/npc/edit")'>Create*/}
                    {/*        </button>*/}
                    {/*        <a className="dropdown-item" href="#!core/importExport/import/npc/npcs_data">Import</a>*/}
                    {/*        <a className="dropdown-item" href="#!core/importExport/export/npc/npcs_data">Export</a>*/}
                    {/*    </div>*/}
                    {/*</li>*/}

                    {/*<li className="nav-item dropdown">*/}
                    {/*    <a className="nav-link dropdown-toggle" id="item-dropdown" data-toggle="dropdown"*/}
                    {/*       aria-haspopup="true" aria-expanded="false">Item</a>*/}
                    {/*    <div className="dropdown-menu" aria-labelledby="dropdown01">*/}
                    {/*        <a className="dropdown-item" href="#!/list/item">List</a>*/}
                    {/*        <button type="input" className="dropdown-item"*/}
                    {/*                ng-click='$ctrl.changeRoute("/item/edit")'>Create*/}
                    {/*        </button>*/}
                    {/*        <a className="dropdown-item" href="#!core/importExport/import/item/items_data">Import</a>*/}
                    {/*        <a className="dropdown-item" href="#!core/importExport/export/item/items_data">Export</a>*/}
                    {/*    </div>*/}
                    {/*</li>*/}

                    {/*<li className="nav-item dropdown">*/}
                    {/*    <a className="nav-link dropdown-toggle" id="item-dropdown" data-toggle="dropdown"*/}
                    {/*       aria-haspopup="true" aria-expanded="false">Enemy</a>*/}
                    {/*    <div className="dropdown-menu" aria-labelledby="dropdown01">*/}
                    {/*        <a className="dropdown-item" href="#!list/enemy">List</a>*/}
                    {/*        <button type="input" className="dropdown-item"*/}
                    {/*                ng-click='$ctrl.changeRoute("/enemy/edit")'>Create*/}
                    {/*        </button>*/}
                    {/*        <a className="dropdown-item" href="#!core/importExport/import/enemy/enemies_data">Import</a>*/}
                    {/*        <a className="dropdown-item" href="#!core/importExport/export/enemy/enemies_data">Export</a>*/}
                    {/*    </div>*/}
                    {/*</li>*/}


                    <li className="nav-item dropdown">
                        {/*<a className="nav-link dropdown-toggle" data-toggle="dropdown"*/}
                        {/*   aria-haspopup="true" aria-expanded="false">Resources*/}
                        {/*</a>*/}
                        <a className="nav-link dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown">
                            Resources
                        </a>
                        <div className="dropdown-menu" aria-labelledby="dropdown01">
                            <a className="dropdown-item" href="#!resources/directory">Directories</a>
                            <a className="dropdown-item" href="#!resources/resource">Resources</a>
                        </div>
                    </li>

                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown">
                            Dropdown link
                        </a>
                        <div className="dropdown-menu">
                            <a className="dropdown-item" href="#">Link 1</a>
                            <a className="dropdown-item" href="#">Link 2</a>
                            <a className="dropdown-item" href="#">Link 3</a>
                        </div>
                    </li>


                    <div className={`nav-item ${styles.logout}`}>
                        <button className="btn my-2 my-sm-0 btn-outline-danger" type="submit"
                                ng-click='$ctrl.logout()'>Logout
                        </button>
                    </div>

                </ul>
                {/*// <!--        <form class="form-inline my-2 my-lg-0">-->*/}
                {/*// <!--            <input class="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search">-->*/}
                {/*// <!--            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>-->*/}
                {/*// <!--        </form>-->*/}
            </div>
        </nav>
    )
}
