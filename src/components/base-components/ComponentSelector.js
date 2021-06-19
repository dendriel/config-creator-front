import TextComponent from "./TextComponent";
import TextAreaComponent from "./TextAreaComponent";
import NumberComponent from "./NumberComponent";
import ToggleComponent from "./ToggleComponent";
import ListComponent from "./ListComponent";
import TemplateComponent from "./TemplateComponent";


export default function ComponentSelector(props) {

    const select = () => {
        switch(props.component.type) {
            case "text":
                return <TextComponent
                    key={props.component.key}
                    component={props.component}
                    setData={props.setData}
                />
            case "textarea":
                return <TextAreaComponent
                    key={props.component.key}
                    component={props.component}
                    setData={props.setData}
                />
            case "number":
                return <NumberComponent
                    key={props.component.key}
                    component={props.component}
                    setData={props.setData}
                />
            case "toggle":
                return <ToggleComponent
                    key={props.component.key}
                    component={props.component}
                    setData={props.setData}
                />
            case "template":
                return <TemplateComponent
                    key={props.component.key}
                    component={props.component}
                    setData={props.setData}
                />
            case "list":
                return <ListComponent
                    key={props.component.key}
                    component={props.component}
                    setData={props.setData}
                />
            default:
                return <div>unknown component {props.component.type} </div>
        }
    }

    return select()
}
