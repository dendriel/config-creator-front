import ComponentSelector from "../base-components/ComponentSelector";
import {useEffect, useState} from "react";
import {v4 as uuidv4} from "uuid";


export default function CollectionItemCreator(props) {
    const [item, setItem] = useState(props.item)

    useEffect(() => {
        if (item) {
            return
        }

        let targetItem = {
            id: uuidv4(),
            data: {
                name: props.name,
                componentType: 'template',
                componentSubtype: props.templateId
            }
        }

        setItem(targetItem)
        props.onItemCreated(targetItem)
    }, [item])

    const onChanged = (id, value) => {
        props.onChanged(id, value)
    }

    return (
        <>
            {item ?
                <ComponentSelector
                    key={item.id}
                    id={item.id}
                    component={item.data}
                    onChanged={onChanged}
                />
                : ""
            }
        </>

    )
}
