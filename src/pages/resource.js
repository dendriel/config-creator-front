import {useEffect, useState} from "react";
import {useAlert} from "../contexts/alert-provider";
import {useUser} from "../contexts/user-provider";
import resourceService from "../services/resource.service";
import PageHeader from "../components/components/PageHeader";
import ResourceList from "../components/resources/ResourceList";
import {useHistory} from "react-router";
import projectService from "../services/project.service";
import LinkTo from "../components/components/LinkTo";


export default function Resource() {
    const [resources, setResources] = useState([])
    const {closeAlert, alertSuccess, alertError} = useAlert();

    const history = useHistory();

    const [project, setProject] = useState(null)
    const [notFound, setNotFound] = useState(false)

    const {user} = useUser()

    useEffect(() => {
        const defaultProjectId = user.defaultProjectId

        if (!defaultProjectId) {
            setNotFound(true)
            return
        }

        projectService.getById(defaultProjectId)
            .then(response => {
                setProject(response.data)
                setNotFound(false)
                load();
            })
            .catch(error => {
                if (error.response && error.response.status === 404) {
                    setNotFound(true)
                }
            })

    }, [user, setProject, setResources])

    const load = () => {
        resourceService.getAll(0, 10)
            .then(response => {
                if (response && response.data) {
                    setResources(response.data)
                }
            })
    }

    const storeProject = () => {
        localStorage.setItem(project.id, JSON.stringify(project))
    }

    const onCreate = () => {
        storeProject()
        history.push('/resource/create/' + user.defaultProjectId)
    }

    const onEdit = (id) => {
        storeProject()
        history.push('/resource/edit/' + user.defaultProjectId + '/' + id)
    }

    const onRemove = (id, setRemoving) => {
        closeAlert()

        resourceService.removeById(id)
            .then(() => {
                setResources(old => {
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
            {notFound ?
                <PageHeader current="Resources"/>
                :
                <PageHeader current="Resources" previous={project ? project.data.name : ""} previousLink="/"/>
            }

            {notFound ?
                <div className="col-md-12 text-center align-middle">
                    <LinkTo to="/project" message="Click here to select a default project" />
                </div>
                :
                <>
                <div className="col-md-12 text-center align-middle">
                    <div className={`row marginTopBottom`}>
                        <div className="col-md-9">
                            <button className={`btn btn-primary float-right actionButton`} onClick={onCreate}>
                                New
                            </button>
                        </div>
                    </div>
                </div>
                <ResourceList
                    elements={resources}
                    onEdit={onEdit}
                    onRemove={onRemove}
                />
                </>
            }
        </div>
    )
}
