import {ToggleButton, ToggleButtonGroup} from "react-bootstrap";

export default function ResourceTypeSelect(props) {
    const resourceTypes = [
        { name: 'Item', value: 'item', variant: 'outline-success' },
        { name: 'Collection', value: 'collection', variant: 'outline-info' }
    ];

    return (
        <ToggleButtonGroup type="radio" name="trade" value={props.type}  onChange={props.onSelected}>
            {resourceTypes.map((radio) => (
                <ToggleButton key={radio.value} value={radio.value} variant={radio.variant}>
                    {radio.name}
                </ToggleButton>
            ))}
        </ToggleButtonGroup>
    )
}
