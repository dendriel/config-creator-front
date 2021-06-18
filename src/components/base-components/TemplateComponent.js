import TextComponent from "./TextComponent";
import TextAreaComponent from "./TextAreaComponent";
import NumberComponent from "./NumberComponent";
import ToggleComponent from "./ToggleComponent";
import {useEffect, useState} from "react";

export default function TemplateComponent(props) {
    const [data, setData] = useState(props.component)

    const getStyle = () => {
        return props.root ? "" : "border border-primary rounded"
    }

    // useEffect(() => {
    //     console.log("Data changed: " + JSON.stringify(data))
    // }, [data])

    return (
        <div className={`form-group col-md-10 text-left ${getStyle()}`}>
            <label>{props.component.name}</label>
            {props.component.components.map(comp => {
                switch(comp.type) {
                    case "text":
                        return <TextComponent
                            key={comp.key}
                            component={comp}
                            setData={setData}
                        />
                    case "textarea":
                        return <TextAreaComponent
                            key={comp.key}
                            component={comp}
                            setData={setData}
                        />
                    case "number":
                        return <NumberComponent
                            key={comp.key}
                            component={comp}
                            setData={setData}
                        />
                    case "toggle":
                        return <ToggleComponent
                            key={comp.key}
                            component={comp}
                            setData={setData}
                        />
                    case "template":
                        return <TemplateComponent
                            key={comp.key}
                            component={comp}
                            setData={setData}
                        />
                    default:
                        return <div>unknown component {comp.type} </div>
                }
            })}
        </div>
    )
}
