import PageHeader from "../components/components/PageHeader";
import {useEffect, useState} from "react";
import {useUser} from "../contexts/user-provider";
import projectService from "../services/project.service";
import LinkTo from "../components/components/LinkTo";
import resourceService from "../services/resource.service";
import ComponentSelector from "../components/base-components/ComponentSelector";
import {Button} from "react-bootstrap";
import {useAlert} from "../contexts/alert-provider";
import {Link} from "react-router-dom";

export default function Home() {
    const [project, setProject] = useState(null)
    const [notFound, setNotFound] = useState(true)
    const [itemResourcesData, setItemResourcesData] = useState(null)
    const [collResourcesData, setCollResourcesData] = useState(null)


    const {user} = useUser()

    const {closeAlert, alertSuccess, alertError} = useAlert();

    const loadResources = () => {
        resourceService.getAll(0, 100)
            .then(response => {
                const itemRes = response.data.filter(r => r.data.type === 'item')
                const collRes = response.data.filter(r => r.data.type === 'collection')
                setItemResourcesData(itemRes)
                setCollResourcesData(collRes)
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
        setItemResourcesData(old => {
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

    const onSave = () => {
        closeAlert()
        resourceService.saveValues(itemResourcesData)
            .then(() => {
                alertSuccess("Data saved successfully")
            })
            .catch(() => {
                alertError("Failed to saved data. Please, try again")
            })
    }

    return (
        <div className="container">
            <div className={"text-center"}>
                {!notFound ?
                    <div className="largeMarginBottom marginTop">
                        <PageHeader current={project ? project.data.name : ""}/>
                    </div>
                    :
                    <LinkTo to="/project" message="Click here to select a default project" />
                }
            </div>

            {!notFound && collResourcesData ?
                <div className={"row"}>
                    {collResourcesData.map(res => {
                            if (res.data.type === "collection") {
                                return <div className={"col"}>
                                    <Link to={'/collection/edit/' + res.id}>{res.data.name}</Link>
                                </div>
                            }
                        }
                    )}
                </div>
                : ""
            }
            {!notFound && itemResourcesData ?
                <>
                    <div className={"row"}>
                        <div className={"col marginBottom text-right"}>
                            <Button variant="info" onClick={onSave}>Save</Button>
                        </div>
                    </div>
                    <div className={"row"}>
                        <div className={"container"}>
                            {itemResourcesData.map(res => {
                                if (res.data.type === "item") {
                                    return <ComponentSelector
                                        key={res.id}
                                        id={res.id}
                                        component={res.data}
                                        onChanged={onItemChanged}
                                    />
                                }
                            }
                        )}
                        </div>
                    </div>
                </>
                    : ""
            }
        </div>
    )
}
