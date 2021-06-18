import {useState} from "react";


export default function TextAreaComponent(props) {
    const [value, setValue] = useState(props.component.value)

    const onChange = (e) => {
        const newValue = props.component.type === "toggle" ? e.target.checked : e.target.value
        setValue(newValue);

        props.setData(data => {
            data.components = data.components.map(comp => {
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
            <label className="col-md-2 col-form-label text-sm-right">
                {props.component.name}
            </label>
            <div className="col-md-8 float-left">
                <textarea
                    rows={props.component.rows}
                    className={`form-control`}
                    onChange={onChange}
                    value={value}
                />
            </div>
        </div>
    )
}