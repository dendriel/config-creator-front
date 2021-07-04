import {useState} from "react";
import ComponentTypeDropdown from "./ComponentTypeDropdown";
import ComponentTypeDropdownExtraFields from "./ComponentTypeDropdownExtraFields";
import ListItemController from "../components/ListItemController";


export default function SelectComponent(props) {
    const [data, setData] = useState(props.component)

    const setComponentType = (componentType, isTemplate) => {
        if (isTemplate) {
            onDataUpdated('componentType', 'template')
            setComponentSubtype(componentType)
        }
        else {
            onDataUpdated('componentType', componentType)
        }
    }

    const setComponentSubtype = (value) => onDataUpdated('componentSubtype', value)

    const updateData = (key, value) => {
        setData(old => {
            return {
                ...old,
                [key]: value
            }
        })
    }

    const updatePropsData = (key, value) => {
        props.data.value = props.data.value.map(comp => {
            if (comp.id !== props.component.id) {
                return comp;
            }

            return {
                ...comp,
                [key]: value
            }
        })

        props.setData(props.data)
    }

    const onDataUpdated = (key, value) => {
        updateData(key, value)
        updatePropsData(key, value)
    }

    const move = (sourceIndex, pos) => {
        const destnIndex = sourceIndex + pos;

        let val = [...props.data.value]

        const temp = val[destnIndex]
        val[destnIndex] = val[sourceIndex];
        val[sourceIndex] = temp;
        props.data.value = val

        props.setData(props.data)
    }

    return(
        <div className="row justify-content-center">
            <div className={`col-10 formBorder paddingTopBottom`}>
                <div className="row justify-content-center">
                    <div className="col-2">
                        <ComponentTypeDropdown
                            placeholder="Select"
                            selected={data.componentType !== 'template' ? data.componentType : data.componentSubtype}
                            onSelected={setComponentType}
                            includeTemplates={true}
                            excludeTypes={props.excludeTypes}
                        />
                    </div>
                    <div className="col-7">
                        <div className={"row"}>
                            <label className={"col-form-label col-2 text-right"}>Name:</label>
                            <input type="text" className="col-10 form-control" value={data.name} onChange={(e) => onDataUpdated("name", e.target.value)}/>
                        </div>
                    </div>
                    <div className="col-3 text-right">
                        <ListItemController
                            id={data.id}
                            saving={props.saving}
                            move={move}
                            list={props.data.value}
                            remove={props.remove}
                            />
                    </div>
                </div>
                <div className={`row justify-content-start`}>
                    <div className="col-10">
                        <ComponentTypeDropdownExtraFields
                            subtype={data.componentSubtype}
                            type={data.componentType}
                            onChanged={setComponentSubtype}
                            label="Type: "
                            style={"marginTop"}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
