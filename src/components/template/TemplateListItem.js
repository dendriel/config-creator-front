import styles from "../list.module.css";
import {Button, ListGroup, Overlay} from "react-bootstrap";
import {BsTrashFill} from "react-icons/all";
import {useRef, useState} from "react";

export default function TemplateListItem(props) {
    const removeButtonTarget = useRef(null)
    const [toRemove, setToRemove] = useState(false)

    const [removing, setRemoving] = useState(false)

    const onRemove = (id) => {
        if (!toRemove) {
            setToRemove(true)
            setTimeout(() => {setToRemove(false); }, 1000);
            return;
        }

        console.log("Remove")
        props.removeTemplate(id, setRemoving)
        setRemoving(true)
    }

    return (
        <ListGroup.Item className="col-md-6 text-center align-middle form-inline" key={props.id}>
            <div className="container">
                <div className="row">
                    <div className={`col-md-8 ${styles.columns} float-left`}>
                        {props.name}
                    </div >
                    <div className="col-md-4 form-group">
                        <button className={`btn btn-outline-info ${styles.button}`} onClick={() => props.showEditTemplate(props.id)}>
                            Edit
                        </button>
                        <Button className="float-right" ref={removeButtonTarget} variant="danger" onClick={() => onRemove(props.id)} disabled={removing}>
                            {removing ?
                                <span className="spinner-border spinner-border-sm" />
                                :
                                <BsTrashFill className="buttonIcon"/>
                            }

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
                    </div >
                </div>
            </div>
        </ListGroup.Item>
    )
}
