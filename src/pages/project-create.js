import {useEffect, useState} from "react";
import {useAlert} from "../contexts/alert-provides";
import templateService from "../services/template.service";
import {useParams} from "react-router";

export default function ProjectCreate() {
    const [project, setProject] = useState({ id: "", data: { name: "" } })
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

        setProject({ id: "", data: { name: "" } })

    }, [setProject])

    const loadById = (id) => {
        templateService.getById(id)
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
        templateService.save(project)
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
        <div className="col-md-12 container">
            <div>
                <h1>Projects / {mode}</h1>
            </div>
            <div>
                <div className="row">
                    <label className="col-2 col-form-label text-sm-right">Id</label>
                    <div className="col-8">
                        <label className="col-10 col-form-label text-sm-left">{project.id}</label>
                    </div>
                </div>
                <div className="row">
                    <label className="col-2 col-form-label text-sm-right">Name</label>
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
                    <div className={`col-10 marginTop`}>
                        <button className={`btn btn-primary float-right`} onClick={save} disabled={saving}>
                            {saving ? <span className="spinner-border spinner-border-sm" /> : ""}
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
