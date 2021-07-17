import {useHistory, useParams} from "react-router";
import {useEffect, useState} from "react";
import resourceService from "../services/resource.service";
import {useAlert} from "../contexts/alert-provider";
import PageHeader from "../components/components/PageHeader";
import {useUser} from "../contexts/user-provider";
import projectService from "../services/project.service";
import {Button} from "react-bootstrap";
import CollectionList from "../components/collection/CollectionList";
import CollectionItemCreator from "../components/collection/CollectionItemCreator";


export default function CollectionEditor() {
    const [collection, setCollection] = useState({id: "", data: { name: "", value: null}})
    const [mode, setMode] = useState('list')
    const[editItem, setEditItem] = useState(undefined)
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
                loadedCollection.data.componentType = 'list'

                if (loadedCollection.data.value.length > 0) {
                    loadedCollection.data.value = loadedCollection.data.value.map(e => {
                        e.data.componentSubtype = loadedCollection.data.templateId
                        return e
                    })
                }

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

    const onChanged = (value) => {
        setCollection(old => {
            let newData = old.data
            newData.value = value

            return {
                ...old,
                data: newData
            }
        })
    }

    const onItemRemoved = (value) => {
        closeAlert()

        const toSave = JSON.parse(JSON.stringify(collection))
        toSave.data.value = value

        return resourceService.saveValues([toSave])
            .then(() => {
                clearUnsaved()
                setCollection(toSave)
            })
            .catch(() => {
                alertError("Failed to save resource. Please, try again")
            })
    }

    const clearUnsaved = () => {
        setCollection(old => {

            const newData = old.data
            newData.value = newData.value.map(e => {
                e.state = undefined
                return e
            })

            return {
                ...old,
                data: newData
            }
        })
    }

    const onSave = () => {
        closeAlert()

        resourceService.saveCollection(collection)
            .then(() => {
                alertSuccess("Resource saved successfully")
                clearUnsaved()
                setMode('list')
            })
            .catch(() => {
                alertError("Failed to save resource. Please, try again")
            })
    }

    const onCreate = () => {
        setMode('create')
    }

    const onEdit = (id) => {

        const target = collection.data.value.find(e => e.id === id)
        if (!target) {
            alertError("Could not find item " + id + " to edit ")
            return
        }

        setEditItem(target)
        setMode('create')
    }

    const onNewItemChanged = (id, value) => {
        if (!value) {
            return
        }

        setCollection(old => {
            let newData = old.data
            newData.value = newData.value.map(e => {
                if (e.id === id) {
                    e.data.value = value
                }
                return e
            })

            return {
                ...old,
                data: newData
            }
        })
    }

    const onItemCreated = (item) => {
        const newData = collection.data
        newData.value = newData.value.concat(item)

        setCollection(old => {
            return {
                ...old,
                data: newData
            }
        })
    }

    const onPrevious = () => {
        setEditItem(undefined)
        setMode('list')
    }

    return (
        <div className="container-fluid">
            <div className={"row"}>
                <div className={"col"}>
                    {mode === 'list' ?
                        <PageHeader current={collection.data.name} previous={project ? project.data.name : ""} previousLink="/"/>
                        :
                        <PageHeader current={"New Item"} previous={collection.data.name} onPrevious={onPrevious} previousLink={history.location.pathname}/>
                    }
                </div>
            </div>

            <div className={"row"}>
                <div className={"col"}>
                    {mode === 'create' ?
                        <div className={"row"}>
                            <div className={"col-10 marginBottom text-right"}>
                                <Button variant="info" onClick={onSave}>Save</Button>
                            </div>
                        </div>
                        : ""
                    }
                    <div className="row">
                        <div className="col-2"></div>
                        <div className="col-8 text-center align-middle">
                            {mode === 'list' ?
                                <>
                                    <div className={`row marginTopBottom`}>
                                        <div className="col">
                                            <button className={`btn btn-primary float-center actionButton`} onClick={onCreate}>
                                                New
                                            </button>
                                        </div>
                                    </div>
                                    {collection.data.componentType && collection.data.componentType === 'list' && collection.data.value ?
                                        <CollectionList
                                            value={collection.data.value}
                                            onChanged={onChanged}
                                            onEdit={onEdit}
                                            onRemoved={onItemRemoved}
                                        />
                                        : ""
                                    }
                                </>
                                :
                                <CollectionItemCreator
                                    name={collection.data.value.length + ":"}
                                    componentType={collection.data.componentSubtype}
                                    templateId={collection.data.templateId}
                                    onChanged={onNewItemChanged}
                                    onItemCreated={onItemCreated}
                                    item={editItem}
                                />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
