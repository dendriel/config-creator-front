import {useEffect, useState} from "react";
import ProjectList from "../components/project/ProjectList";
import {useAlert} from "../contexts/alert-provides";
import templateService from "../services/template.service";
import {useHistory} from "react-router";


export default function Project() {
    const [projects, setProjects] = useState([])

    const {closeAlert, alertSuccess, alertError} = useAlert();

    const history = useHistory();

    const load = () => {
        templateService.getAll(0, 10)
            .then(response => {
                if (response && response.data) {
                    setProjects(response.data)
                }
            })
    }

    useEffect(() => {
        load();
    }, [setProjects])


    const onCreate = () => {
        history.push('/project/create')
    }

    const onEdit = (id) => {
        history.push('/project/edit/' + id)
    }

    const onRemove = (id, setRemoving) => {
        closeAlert()

        templateService.removeById(id)
            .then(() => {
                setProjects(old => {
                    return old.filter(t => t.id !== id);
                })
                alertSuccess("Project removed")
            })
            .catch(() => {
                alertError("Failed to remove. Please, try again.")
                setRemoving(false)
            })
    }

    return (
        <div className="col-md-12 container">
            <div>
                <h1>Projects / List</h1>
            </div>
            <div className="col-md-12 text-center align-middle">
                <div className={`row marginTopBottom`}>
                    <div className="col-md-9">
                        <button className={`btn btn-primary float-right actionButton`} onClick={onCreate}>
                            New
                        </button>
                    </div>
                </div>
            </div>
            <ProjectList
                elements={projects}
                onEdit={onEdit}
                onRemove={onRemove}
            />
        </div>
    )
}
