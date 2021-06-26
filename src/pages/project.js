import {useEffect, useState} from "react";
import ProjectList from "../components/project/ProjectList";
import {useAlert} from "../contexts/alert-provider";
import projectService from "../services/project.service";
import userService from "../services/user.service";
import {useHistory} from "react-router";
import PageHeader from "../components/components/PageHeader";
import {useUser} from "../contexts/user-provider";


export default function Project() {
    const [projects, setProjects] = useState([])
    const [onDefaultInProgress, setOnDefaultInProgress] = useState(false)

    const {closeAlert, alertSuccess, alertError} = useAlert();

    const {reloadUser} = useUser()

    const history = useHistory();

    const load = () => {
        projectService.getAll(0, 10)
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

    const onDefault = (id) => {
        if (onDefaultInProgress) {
            return
        }

        setOnDefaultInProgress(true)
        userService.setDefaultProject(id)
            .then(() => {
                reloadUser()
                    .then(() => {
                        alertSuccess("Project was set as default.")
                    })
                    .finally(() => setOnDefaultInProgress(false))
            })
            .catch(() => {
                alertError("Failed to set project as default. Please, try again.")
                setOnDefaultInProgress(false)
            })
    }

    const onRemove = (id, setRemoving) => {
        closeAlert()

        projectService.removeById(id)
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
            <PageHeader current="Projects" />
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
                onDefault={onDefault}
                onRemove={onRemove}
            />
        </div>
    )
}
