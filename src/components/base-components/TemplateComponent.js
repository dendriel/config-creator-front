import ComponentSelector from "./ComponentSelector";
import {useEffect, useState} from "react";
import templateService from "../../services/template.service";

export default function TemplateComponent(props) {
    const [template, setTemplate] = useState(JSON.parse(JSON.stringify(props.component)))

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

    const setTemplateValue = (newValue) => {
        setTemplate(old => {
            return {
                ...old,
                value: newValue
            }
        })
    }

    const isCompatibleTypes = (from, to) => {
        if (from.componentType === 'list' && to.componentType === 'list') {
            return from.componentSubtype === to.componentSubtype
        }

        if (from.componentType === 'text' && to.componentType === 'textarea') {
            return true
        }

        return from.componentType === to.componentType
    }

    const mapComponentValue = (from, to) => {
        switch (to.componentType) {
            default:
                if (from.value && isCompatibleTypes(from, to)) {
                    to.value = from.value
                }
                else {
                    to.value = null
                }
        }
    }

    const updateTemplateValue = (baseValue) => {
        if (!template.value) {
            return baseValue
        }

        return baseValue.map(to => {
            const from = template.value.find(curr => curr.id === to.id)
            if (from) {
                mapComponentValue(from, to)
            }
            return to;
        })
    }

    const loadTemplate = () => {
        templateService.getById(props.component.componentSubtype)
            .then(response => {
                if (!response || !response.data) {
                    return
                }

                const template = response.data
                const value = updateTemplateValue(template.data.value)
                setTemplateValue(value)
            })
    }

    useEffect(() => {
        props.onChanged(props.id, template.value)
    }, [template.value])

    useEffect(() => {
        loadTemplate()

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
