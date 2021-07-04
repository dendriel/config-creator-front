import ComponentSelector from "./ComponentSelector";
import {Button} from "react-bootstrap";
import { v4 as uuidv4 } from 'uuid';
import ListItemController from "../components/ListItemController";

export default function ListComponent(props) {
    if (props.component.value === undefined || props.component.value === null) {
        props.component.value = []
    }

    const addItem = () => {
        const componentSubtype = props.component.templateId ? props.component.templateId : ""

        const comp = {
            id: uuidv4(),
            data: {
                name: props.component.value.length + ":",
                type: "item",
                componentType: props.component.componentSubtype,
                componentSubtype: componentSubtype
            }
        }

        const newValue = props.component.value.concat(comp)

        props.onChanged(props.id, newValue)
    }

    const onChanged = (id, value) => {
        const newData = props.component.value.map(item => {
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

        props.onChanged(props.id, newData)
    }

    const onMoveItem = (sourceIndex, pos) => {
        const destnIndex = sourceIndex + pos;

        let newData = [...props.component.value]

        const temp = newData[destnIndex]
        newData[destnIndex] = newData[sourceIndex];
        newData[sourceIndex] = temp;

        newData[destnIndex].data.name = destnIndex
        newData[sourceIndex].data.name = sourceIndex

        props.onChanged(props.id, newData)
    }

    const onRemoveItem = (id) => {
        const newData = props.component.value.filter(comp => comp.id !== id)
        props.onChanged(props.id, newData)
    }

    return (
        <div className="row paddingTopBottom marginTopBottom formBorder">
            <div className={"col-12"}>
                <label className={"largeMarginBottom"}>{props.component.name}</label>

                <div className={"row"}>
                    {props.component.value.map((comp, idx) => {
                        comp.data.name = idx
                        return (
                            <div key={comp.id} className={"col-12"}>
                                <div className={"container"}>
                                     <div className={"row"}>
                                        <div className={"col-10"}>
                                            <ComponentSelector
                                                key={comp.id}
                                                id={comp.id}
                                                component={comp.data}
                                                onChanged={onChanged}
                                            />
                                        </div>
                                        <div className="col-2 text-left marginBottom">
                                            <ListItemController
                                                id={comp.id}
                                                saving={false}
                                                list={props.component.value}
                                                move={onMoveItem}
                                                remove={onRemoveItem}
                                            />
                                        </div>
                                     </div>
                                </div>
                            </div>)
                    })}
                </div>
            </div>
            <div className={`col-10 text-right`}>
                <Button variant="info" onClick={addItem} >
                    Add
                </Button>
            </div>
        </div>
    )
}
