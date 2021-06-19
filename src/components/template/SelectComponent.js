import {useState} from "react";
import {DropdownButton, Dropdown, ButtonGroup, Button} from "react-bootstrap";
import {BsFillCaretDownFill, BsFillCaretUpFill} from "react-icons/all";


export default function SelectComponent(props) {
    const [data, setData] = useState(props.component)

    const options = [
        { value: 'number', label: 'Number' },
        { value: 'toggle', label: 'Toggle' },
        { value: 'text', label: 'Text' },
        { value: 'textarea', label: 'Text Area' },
        { value: 'list', label: 'List' },
    ]

    const onSelect = (e) => {
        setData(old => {
            return {
                ...old,
                type: e
            }
        })

        props.setData(oldData => {
            oldData.value = oldData.value.map(comp => {
                if (comp.key !== props.component.key) {
                    return comp;
                }

                return {
                    ...comp,
                    type: e
                }
            })
            return oldData
        })
    }


    const onSelectSubtype = (e) => {
        setData(old => {
            return {
                ...old,
                subtype: e
            }
        })

        props.setData(oldData => {
            oldData.value = oldData.value.map(comp => {
                if (comp.key !== props.component.key) {
                    return comp;
                }

                return {
                    ...comp,
                    subtype: e
                }
            })
            return oldData
        })
    }

    const updateName = (e) => {
        setData(old => {
            return {
                ...old,
                name: e.target.value
            }
        })
        props.setData(oldData => {
            oldData.value = oldData.value.map(comp => {
                if (comp.key !== props.component.key) {
                    return comp;
                }

                console.log("Found")
                return {
                    ...comp,
                    name: e.target.value
                }
            })
            return oldData
        })
    }

    const getTitle = (type, label) => {
        if (!type) {
            return label
        }

        return options.find(e => e.value === type).label
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
                    // TODO: componentizar
                    <>
                        <label className="paddingRight">Type: </label>
                        <DropdownButton className={`float-left paddingRight`} variant="secondary" title={getTitle(data.subtype, "Select Type")} onSelect={onSelectSubtype}>
                            <Dropdown.ItemText><i>Components</i></Dropdown.ItemText>
                            {options.map(o =>
                                <Dropdown.Item key={o.value} eventKey={o.value}>
                                    {o.label}
                                </Dropdown.Item>
                            )}
                        </DropdownButton>
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
                        <DropdownButton className={`float-left paddingRight`} variant="secondary" title={getTitle(data.type,"Select")} onSelect={onSelect}>
                            <Dropdown.ItemText><i>Components</i></Dropdown.ItemText>
                            {options.map(o =>
                                <Dropdown.Item key={o.value} eventKey={o.value}>
                                    {o.label}
                                </Dropdown.Item>
                            )}
                        </DropdownButton>
                    </div>
                    <div className="col-8">
                        <div className={`float-left form-inline paddingRight`}>
                            <label className={`col-form-label paddingRight`}>Name:</label>
                            <input className="form-control" type="text" value={data.name} onChange={updateName}/>
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
