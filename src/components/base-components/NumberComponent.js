import DefaultComponent from "./DefaultComponent";


export default function NumberComponent(props) {
    return <DefaultComponent
        type="number"
        id={props.id}
        component={props.component}
        onChanged={props.onChanged}
        defaultValue={0}
    />
}
