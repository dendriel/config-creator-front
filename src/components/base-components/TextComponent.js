import DefaultComponent from "./DefaultComponent";


export default function TextComponent(props) {
    return <DefaultComponent
        type="text"
        component={props.component}
        setData={props.setData}
    />
}
