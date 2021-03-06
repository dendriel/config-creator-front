import {Dropdown, DropdownButton} from "react-bootstrap";
import {useEffect, useState} from "react";
import templateService from "../../services/template.service";

export default function ComponentTypeDropdown(props) {
    const defaultOptions = [
        { value: 'number', label: 'Number' },
        { value: 'toggle', label: 'Toggle' },
        { value: 'text', label: 'Text' },
        { value: 'textarea', label: 'Text Area' },
        { value: 'list', label: 'List' },
    ]

    const [options, setOptions] = useState(defaultOptions)
    const [baseOptions, setBaseOptions] = useState(defaultOptions)

    const baseTypes = ['number', 'toggle', 'text', 'textarea', 'list']

    const loadTemplateOptions = () => {
        templateService.getAll(0, 1000)
            .then(response => {
                if (!response || !response.data) {
                    return
                }

                response.data.forEach(t => {
                    setBaseOptions(old => [...old, {value: t.id, label: t.data.name}])
                })
            })
            .catch(() => {
                console.log("Failed to retrieve templates")
            })
    }

    const refreshOptions = () => {
        let newOptions = JSON.parse(JSON.stringify(baseOptions))
        if (props.excludeTypes) {
            newOptions = newOptions.filter(e => !props.excludeTypes.includes(e.value))
        }

        setOptions(newOptions)
    }

    useEffect(() => {
        refreshOptions()
    }, [props.excludeTypes, baseOptions])

    useEffect(() => {
        if (!props.includeTemplates) {
            refreshOptions()
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

        const elem = options.find(e => e.value === type)
        if (elem) {
            return elem.label
        }

        return label
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
