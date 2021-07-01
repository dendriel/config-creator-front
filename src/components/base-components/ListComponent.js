import {useState} from "react";
import ComponentSelector from "./ComponentSelector";
import {Button} from "react-bootstrap";
import { v4 as uuidv4 } from 'uuid';
import ListItemController from "../components/ListItemController";

export default function ListComponent(props) {
    if (props.component.value === undefined || props.component.value === null) {
        props.component.value = []
    }

    const [data, setData] = useState(props.component.value)

    const addItem = () => {
        const comp = {
            id: uuidv4(),
            data: {
                name: "item",
                type: "item",
                componentType: props.component.componentSubtype,
                componentSubtype: ""
            }
        }

        const newValue = data.concat(comp)
        setData(newValue)

        props.onChanged(props.id, newValue)
    }

    const onChanged = (id, value) => {
        const newData = data.map(item => {
            if (item.id !== id) {
                return item
            }

            const newItemData = item.data
            newItemData.value = value
            return {
                ...item,
                data: newItemData
            }
        })

        setData(newData)
        props.onChanged(props.id, newData)
    }

    const onMoveItem = (sourceIndex, pos) => {
        const destnIndex = sourceIndex + pos;

        let newData = [...data]

        const temp = newData[destnIndex]
        newData[destnIndex] = newData[sourceIndex];
        newData[sourceIndex] = temp;

        setData(newData)
        props.onChanged(props.id, newData)
    }

    const onRemoveItem = (id) => {
        const newData = data.filter(comp => comp.id !== id)
        setData(newData)
        props.onChanged(props.id, newData)
    }

    return (
        <div className="row border border-secondary rounded paddingTopBottom marginTopBottom">
            <div className={`col`}>
                <label>{props.component.name}</label>
                {data.map(comp => {
                    return (<>
                        <ComponentSelector
                            key={comp.id}
                            id={comp.id}
                            component={comp.data}
                            onChanged={onChanged}
                        />
                        <div className="col-3 text-right marginBottom">
                            <ListItemController
                                id={comp.id}
                                saving={false}
                                list={data}
                                move={onMoveItem}
                                remove={onRemoveItem}
                            />
                        </div>
                    </>)
                })}
            </div>
            <div className={`col-12 text-center marginTopBottom`}>
                <Button variant="info" onClick={addItem} >
                    Add
                </Button>
            </div>
        </div>
    )
}
