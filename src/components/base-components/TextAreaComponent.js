import DefaultComponent from "./DefaultComponent";


export default function TextAreaComponent(props) {
    return <DefaultComponent
        type="textarea"
        id={props.id}
        component={props.component}
        onChanged={props.onChanged}
        defaultValue={""}
    />
}
