import DefaultComponent from "./DefaultComponent";


export default function ToggleComponent(props) {
    return <DefaultComponent
        type="checkbox"
        component={props.component}
        setData={props.setData}
        inputStyle={`col-md-1`}
    />
}
