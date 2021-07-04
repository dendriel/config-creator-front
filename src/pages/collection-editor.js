import {useHistory, useParams} from "react-router";
import {useEffect, useState} from "react";
import resourceService from "../services/resource.service";
import {useAlert} from "../contexts/alert-provider";
import PageHeader from "../components/components/PageHeader";
import {useUser} from "../contexts/user-provider";
import projectService from "../services/project.service";
import ComponentSelector from "../components/base-components/ComponentSelector";
import {Button} from "react-bootstrap";


export default function CollectionEditor() {
    const [collection, setCollection] = useState({id: "", data: { name: "", value: []}})
    const history = useHistory();
    let { id } = useParams();

    const [project, setProject] = useState(null)
    const [, setNotFound] = useState(false)

    const {closeAlert, alertSuccess, alertError} = useAlert();

    const {user} = useUser()

    const loadCollection = () => {
        resourceService.getById(id)
            .then(response => {
                if (!response || !response.data) {
                    return
                }
                let loadedCollection = response.data
                if (!loadedCollection.data.value) {
                    loadedCollection.data.value = []
                }

                if (loadedCollection.data.componentType === 'template') {
                    loadedCollection.data.templateId = loadedCollection.data.componentSubtype
                }

                loadedCollection.data.componentSubtype = loadedCollection.data.componentType
                loadedCollection.data.componentType = "list"


                console.log(JSON.stringify(loadedCollection))
                setCollection(loadedCollection)

            })
            .catch(error => {
                if (error.response && error.response.status === 404) {
                    alertError("Could not found the target collection.")
                }
                else {
                    alertError("Failed to load the collection.")
                }
            })
    }

    useEffect(() => {
        if (!id) {
            history.push('/notfound')
            return
        }

        const defaultProjectId = user.defaultProjectId

        if (!defaultProjectId) {
            setNotFound(true)
            return
        }

        projectService.getById(defaultProjectId)
            .then(response => {
                setProject(response.data)
                setNotFound(false)
                loadCollection();
            })
            .catch(error => {
                if (error.response && error.response.status === 404) {
                    history.push('/notfound')
                }
            })

    }, [id, user, setProject])

    const onChanged = (id, value) => {
        console.log(id + " - " + value)

        setCollection(old => {
            let newData = old.data
            newData.value = value
            return {
                ...old,
                data: newData
            }
        })
    }

    const onSave = () => {
        closeAlert()
        resourceService.saveValues([collection])
            .then(() => {
                alertSuccess("Resource updated successfully")
            })
            .catch(() => {
                alertError("Failed to update resource. Please, try again")
            })
    }

    return (
        <div className="container">
            <div>
                <PageHeader current={collection.data.name} previous={project ? project.data.name : ""} previousLink="/"/>
            </div>
            <div>
                <div className={"row"}>
                    <div className={"col marginBottom text-right"}>
                        <Button variant="info" onClick={onSave}>Save</Button>
                    </div>
                </div>
                <div className="row">
                    <div className={"container"}>
                        <ComponentSelector
                            key={collection.id}
                            id={collection.id}
                            component={collection.data}
                            onChanged={onChanged}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
