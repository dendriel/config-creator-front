import {useState} from "react";
import ComponentSelector from "./ComponentSelector";

export default function ListComponent(props) {
    if (props.component.value === undefined || props.component.value === null) {
        props.component.value = []
    }

    const [, setData] = useState(props.component)

    return (
        <div className={`form-group col-md-12 text-center`}>
            <label>{props.component.name}</label>
            {props.component.value.map(comp => {
                return <ComponentSelector
                    key={comp.key}
                    component={comp}
                    setData={setData}
                />
            })}
        </div>
    )
}
