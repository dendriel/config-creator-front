import React from "react"
import {useEffect, useState} from "react";
import {useUser} from "../../contexts/user-provider";
import projectService from "../../services/project.service";
import ListPageContentFrame from "./ListPageContentFrame";
import LinkTo from "../components/LinkTo";


export default function ProjectListPageContentFrame(props) {
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

    const onEdit = (id) => {
        storeProject()
        props.onEdit(id)
    }

    const onCreate = () => {
        storeProject()
        props.onCreate()
    }

    return (
        <ListPageContentFrame
            current={props.current}
            previous={project ? project.data.name : ""}
            previousLink="/"
            onCreate={onCreate}
            hideNewButton={notFound}
        >
            {notFound ?
                <LinkTo to="/project" message="Click here to select a default project"/>
                :
                React.cloneElement(props.children, {...props, onEdit})
            }
        </ListPageContentFrame>
    )
}
