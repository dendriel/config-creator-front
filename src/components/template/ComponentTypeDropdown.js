import {Dropdown, DropdownButton} from "react-bootstrap";
import {useEffect, useState} from "react";
import templateService from "../../services/template.service";

export default function ComponentTypeDropdown(props) {
    const [options, setOptions] = useState([
        { value: 'number', label: 'Number' },
        { value: 'toggle', label: 'Toggle' },
        { value: 'text', label: 'Text' },
        { value: 'textarea', label: 'Text Area' },
        { value: 'list', label: 'List' },
    ])

    const baseTypes = ['number', 'toggle', 'text', 'textarea', 'list']

    const loadTemplateOptions = () => {
        templateService.getAll(0, 10)
            .then(response => {
                if (!response || !response.data) {
                    console.log("Failed to retrieve templates. Response is null or empty")
                    return
                }

                response.data.forEach(t => {
                    setOptions(old => [...old, {value: t.id, label: t.data.name}])
                })
            })
            .catch(() => {
                console.log("Failed to retrieve templates")
            })
    }

    useEffect(() => {
        if (props.excludeTypes) {
            setOptions(old => old.filter(e => !props.excludeTypes.includes(e.value)))
        }

        if (!props.includeTemplates) {
            return
        }

        loadTemplateOptions()

    }, [props.includeTemplates])

    const isBaseType = (e) => {
        return baseTypes.includes(e)
    }

    const onSelect = (e) => {
        if (props.includeTemplates) {
            const isTemplate = !isBaseType(e)
            props.onSelected(e, isTemplate)
        }
        else {
            props.onSelected(e)
        }
    }

    const getTitle = (type, label) => {
        if (!type) {
            return label
        }

        return options.find(e => e.value === type).label
    }

    return (
        <DropdownButton className={`float-left marginRight`} variant="secondary" title={getTitle(props.selected, props.placeholder)} onSelect={onSelect}>
            <Dropdown.ItemText><i>Components</i></Dropdown.ItemText>
            {options.map(o =>
                <Dropdown.Item key={o.value} eventKey={o.value}>
                    {o.label}
                </Dropdown.Item>
            )}
        </DropdownButton>
    )
}
