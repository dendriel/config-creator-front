import {useState} from "react";
import {DropdownButton, Dropdown, ButtonGroup, Button} from "react-bootstrap";
import styles from "./SelectComponent.module.css"


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

    const getExtraFields = () => {
        if (!data.type) {
            return ""
        }

        switch (data.type) {
            case "list":
                return (
                    // TODO: componentizar
                    <>
                        <label className={styles.paddingRight}>Type: </label>
                        <DropdownButton className={`float-left ${styles.paddingRight}`} variant="secondary" title={getTitle(data.subtype, "Select Type")} onSelect={onSelectSubtype}>
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
            <div>
                <DropdownButton className={`float-left ${styles.paddingRight}`} variant="secondary" title={getTitle(data.type,"Select Component")} onSelect={onSelect}>
                    <Dropdown.ItemText><i>Components</i></Dropdown.ItemText>
                    {options.map(o =>
                        <Dropdown.Item key={o.value} eventKey={o.value}>
                            {o.label}
                        </Dropdown.Item>
                    )}
                </DropdownButton>
                <div className={`float-left form-inline ${styles.paddingRight}`}>
                    <label className={`col-form-label ${styles.paddingRight}`}>Name:</label>
                    <input className="form-control" type="text" value={data.name} onChange={updateName}/>
                </div>
                <div className={`form-inline ${styles.paddingRight}`}>
                    {getExtraFields()}
                </div>
            </div>
            <ButtonGroup>
                <Button variant="secondary" onClick={() => move(1)} disabled={isLastElement()}>\/</Button>
                <Button variant="secondary" onClick={() => move(-1)} disabled={isFirstElement()}>/\</Button>
            </ButtonGroup>
        </div>
    )
}
