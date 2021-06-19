import {useState} from "react";
import {ButtonGroup, Button} from "react-bootstrap";
import {BsFillCaretDownFill, BsFillCaretUpFill} from "react-icons/all";
import ComponentTypeDropdown from "./ComponentTypeDropdown";


export default function SelectComponent(props) {
    const [data, setData] = useState(props.component)

    const onDataUpdated = (key, value) => {
        setData(old => {
            return {
                ...old,
                [key]: value
            }
        })

        props.setData(oldData => {
            oldData.value = oldData.value.map(comp => {
                if (comp.key !== props.component.key) {
                    return comp;
                }

                return {
                    ...comp,
                    [key]: value
                }
            })
            return oldData
        })
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

        props.setData(oldData => {
            let val = [...oldData.value]

            const temp = val[destnIndex]
            val[destnIndex] = val[sourceIndex];
            val[sourceIndex] = temp;
            return {
                ...oldData,
                value: val
            }
        })
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
                        <ButtonGroup className="float-right">
                            <Button variant="secondary" onClick={() => move(-1)} disabled={isFirstElement()}><BsFillCaretUpFill /></Button>
                            <Button variant="secondary" onClick={() => move(1)} disabled={isLastElement()}><BsFillCaretDownFill /></Button>
                        </ButtonGroup>
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
