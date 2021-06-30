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
                    <>
                        {props.label ? <label className="marginRight">{props.label}</label> : "" }
                        <ComponentTypeDropdown
                            placeholder="Select Type"
                            selected={props.subtype}
                            onSelected={props.onChanged}
                            excludeTypes={["list"]}
                        />
                    </>
                )
            default:
                return ""
        }
    }

    return (
        hasExtraFields() ? getExtraFields() : ""
    )
}
