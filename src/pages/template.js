import {useState} from "react";
import TemplateList from "../components/template/TemplateList";
import styles from "./template.module.css"
import {useHistory} from "react-router";
import TemplateCreate from "./template-create";


export default function Template() {
    const [templates, setTemplates] = useState([
        { id: 1, name: "template 01"},
        { id: 2, name: "template 02" },
        { id: 3, name: "template 03" }
    ])

    const [windowMode, setWindowMode] = useState("List")
    const [editTemplateId, setEditTemplateId] = useState(null)

    const history = useHistory();

    const showEditTemplate = (id) => {
        if (id === 0) {
            // setWindowMode("Create")
            history.push('/template/create')
        }
        else if (id > 0) {
            setWindowMode("Edit")
        }
        else {
            setWindowMode("List")
        }
        setEditTemplateId(id)
        console.log(id + "/" + editTemplateId)
    }

    return(
        <div className="col-md-12 container">
            <div>
                <h1>Templates / {windowMode}</h1>
            </div>
            {editTemplateId === null ?
                <>
                    <div className="col-md-12 text-center align-middle">
                        <div className={`row  ${styles.newButtonPadding}`}>
                            <div className="col-md-9">
                                <button
                                    className={`btn btn-primary float-right ${styles.actionButton}`}
                                    onClick={() => showEditTemplate(0)}
                                >
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
                                <button
                                    className={`btn btn-primary float-left ${styles.actionButton}`}
                                    onClick={() => showEditTemplate(null)}
                                >
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
