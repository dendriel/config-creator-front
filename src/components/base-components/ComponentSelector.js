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
                    key={props.id}
                    id={props.id}
                    component={props.component}
                    onChanged={props.onChanged}
                />
            case "textarea":
                return <TextAreaComponent
                    key={props.id}
                    id={props.id}
                    component={props.component}
                    onChanged={props.onChanged}
                />
            case "number":
                return <NumberComponent
                    key={props.id}
                    id={props.id}
                    component={props.component}
                    onChanged={props.onChanged}
                />
            case "toggle":
                return <ToggleComponent
                    key={props.id}
                    id={props.id}
                    component={props.component}
                    onChanged={props.onChanged}
                />
            case "template":
                return <TemplateComponent
                    key={props.id}
                    component={props.component}
                    setData={props.setData}
                />
            case "list":
                return <ListComponent
                    key={props.id}
                    component={props.component}
                    setData={props.setData}
                />
            default:
                return <div>unknown component {props.component.componentType} </div>
        }
    }

    return select()
}
