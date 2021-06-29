import PageHeader from "../components/components/PageHeader";
import {useEffect, useState} from "react";
import {useUser} from "../contexts/user-provider";
import projectService from "../services/project.service";
import LinkTo from "../components/components/LinkTo";
import resourceService from "../services/resource.service";
import ComponentSelector from "../components/base-components/ComponentSelector";
import {Button} from "react-bootstrap";

export default function Home() {
    const [project, setProject] = useState(null)
    const [notFound, setNotFound] = useState(true)
    const [resourcesData, setResourcesData] = useState(null)

    const {user} = useUser()

    const loadResources = () => {
        resourceService.getAll(0, 10)
            .then(response => {
                setResourcesData(response.data)
            })
    }

    const loadProject = () => {
        projectService.getDefault()
            .then(response => {
                setProject(response.data)
                setNotFound(false)
                loadResources()
            })
            .catch(error => {
                if (error.response && error.response.status === 404) {
                    setNotFound(true)
                }
            })
    }

    useEffect(() => {
        const defaultProjectId = user.defaultProjectId

        if (!defaultProjectId) {
            setNotFound(true)
            return
        }

        loadProject(defaultProjectId)
    }, [user, setProject])

    const onItemChanged = (id, value) => {
        setResourcesData(old => {
            return old.map(res => {
                if (res.id === id) {
                    return {
                        ...res,
                        data: {
                            ...res.data,
                            value: value
                        }
                    }
                }
                return res
            })
        })
    }

    return (
        <div className="col-md-12 container">
            <div className="text-center marginTop marginTopBottom">
                {!notFound ?
                    <div className="largeMarginBottom">
                        <PageHeader current={project ? project.data.name : ""}/>
                    </div>
                    :
                    <LinkTo to="/project" message="Click here to select a default project" />
                }
                {!notFound && resourcesData ?
                    <>
                        <Button variant="info" onClick={() => console.log(JSON.stringify(resourcesData))}> Save </Button>
                        <div className="col-md-12 container align-middle">
                            {resourcesData.map(res => {
                                if (res.data.type === "item") {
                                    return <ComponentSelector
                                        key={res.id}
                                        id={res.id}
                                        component={res.data}
                                        onChanged={onItemChanged}
                                    />
                                }
                                // else {
                                //     return <TemplateComponent
                                //         root={true}
                                //         component={res}
                                //         setData={setResourcesData}
                                //     />
                                // }
                            }
                        )}
                        </div>
                    </>
                        : ""
                }
            </div>
        </div>
    )
}
