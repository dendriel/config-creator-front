import {useEffect, useState} from "react";
import {useAlert} from "../contexts/alert-provider";
import resourceService from "../services/resource.service";
import {useHistory, useParams} from "react-router";
import ResourceTypeSelect from "../components/resources/ResourceTypeSelect";
import PageHeader from "../components/components/PageHeader";
import ComponentTypeDropdown from "../components/template/ComponentTypeDropdown";
import ComponentTypeDropdownExtraFields from "../components/template/ComponentTypeDropdownExtraFields";
import BasePageContentFrame from "../components/page/BasePageContentFrame";


export default function ResourceCreate() {
    const [resource, setResource] = useState({ id: "", data: { type: "item", name: "", componentType: "text", componentSubtype: "" } })
    const [saving, setSaving] = useState(false)
    const {closeAlert, alertSuccess, alertError} = useAlert();
    const [mode, setMode] = useState("Create")

    const [initialComponentSubtype, setInitialComponentSubtype] = useState(resource.data.componentType)

    let { projectId, id } = useParams();
    const history = useHistory();

    const [project, setProject] = useState(null)

    const loadProject = () => {
        const projectData = localStorage.getItem(projectId)
        setProject(JSON.parse(projectData))
    }

    useEffect(() => {
        if (!projectId) {
            console.log("Project not found")
            history.push('/')
            return;
        }

        loadProject();

        if (id) {
            loadById(id);
            setMode("Edit")
            return;
        }

        setResource({ id: "", data: { projectId: projectId, type: "item", name: "", componentType: "text", componentSubtype: "" } })

    }, [setResource, projectId, id])

    const loadById = (id) => {
        resourceService.getById(id)
            .then(response => {
                if (response && response.data) {
                    const value = response.data
                    setResource(value)
                    if (value.data.componentType === "list") {
                        setInitialComponentSubtype(value.data.componentSubtype)
                    }
                }
            })
    }

    const setName = (name) => setValue('name', name)
    const setType = (type) => {
        if (type === 'collection' && resource.data.componentType === 'list') {
            setComponentType('', false)
        }
        setValue('type', type)
    }
    const setComponentType = (componentType, isTemplate) => {
        if (isTemplate) {
            setValue('componentType', 'template')
            setComponentSubtype(componentType)
        }
        else {
            setValue('componentType', componentType)
        }
    }
    const setComponentSubtype = (type) => setValue('componentSubtype', type)

    const clearValues = () => {
        setValue('value', null)
        resource.data.value = null
    }

    const setValue = (key, value) => {
        setResource(old => {
            let data = old.data
            data = {...data, [key]: value }
            return {...old, data: data }
        })
    }

    const setId = (id) => {
        setResource(old => {
            return {
                ...old,
                id: id
            }
        })
    }

    const getListLength = () => {
        if (!isComponentTypeList() || !resource.data.value) {
            return 0
        }

        return resource.data.value.length
    }

    const isSaveDisabled = () => {
        return saving ||
            !resource.data.name ||
            !resource.data.componentType ||
            (isComponentTypeList() && !resource.data.componentSubtype)
    }

    const isComponentTypeList = () => {
        return resource.data.componentType === "list"
    }

    const save = () => {
        if (saving) {
            return;
        }

        closeAlert();
        setSaving(true)

        if (initialComponentSubtype &&
            resource.data.componentType === "list" &&
            initialComponentSubtype !== resource.data.componentSubtype
        ) {
            clearValues()
            setInitialComponentSubtype(resource.data.componentSubtype)
        }

        resourceService.save(resource)
            .then(response => {
                alertSuccess("Resource saved successfully.")
                if (response.data) {
                    setId(response.data)
                }
            })
            .catch(error => {
                console.log("error: " + error)
                alertError("Failed to save the resource. Please, try again.")
            })
            .finally(() => {
                setSaving(false)
            })
    }

    const getSelectedType = () => {
        return resource.data.componentType === 'template' ? resource.data.componentSubtype : resource.data.componentType
    }

    return (
        <BasePageContentFrame current={mode} previous={"Resources"} previousLink={"/resource"}>
            <div className={"container-fluid"}>
                <div className="row">
                    <label className="col-2 col-form-label text-right">Id</label>
                    <div className="col-8">
                        <label className="col-10 col-form-label text-left">{resource.id}</label>
                    </div>
                </div>
                <div className="row">
                    <label className="col-2 col-form-label text-right">Project</label>
                    <div className="col-8">
                        <label className="col-10 col-form-label text-left">{project ? project.data.name : ""}</label>
                    </div>
                </div>
                <div className="row">
                    <label className="col-2 col-form-label text-right">Name</label>
                    <div className="col-8">
                        <input
                            type="text"
                            className="form-control"
                            onChange={(e) => setName(e.target.value)}
                            value={resource.data.name}
                        />
                    </div>
                </div>
                <div className="row marginTop">
                    <label className="col-2 col-form-label text-right">Type</label>
                    <div className="col-8">
                        <ResourceTypeSelect
                            type={resource.data.type}
                            onSelected={setType}
                        />
                    </div>
                </div>
                <div className="row marginTop">
                    <label className="col-2 col-form-label text-right">Component</label>
                    <div className="col-8">
                        <ComponentTypeDropdown
                            placeholder="Select"
                            selected={getSelectedType()}
                            onSelected={setComponentType}
                            excludeTypes={resource.data.type === 'collection' ? ["list"] : []}
                            includeTemplates={true}
                        />
                    </div>
                </div>
                {resource.data.componentType === "list" ?
                    <div className="row marginTop">
                        <label className="col-2 col-form-label text-right">SubType</label>
                        <div className="col-8">
                            <ComponentTypeDropdownExtraFields
                                type={resource.data.componentType}
                                subtype={resource.data.componentSubtype}
                                onChanged={setComponentSubtype}
                                includeTemplates={false}
                            />
                            {initialComponentSubtype &&
                             resource.data.componentSubtype &&
                             initialComponentSubtype !== resource.data.componentSubtype &&
                                getListLength() > 0?
                                    <label className={" col-form-label textColorRed"}>
                                        WARNING! Changing SubType will remove all {getListLength()} list elements.
                                    </label>
                                : ""
                            }
                        </div>
                    </div>
                    : ""
                }

                <div className="row">
                    <div className={`col-10 marginTopBottom`}>
                        <button className={`btn btn-primary float-right`} onClick={save} disabled={isSaveDisabled()}>
                            {saving ? <span className="spinner-border spinner-border-sm" /> : ""}
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </BasePageContentFrame>
    )
}
