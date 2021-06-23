import {useRef, useState} from "react";
import {ButtonGroup, Button, Overlay} from "react-bootstrap";
import {BsFillCaretDownFill, BsFillCaretUpFill, BsTrashFill} from "react-icons/all";
import ComponentTypeDropdown from "./ComponentTypeDropdown";


export default function SelectComponent(props) {
    const [data, setData] = useState(props.component)
    const [toRemove, setToRemove] = useState(false)
    const removeButtonTarget = useRef(null)

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

    const hasExtraFields = () => {
        if (!data.type) {
            return ""
        }

        return data.type === "list";
    }

    const getExtraFields = () => {
        if (!data.type) {
            return ""
        }

        switch (data.type) {
            case "list":
                return (
                    <>
                        <label className="paddingRight">Type: </label>
                        <ComponentTypeDropdown
                            placeholder="Select Type"
                            selected={data.subtype}
                            onSelected={(value) => onDataUpdated("subtype", value)}
                        />
                    </>
                )
            default:
                return ""
        }
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
                    <div className="col-8">
                        <div className={`float-left form-inline paddingRight`}>
                            <label className={`col-form-label paddingRight`}>Name:</label>
                            <input className="form-control" type="text" value={data.name} onChange={(e) => onDataUpdated("name", e.target.value)}/>
                        </div>
                    </div>
                    <div className="col-2">
                        <ButtonGroup>
                            <Button className="buttonIcon" variant="secondary" onClick={() => move(-1)} disabled={isFirstElement()}><BsFillCaretUpFill /></Button>
                            <Button className="buttonIcon" variant="secondary" onClick={() => move(1)} disabled={isLastElement()}><BsFillCaretDownFill /></Button>
                        </ButtonGroup>
                        <>
                            <Button className="float-right" ref={removeButtonTarget} variant="danger" onClick={onRemove}>
                                <BsTrashFill className="buttonIcon"/>
                            </Button>
                            <Overlay target={removeButtonTarget.current} show={toRemove} placement="right">
                                {({ placement, arrowProps, show: _show, popper, ...props }) => (
                                    <div
                                        {...props}
                                        style={{
                                            backgroundColor: 'rgba(255, 100, 100, 0.85)',
                                            padding: '2px 10px',
                                            color: 'white',
                                            borderRadius: 3,
                                            ...props.style,
                                        }}
                                    >
                                        Double Click to remove
                                    </div>
                                )}
                            </Overlay>
                        </>
                    </div>
                </div>
                {
                    hasExtraFields() ?
                        <div className={`row justify-content-start paddingTop`}>
                            <div className="col-10">
                                <div className={`form-inline paddingRight`}>
                                    {getExtraFields()}
                                </div>
                            </div>
                        </div>
                        :
                        ""
                }
            </div>
        </div>
    )
}
