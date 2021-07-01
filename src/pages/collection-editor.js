import {useHistory, useParams} from "react-router";
import {useEffect, useState} from "react";
import resourceService from "../services/resource.service";
import {useAlert} from "../contexts/alert-provider";
import PageHeader from "../components/components/PageHeader";
import {useUser} from "../contexts/user-provider";
import projectService from "../services/project.service";


export default function CollectionEditor() {
    const [collection, setCollection] = useState({id: "", data: { name: "", value: []}})
    const history = useHistory();
    let { id } = useParams();

    const [project, setProject] = useState(null)
    const [notFound, setNotFound] = useState(false)

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


    return (
        <div className="col-md-12 container">
            <div>
                <PageHeader current={collection.data.name} previous={project ? project.data.name : ""} previousLink="/"/>
            </div>
            <div>
                <div className="row">
                </div>
            </div>
        </div>
    )
}
