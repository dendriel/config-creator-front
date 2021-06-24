import {Dropdown, DropdownButton} from "react-bootstrap";
import {useState} from "react";


export default function ComponentTypeDropdown(props) {
    const [selected, setSelected] = useState(props.selected)

    // Get from backend
    const options = [
        { value: 'number', label: 'Number' },
        { value: 'toggle', label: 'Toggle' },
        { value: 'text', label: 'Text' },
        { value: 'textarea', label: 'Text Area' },
        { value: 'list', label: 'List' },
    ]

    const onSelect = (e) => {
        setSelected(e)
        props.onSelected(e)
        // setData(old => {
        //     return {
        //         ...old,
        //         type: e
        //     }
        // })

        // props.setData(oldData => {
        //     oldData.value = oldData.value.map(comp => {
        //         if (comp.key !== props.component.key) {
        //             return comp;
        //         }
        //
        //         return {
        //             ...comp,
        //             type: e
        //         }
        //     })
        //     return oldData
        // })
    }

    const getTitle = (type, label) => {
        if (!type) {
            return label
        }

        return options.find(e => e.value === type).label
    }

    return (
        <DropdownButton className={`float-left marginRight`} variant="secondary" title={getTitle(selected, props.placeholder)} onSelect={onSelect}>
            <Dropdown.ItemText><i>Components</i></Dropdown.ItemText>
            {options.map(o =>
                <Dropdown.Item key={o.value} eventKey={o.value}>
                    {o.label}
                </Dropdown.Item>
            )}
        </DropdownButton>
    )
}
