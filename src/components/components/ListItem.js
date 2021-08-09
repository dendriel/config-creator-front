import {useRef, useState} from "react";
import {Button, ListGroup} from "react-bootstrap";
import styles from "../list.module.css";
import {BsBraces, BsDownload, BsPencilSquare, BsTrashFill} from "react-icons/all";
import CustomOverlay from "./CustomOverlay";
import { v4 as uuidv4 } from 'uuid';


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
        <ListGroup.Item key={props.id} className="col">
            <div className="container">
                <div className="row">

                    {props.cols.map(value => {
                        return (
                            <div key={uuidv4()} className={`col ${styles.columns} text-center`}>
                                {value}
                            </div >
                        )
                    })}

                    {(props.onDownload || props.onEdit || props.onDefault || props.onRemove) ?
                        <div className={`col text-right`}>
                            {props.onDownload ?
                                <Button
                                    className={`marginRight`}
                                    variant={props.data.active ? "info" : "secondary"}
                                    onClick={() => props.onDownload(props.data.targetId)}
                                    disabled={!props.data.active}
                                >
                                    <BsDownload className="buttonIcon" />
                                </Button>
                                : ""
                            }
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
