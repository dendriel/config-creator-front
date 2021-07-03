import ComponentTypeDropdown from "./ComponentTypeDropdown";


export default function ComponentTypeDropdownExtraFields(props) {
    const hasExtraFields = () => {
        if (!props.type) {
            return ""
        }

        return props.type === "list";
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
                                onSelected={props.onChanged}
                                excludeTypes={["list"]}
                                includeTemplates={true}
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
