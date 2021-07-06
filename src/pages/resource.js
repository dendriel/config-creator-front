import {useEffect, useState} from "react";
import {useUser} from "../contexts/user-provider";
import resourceService from "../services/resource.service";
import PageHeader from "../components/components/PageHeader";
import ResourceList from "../components/resources/ResourceList";
import {useHistory} from "react-router";
import projectService from "../services/project.service";
import LinkTo from "../components/components/LinkTo";


export default function Resource() {
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
            })
            .catch(error => {
                if (error.response && error.response.status === 404) {
                    setNotFound(true)
                }
            })

    }, [user])

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

    return (
        <div className="container-fluid">
            <div className={"row"}>
                <div className={"col"}>
                    {notFound ?
                        <PageHeader current="Resources"/>
                        :
                        <PageHeader current="Resources" previous={project ? project.data.name : ""} previousLink="/"/>
                    }
                </div>
            </div>

            <div className={"row"}>
                {notFound ?
                        <div className="col text-center align-middle">
                            <LinkTo to="/project" message="Click here to select a default project" />
                        </div>
                        :
                        <>
                            <div className="col-12 text-center align-middle">
                                <div className={`row marginTopBottom`}>
                                    <div className="col-3"></div>
                                    <div className="col-9">
                                        <button className={`btn btn-primary float-left actionButton`} onClick={onCreate}>
                                            New
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <ResourceList
                                onEdit={onEdit}
                                service={resourceService}
                            />
                        </>
                }
            </div>
        </div>
    )
}
