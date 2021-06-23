import {useEffect, useState} from "react";
import { v4 as uuidv4 } from 'uuid';
import SelectComponent from "../components/template/SelectComponent";
import {Button} from "react-bootstrap";
import styles from "./template-create.module.css"
import {useParams} from "react-router";
import templateService from "../services/template.service";
import {useAlert} from "../contexts/alert-provides";

export default function TemplateCreate() {
    const [template, setTemplate] = useState({ id: "", data: { name: "", value: [] } })

    const {closeAlert, alertSuccess, alertError} = useAlert();

    let { id } = useParams();

    useEffect(() => {
        console.log("ID: " + id)
        if (id) {
            loadById(id);
            return;
        }

        setTemplate({ id: "", data: { name: "", value: [] } })

    }, [setTemplate])

    const loadById = (id) => {
        templateService.getById(id)
            .then(response => {
                if (response && response.data) {
                    setTemplate(response.data)
                }
            })
    }

    const setData = (data) => {
        setTemplate(old => {
             return {
                 ...old,
                 data: data
             }
        })
    }

    const setName = (name) => {
        setTemplate(old => {
            let data = old.data
            data = {
                ...data,
                name: name
            }
            return {
                ...old,
                data: data
            }
        })
    }

    const setId = (id) => {
        setTemplate(old => {
            return {
                ...old,
                id: id
            }
        })
    }

    const addComponent = () => {
        const newKey = uuidv4();
        const newComponents = template.data.value.concat({key: newKey, type: "", name: ""})
        const data = {
            ...template.data,
            value: newComponents
        }
        setTemplate({
            ...template,
            data: data
            }
        )
    }

    const removeComponent = (key) => {
        const newComponents = template.data.value.filter(comp => comp.key !== key)
        const data = {
            ...template.data,
            value: newComponents
        }
        setTemplate(old => {
            return {
                ...old,
                data: data
            }
        })
    }

    const save = () => {
        // validate name
        //block other operations?
        closeAlert();

        templateService.save(template)
            .then(response => {
                console.log("saved successfully. Id: " + response.data)
                alertSuccess("Template saved successfully.")
                if (response.data) {
                    setId(response.data)
                }
            })
            .catch(error => {
                console.log("error: " + error)
                alertError("Failed to save the template. Please, try again.")
            })
    }

    return(
        <div className="col-md-12 container">
            <div>
                <h1>Templates / Create</h1>
            </div>
            <div>
                <div className="row">
                    <label className="col-2 col-form-label text-sm-right">Id</label>
                    <div className="col-8">
                        <label className="col-10 col-form-label text-sm-left">{template.id}</label>
                    </div>
                </div>
                <div className="row">
                    <label className="col-2 col-form-label text-sm-right">Name</label>
                    <div className="col-8">
                        <input
                            type="text"
                            className="form-control"
                            onChange={(e) => setName(e.target.value)}
                            value={template.data.name}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className={`col-10 ${styles.paddingTop}`}>
                        <button
                            className={`btn btn-primary float-right`}
                            onClick={save}
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
            <hr />
            <div className="container">
                <div>
                    {template.data.value.map(comp => {
                        return(
                        <div key={comp.key} className={styles.paddingTop}>
                            <SelectComponent
                                component={comp}
                                setData={setData}
                                data={template.data}
                                remove={removeComponent}
                            />
                        </div>)
                    })
                    }
                </div>
                <div className={`row justify-content-center paddingTopBottom`}>
                    <div className="col-10">
                        <Button
                            className="float-right"
                            variant="info"
                            onClick={addComponent}
                        >
                            Add
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
