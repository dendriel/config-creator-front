import {useEffect, useState} from "react";
import {useUser} from "../contexts/user-provider";
import ResourceList from "../components/resources/ResourceList";
import {useHistory} from "react-router";
import projectService from "../services/project.service";
import LinkTo from "../components/components/LinkTo";
import ListPageContentFrame from "../components/page/ListPageContentFrame";


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
        <ListPageContentFrame
            current="Resources"
            previous={project ? project.data.name : ""}
            previousLink="/"
            onCreate={onCreate}
            hideNewButton={notFound}
        >
            {notFound ?
                <LinkTo to="/project" message="Click here to select a default project"/>
                :
                <ResourceList onEdit={onEdit}/>
            }
        </ListPageContentFrame>
    )
}
