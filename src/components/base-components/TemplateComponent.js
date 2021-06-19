import {useState} from "react";
import ComponentSelector from "./ComponentSelector";

export default function TemplateComponent(props) {
    const [data, setData] = useState(props.component)

    const getStyle = () => {
        return props.root ? "" : "border border-primary rounded"
    }

    return (
        <div className={`form-group col-md-12 text-left ${getStyle()}`}>
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
