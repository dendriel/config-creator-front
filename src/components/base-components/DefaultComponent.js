import {useState} from "react";

export default function DefaultComponent(props) {
    if (props.component.value === undefined || props.component.value === null) {
        props.component.value = props.defaultValue
    }

    const [value, setValue] = useState(props.component.value)

    const onChanged = (e) => {
        let newValue = e.target.value
        if (props.type === "checkbox") {
            newValue = e.target.checked
        }
        else if (props.type === "number") {
            newValue = parseInt(newValue, 10)
        }

        setValue(newValue);

        props.onChanged(props.id, newValue)
    }

    const getComponent = () => {
        if (props.type === "textarea") {
            return (
                <textarea
                    rows={props.component.rows}
                    className={`form-control`}
                    onChange={onChanged}
                    value={value}
                />
            )
        }

        return (
            <input
                type={props.type}
                className={`form-control ${props.inputStyle}`}
                onChange={onChanged}
                value={value}
                checked={value}
            />
        )
    }

    return (
        <div className="form-group row">
            <label className="col-1 col-form-label text-right">
                {props.component.name}
            </label>
            <div className="col float-left">
                {getComponent()}
            </div>
        </div>
    )
}
