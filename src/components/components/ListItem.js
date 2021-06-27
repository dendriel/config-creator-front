import {useRef, useState} from "react";
import {Button, ListGroup} from "react-bootstrap";
import styles from "../list.module.css";
import {BsBraces, BsPencilSquare, BsTrashFill} from "react-icons/all";
import CustomOverlay from "./CustomOverlay";


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
                            <div className={`col ${styles.columns} text-center`} key={value}>
                                {value}
                            </div >
                        )
                    })}

                    {(props.onEdit || props.onDefault || props.onRemove) ?
                        <div className={`col text-right`}>
                            {props.onEdit ?
                                <Button className={`marginRight`} variant="info" onClick={() => props.onEdit(props.id)}>
                                    <BsPencilSquare className="buttonIcon" />
                                </Button>
                                : ""
                            }
                            {props.onDefault ?
                                <Button className={`marginRight`} variant="info" onClick={() => props.onDefault(props.id)}>
                                    <BsBraces
                                        className="buttonIcon" />
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
                                    <CustomOverlay
                                        target={removeButtonTarget}
                                        visible={toRemove}
                                        message={"Double Click to remove"}
                                        variant={"danger"}
                                    />
                                </>
                                : ""
                            }
                        </div>
                        : ""
                    }

                </div>
            </div>
        </ListGroup.Item>
    )
}
