import {useEffect, useState} from "react";
import {useAlert} from "../contexts/alert-provider";
import projectService from "../services/project.service";
import {useHistory, useParams} from "react-router";
import {Button} from "react-bootstrap";
import BasePageContentFrame from "../components/page/BasePageContentFrame";
import userService from "../services/user.service";
import {useUser} from "../contexts/user-provider";

export default function ProjectCreate() {
    const [project, setProject] = useState({ id: "", data: { name: "" } })
    const [saving, setSaving] = useState(false)
    const {closeAlert, alertSuccess, alertError} = useAlert()
    const [mode, setMode] = useState("Create")
    const [def, setDefault] = useState(false)

    let { id } = useParams();
    const { reloadUser } = useUser()
    const history = useHistory()

    useEffect(() => {
        if (id) {
            loadById(id);
            setMode("Edit")
            return;
        }

        setProject({ id: "", data: { name: "" } })

    }, [setProject])

    const loadById = (id) => {
        projectService.getById(id)
            .then(response => {
                if (response && response.data) {
                    setProject(response.data)
                }
            })
    }

    const setName = (name) => {
        setProject(old => {
            let data = old.data
            data = {
                ...data,
                name: name
            }
            return {
                ...old,
                data: data
            }
        })
    }

    const setId = (id) => {
        setProject(old => {
            return {
                ...old,
                id: id
            }
        })
    }

    const setDefaultProject = (projectId) => {
        return userService.setDefaultProject(projectId)
            .then(() => {
                return reloadUser()
            })
    }


    const save = () => {
        if (saving) {
            return;
        }

        closeAlert();

        setSaving(true)
        projectService.save(project)
            .then(response => {
                console.log("saved successfully. Id: " + response.data)
                alertSuccess(`Project ${mode === 'Create' ? 'created' : 'updated'} successfully.`)
                if (response.data) {
                    setId(response.data)
                }

                return id || response.data
            })
            .then(projectId => {
                if (!def) {
                    return
                }

                return setDefaultProject(projectId)
                    .catch(() => {
                        alertError("Failed to set project as default. Please, try again.")
                    })
            })
            .then(() => {
                history.push('/project?alert=true')
            })
            .catch(error => {
                console.log("error: " + error)
                alertError("Failed to save the project. Please, try again.")
            })
            .finally(() => {
                setSaving(false)
            })
    }

    return(
        <BasePageContentFrame
            current={mode}
            previous="Projects"
            previousLink="/project"
        >
            <div className={"container-fluid"}>
                <div className="row">
                    <label className="col-2 col-form-label text-right">Id</label>
                    <div className="col-8">
                        <label className="col-10 col-form-label text-left">{project.id}</label>
                    </div>
                </div>
                <div className="row">
                    <label className="col-2 col-form-label text-right">Name</label>
                    <div className="col-8">
                        <input
                            type="text"
                            className="form-control"
                            onChange={e => setName(e.target.value)}
                            value={project.data.name}
                        />
                    </div>
                </div>
                <div className="row marginTop">
                    <label className="col-2 col-form-label text-right">Set as Default</label>
                    <div className="col-1">
                        <input
                            type="checkbox"
                            className="form-control"
                            onChange={e => {setDefault(e.target.checked)}}
                            checked={def}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className={`col-10 marginTopBottom`}>
                        <Button variant="primary" className="float-right" onClick={save} disabled={saving || !project.data.name || project.data.name.length === 0}>
                            {saving ? <span className="spinner-border spinner-border-sm" /> : ""}
                            Save
                        </Button>
                    </div>
                </div>
            </div>
        </BasePageContentFrame>
    )
}
