import DefaultComponent from "./DefaultComponent";


export default function ToggleComponent(props) {
    return <DefaultComponent
        type="checkbox"
        id={props.id}
        component={props.component}
        onChanged={props.onChanged}
        defaultValue={false}
        inputStyle={`col-md-1`}
    />
}
