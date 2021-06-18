import DefaultComponent from "./DefaultComponent";


export default function NumberComponent(props) {
    return <DefaultComponent
        type="number"
        component={props.component}
        setData={props.setData}
    />
}
