import PageHeader from "../components/components/PageHeader";
import {useEffect, useState} from "react";
import {useUser} from "../contexts/user-provider";
import projectService from "../services/project.service";
import LinkTo from "../components/components/LinkTo";

export default function Home() {
    const [project, setProject] = useState(null)
    const [notFound, setNotFound] = useState(true)

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
                if (error.response.status === 404) {
                    setNotFound(true)
                }
            })

    }, [user, setProject])

    return (
        <div className="col-md-12 container">
            <div className="text-center paddingTopBottom">
                {!notFound ?
                    <PageHeader current={project ? project.data.name : ""}/>
                    :
                    <LinkTo to="/project" message="Click here to select a default project" />
                }
            </div>
        </div>
    )
}
