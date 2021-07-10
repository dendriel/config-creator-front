import {useEffect, useState} from "react";
import {useAlert} from "../contexts/alert-provider";
import projectService from "../services/project.service";
import {useParams} from "react-router";
import {Button} from "react-bootstrap";
import BasePageContentFrame from "../components/page/BasePageContentFrame";

export default function ProjectCreate() {
    const [project, setProject] = useState({ id: "", data: { name: "", default: false } })
    const [saving, setSaving] = useState(false)
    const {closeAlert, alertSuccess, alertError} = useAlert();
    const [mode, setMode] = useState("Create")

    let { id } = useParams();

    useEffect(() => {
        if (id) {
            loadById(id);
            setMode("Edit")
            return;
        }

        setProject({ id: "", data: { name: "", default: false } })

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

    const save = () => {
        if (saving) {
            return;
        }

        closeAlert();

        setSaving(true)
        projectService.save(project)
            .then(response => {
                console.log("saved successfully. Id: " + response.data)
                alertSuccess("Project saved successfully.")
                if (response.data) {
                    setId(response.data)
                }
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
                            onChange={(e) => setName(e.target.value)}
                            value={project.data.name}
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
