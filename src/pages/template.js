import {useState} from "react";
import TemplateList from "../components/template/TemplateList";
import TemplateCreate from "../components/template/TemplateCreate";
import styles from "./template.module.css"


export default function Template() {
    const [templates, setTemplates] = useState([
        { id: 1, name: "template 01" },
        { id: 2, name: "template 02" },
        { id: 3, name: "template 03" }
    ])

    const [windowMode, setWindowMode] = useState("List")
    const [editTemplateId, setEditTemplateId] = useState(false)

    const showEditTemplate = (id) => {
        setWindowMode("Edit")
        setEditTemplateId(id)
    }

    return(
        <div className="col-md-12 container">
            <div>
                <h1>Templates / {windowMode}</h1>
            </div>
            {!editTemplateId ?
                <>
                    <div className="col-md-12 text-center align-middle">
                        <div className={`row  ${styles.newButtonPadding}`}>
                            <div className="col-md-9">
                                <button className={`btn btn-primary float-right ${styles.actionButton}`}>
                                    New
                                </button>
                            </div>
                        </div>
                    </div>
                    <TemplateList
                        templates={templates}
                        showEditTemplate={showEditTemplate}
                    />
                </>
                :
                <>
                    <div className="col-md-12 text-center align-middle">
                        <div className={`row  ${styles.backButtonPadding}`}>
                            <div className="col-md-12">
                                <button className={`btn btn-primary float-left ${styles.actionButton}`} onClick={() => setEditTemplateId(null)}>
                                    Back
                                </button>
                            </div>
                        </div>
                    </div>
                    <TemplateCreate
                        idTemplate={editTemplateId}
                    />
                </>
            }
        </div>
    )
}
