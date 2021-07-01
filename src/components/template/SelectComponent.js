import {useState} from "react";
import ComponentTypeDropdown from "./ComponentTypeDropdown";
import ComponentTypeDropdownExtraFields from "./ComponentTypeDropdownExtraFields";
import ListItemController from "../components/ListItemController";


export default function SelectComponent(props) {
    const [data, setData] = useState(props.component)

    const onComponentSubtypeChanged = (value) => {
        onDataUpdated('subtype', value)
    }

    const onDataUpdated = (key, value) => {
        setData(old => {
            return {
                ...old,
                [key]: value
            }
        })

        props.data.value = props.data.value.map(comp => {
            if (comp.key !== props.component.key) {
                return comp;
            }

            return {
                ...comp,
                [key]: value
            }
        })

        props.setData(props.data)
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
            <div className={`col-10 border border-secondary rounded paddingTopBottom`}>
                <div className="row justify-content-center">
                    <div className="col-2">
                        <ComponentTypeDropdown
                            placeholder="Select"
                            selected={data.type}
                            onSelected={(value) => onDataUpdated("type", value)}
                        />
                    </div>
                    <div className="col-7">
                        <div className={`float-left form-inline marginRight`}>
                            <label className={`col-form-label marginRight`}>Name:</label>
                            <input className="form-control" type="text" value={data.name} onChange={(e) => onDataUpdated("name", e.target.value)}/>
                        </div>
                    </div>
                    <div className="col-3 text-right">
                        <ListItemController
                            id={data.key}
                            saving={props.saving}
                            move={move}
                            list={props.data.value}
                            remove={props.remove}
                            />
                    </div>
                </div>
                <div className={`row justify-content-start marginTop`}>
                    <div className="col-10">
                        <div className={`form-inline marginRight`}>
                            <ComponentTypeDropdownExtraFields
                                subtype={data.subtype}
                                type={data.type}
                                onChanged={onComponentSubtypeChanged}
                                label="Type: "
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
