import {useRef, useState} from "react";
import {Button, ListGroup, Overlay} from "react-bootstrap";
import styles from "../list.module.css";
import {BsPencilSquare, BsTrashFill} from "react-icons/all";


export default function ListItem(props) {
    const removeButtonTarget = useRef(null)
    const [toRemove, setToRemove] = useState(false)

    const [removing, setRemoving] = useState(false)

    const onRemove = (id) => {
        if (!toRemove) {
            setToRemove(true)
            setTimeout(() => {setToRemove(false); }, 1000);
            return;
        }

        props.onRemove(id, setRemoving)
        setRemoving(true)
    }

    return (
        <ListGroup.Item className="col-6" key={props.id}>
            <div className="container">
                <div className="row">

                    {props.cols.map(value => {
                        return (
                            <div className={`col ${styles.columns} text-center`}>
                                {value}
                            </div >
                        )
                    })}

                    {(props.onEdit || props.onRemove) ?
                        <div className={`col text-right`}>
                            {props.onEdit ?
                                <Button className={`marginRight`} variant="info" onClick={() => props.onEdit(props.id)}>
                                    <BsPencilSquare className="buttonIcon" />
                                </Button>
                                : ""
                            }
                            {props.onRemove ?
                                <>
                                <Button ref={removeButtonTarget} variant="danger" onClick={() => onRemove(props.id)} disabled={removing}>
                                    {removing ?
                                        <span className="spinner-border spinner-border-sm" />
                                        :
                                        <BsTrashFill className="buttonIcon "/>
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
                                </>
                                : ""
                            }

                        </div>
                        :
                        ""
                    }

                </div>
            </div>
        </ListGroup.Item>
    )
}
