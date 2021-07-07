import ComponentTypeDropdown from "./ComponentTypeDropdown";


export default function ComponentTypeDropdownExtraFields(props) {
    const baseTypes = ['number', 'toggle', 'text', 'textarea', 'list']

    const hasExtraFields = () => {
        if (!props.type) {
            return ""
        }

        return props.type === "list";
    }

    const isBaseType = (e) => {
        return baseTypes.includes(e)
    }

    const onChanged = (e) => {
        if (props.includeTemplates) {
            const isTemplate = !isBaseType(e)
            props.onChanged(e, isTemplate)
        }
        else {
            props.onChanged(e)
        }
    }

    const getExtraFields = () => {
        if (!props.type) {
            return ""
        }

        switch (props.type) {
            case "list":
                return (
                    <div className={"container"}>
                        <div className={"row " + props.style}>
                            {props.label ? <label className="col-form-label marginRight">{props.label}</label> : "" }
                            <ComponentTypeDropdown
                                placeholder="Select Type"
                                selected={props.subtype}
                                onSelected={onChanged}
                                excludeTypes={["list"]}
                                includeTemplates={props.includeTemplates !== undefined ? props.includeTemplates : true}
                            />
                        </div>
                    </div>
                )
            default:
                return ""
        }
    }

    return (
        hasExtraFields() ? getExtraFields() : ""
    )
}
