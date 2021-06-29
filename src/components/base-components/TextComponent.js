import DefaultComponent from "./DefaultComponent";


export default function TextComponent(props) {
    return <DefaultComponent
        type="text"
        id={props.id}
        component={props.component}
        onChanged={props.onChanged}
        defaultValue={""}
    />
}
