import {useEffect, useState} from "react";
import { v4 as uuidv4 } from 'uuid';
import SelectComponent from "../components/template/SelectComponent";
import {Button} from "react-bootstrap";
import styles from "./template-create.module.css"

export default function TemplateCreate() {
    const [data, setData] = useState({key: "", name: "", value: [{key: uuidv4(), type: "", name: ""}]})

    useEffect(() => {
        const newKey = uuidv4();
        setData(data => {
            return {
                ...data,
                key: newKey
            }
        })

    }, [setData])

    const setName = (name) => {
        setData(old => {
            return {
                ...old,
                name: name
            }
        })
    }

    const addComponent = () => {
        const newKey = uuidv4();
        const newComponents = data.value.concat({key: newKey, type: "", name: ""})
        setData({ ...data, value: newComponents})
    }

    const removeComponent = (key) => {
        setData(old => {
            return {
                ...old,
                value: old.value.filter(comp => comp.key !== key)
            }
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
                        <label className="col-10 col-form-label text-sm-left">{data.key}</label>
                    </div>
                </div>
                <div className="row">
                    <label className="col-2 col-form-label text-sm-right">Name</label>
                    <div className="col-8">
                        <input
                            type="text"
                            className="form-control"
                            onChange={(e) => setName(e.target.value)}
                            value={data.name}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className={`col-10 ${styles.paddingTop}`}>
                        <button
                            className={`btn btn-primary float-right`}
                            onClick={() => console.log(JSON.stringify(data))}
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
            <hr />
            <div className="container">
                <div>
                    {data.value.map(comp => {
                        return(
                        <div key={comp.key} className={styles.paddingTop}>
                            <SelectComponent
                                component={comp}
                                setData={setData}
                                data={data}
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
