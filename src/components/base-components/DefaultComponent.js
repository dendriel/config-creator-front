import {useState} from "react";

export default function DefaultComponent(props) {
    const [value, setValue] = useState(props.component.value)

    const onChange = (e) => {
        const newValue = props.component.type === "toggle" ? e.target.checked : e.target.value
        setValue(newValue);

        props.setData(data => {
            data.value = data.value.map(comp => {
                if (comp.key !== props.component.key) {
                    return comp;
                }

                return {
                    ...comp,
                    value: newValue
                }
            })
            return data
        })
    }

    return (
        <div className="form-group row">
            <label className="col-md-2 col-form-label text-right">
                {props.component.name}
            </label>
            <div className="col-md-8 float-left">
                <input
                    type={props.type}
                    className={`form-control ${props.inputStyle}`}
                    onChange={onChange}
                    value={value}
                    checked={value}
                />
            </div>
        </div>
    )
}
