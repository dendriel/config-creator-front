import {useRef, useState} from "react";
import {ButtonGroup, Button} from "react-bootstrap";
import {BsFillCaretDownFill, BsFillCaretUpFill, BsTrashFill} from "react-icons/all";
import ComponentTypeDropdown from "./ComponentTypeDropdown";
import ComponentTypeDropdownExtraFields from "./ComponentTypeDropdownExtraFields";
import CustomOverlay from "../components/CustomOverlay";


export default function SelectComponent(props) {
    const [data, setData] = useState(props.component)
    const [toRemove, setToRemove] = useState(false)
    const removeButtonTarget = useRef(null)

    const onComponentSubtypeChanged = (value) => {
        onDataUpdated('subtype', value)
    }

    const onDataUpdated = (key, value) => {
        setData(old => {
            return {
                ...old,
                [key]: value
            }
        })

        props.data.value = props.data.value.map(comp => {
            if (comp.key !== props.component.key) {
                return comp;
            }

            return {
                ...comp,
                [key]: value
            }
        })

        props.setData(props.data)
    }

    const onRemove = () => {
        if (!toRemove) {
            setToRemove(true)
            setTimeout(() => {setToRemove(false); }, 1000);
            return;
        }

        console.log("Remove")
        props.remove(data.key)
    }

    const findIndex = () => {
        return props.data.value.findIndex(e => e.key === data.key)
    }

    const isLastElement = () => {
        const index = findIndex()
        return (index+1) === props.data.value.length
    }

    const isFirstElement = () => {
        const index = findIndex()
        return index === 0;
    }

    const move = (pos) => {
        const sourceIndex = findIndex();
        const destnIndex = sourceIndex + pos;

        let val = [...props.data.value]

        const temp = val[destnIndex]
        val[destnIndex] = val[sourceIndex];
        val[sourceIndex] = temp;
        props.data.value = val

        props.setData(props.data)
    }

    return(
        <div className="row justify-content-center">
            <div className={`col-10  border border-secondary rounded paddingTopBottom`}>
                <div className="row justify-content-center">
                    <div className="col-2">
                        <ComponentTypeDropdown
                            placeholder="Select"
                            selected={data.type}
                            onSelected={(value) => onDataUpdated("type", value)}
                        />
                    </div>
                    <div className="col-7">
                        <div className={`float-left form-inline marginRight`}>
                            <label className={`col-form-label marginRight`}>Name:</label>
                            <input className="form-control" type="text" value={data.name} onChange={(e) => onDataUpdated("name", e.target.value)}/>
                        </div>
                    </div>
                    <div className="col-3 text-right">
                        <ButtonGroup>
                            <Button className="buttonIcon" variant="secondary" onClick={() => move(-1)} disabled={isFirstElement()}><BsFillCaretUpFill /></Button>
                            <Button className="buttonIcon" variant="secondary" onClick={() => move(1)} disabled={isLastElement()}><BsFillCaretDownFill /></Button>
                        </ButtonGroup>
                        <>
                            <Button className="marginLeft" ref={removeButtonTarget} variant="danger" onClick={onRemove} disabled={props.saving}>
                                <BsTrashFill className="buttonIcon"/>
                            </Button>
                            <CustomOverlay
                                target={removeButtonTarget}
                                visible={toRemove}
                                message={"Double Click to remove"}
                                variant={"danger"}
                            />
                        </>
                    </div>
                </div>
                <div className={`row justify-content-start marginTop`}>
                    <div className="col-10">
                        <div className={`form-inline marginRight`}>
                            <ComponentTypeDropdownExtraFields
                                subtype={data.subtype}
                                type={data.type}
                                onChanged={onComponentSubtypeChanged}
                                label="Type: "
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
