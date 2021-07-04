import TextComponent from "./TextComponent";
import TextAreaComponent from "./TextAreaComponent";
import NumberComponent from "./NumberComponent";
import ToggleComponent from "./ToggleComponent";
import ListComponent from "./ListComponent";
import TemplateComponent from "./TemplateComponent";


export default function ComponentSelector(props) {

    const select = () => {
        switch(props.component.componentType) {
            case "text":
                return <TextComponent
                    id={props.id}
                    component={props.component}
                    onChanged={props.onChanged}
                />
            case "textarea":
                return <TextAreaComponent
                    id={props.id}
                    component={props.component}
                    onChanged={props.onChanged}
                />
            case "number":
                return <NumberComponent
                    id={props.id}
                    component={props.component}
                    onChanged={props.onChanged}
                />
            case "toggle":
                return <ToggleComponent
                    id={props.id}
                    component={props.component}
                    onChanged={props.onChanged}
                />
            case "list":
                return <ListComponent
                    id={props.id}
                    component={props.component}
                    onChanged={props.onChanged}
                />
            case "template":
                return <TemplateComponent
                    id={props.id}
                    component={props.component}
                    onChanged={props.onChanged}
                />
            default:
                return <div>unknown component {props.component.componentType} </div>
        }
    }

    return select()
}
