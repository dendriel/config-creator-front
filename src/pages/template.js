import {useEffect, useState} from "react";
import TemplateList from "../components/template/TemplateList";
import {useHistory} from "react-router";
import templateService from "../services/template.service";
import {useAlert} from "../contexts/alert-provider";


export default function Template() {
    const [templates, setTemplates] = useState([])

    const {closeAlert, alertSuccess, alertError} = useAlert();

    const history = useHistory();

    const loadTemplates = () => {
        templateService.getAll(0, 10)
            .then(response => {
                if (response && response.data) {
                    setTemplates(response.data)
                }
            })
    }

    useEffect(() => {
        loadTemplates();
    }, [setTemplates])

    const onCreate = () => {
        history.push('/template/create')
    }

    const onEdit = (id) => {
        history.push('/template/edit/' + id)
    }

    const onRemove = (id, setRemoving) => {
        closeAlert()

        templateService.removeById(id)
            .then(() => {
                setTemplates(old => {
                    return old.filter(t => t.id !== id);
                })
                alertSuccess("Template removed")
            })
            .catch(error => {
                console.log("Failed to remove: " + error)
                alertError("Failed to remove. Please, try again.")
                setRemoving(false)
            })
    }

    return(
        <div className="col-md-12 container">
            <div>
                <h1>Templates / List</h1>
            </div>
            <div className="col-md-12 text-center align-middle">
                <div className={`row marginTopBottom`}>
                    <div className="col-md-9">
                        <button className={`btn btn-primary float-right actionButton`} onClick={onCreate}>
                            New
                        </button>
                    </div>
                </div>
            </div>
            <TemplateList
                templates={templates}
                onEdit={onEdit}
                onRemove={onRemove}
            />
        </div>
    )
}
