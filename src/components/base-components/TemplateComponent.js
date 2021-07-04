import ComponentSelector from "./ComponentSelector";
import {useEffect, useState} from "react";
import templateService from "../../services/template.service";

export default function TemplateComponent(props) {
    const [template, setTemplate] = useState(props.component)

    const getStyle = () => {
        return props.root ? "" : "formBorder"
    }

    const onChanged = (id, value) => {
        setTemplate(old => {
            const newValue = old.value.map(res => {
                if (res.id === id) {
                    return {
                        ...res,
                        value: value
                    }
                }
                return res
            })

            return {
                ...old,
                value: newValue
            }
        })
    }

    useEffect(() => {
        props.onChanged(props.id, template.value)
    }, [template.value])

    useEffect(() => {
        if (template.value) {
            return
        }

        templateService.getById(props.component.componentSubtype)
            .then(response => {
                if (!response || !response.data) {
                    return
                }

                const template = response.data
                setTemplate(old => {
                    return {
                        ...old,
                        value: template.data.value
                    }
                })
            })
    }, [template.data])

    return (

        <div className={`row paddingTopBottom marginTopBottom ${getStyle()}`}>
            <div className={"col-12"}>
                <label className={"largeMarginBottom"}>{template.name}</label>

                <div className={"row"}>
                    {template.value ? template.value.map(comp => {
                        return <div key={comp.id} className={"col-12 align-content-center"}>
                                <ComponentSelector
                                        id={comp.id}
                                        component={comp}
                                        onChanged={onChanged}
                                    />
                            </div>
                        })
                        : ""
                    }
                </div>
            </div>
        </div>
    )
}
