import {useRef, useState} from "react";
import {Button, ListGroup} from "react-bootstrap";
import styles from "../list.module.css";
import {AiOutlineRedo, BsBraces, BsDownload, BsPencilSquare, BsTrashFill} from "react-icons/all";
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

    const getDownloadActive = () => {
        return !props.data || (props.data.downloadActive !== undefined && props.data.downloadActive)
    }

    const getRemoveActive = () => {
        return !props.data || (props.data.removeActive !== undefined && props.data.removeActive)
    }

    const getRetryActive = () => {
        return !props.data || (props.data.retryActive !== undefined && props.data.retryActive)
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

                    {(props.onDownload || props.onEdit || props.onDefault || props.onRemove || props.onRetry) ?
                        <div className={`col text-right`}>
                            {props.onDownload ?
                                <Button
                                    className={`marginRight`}
                                    variant={getDownloadActive() ? "info" : "secondary"}
                                    onClick={() => props.onDownload(props.data.targetId)}
                                    disabled={!getDownloadActive()}
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
                                    <BsBraces className="buttonIcon" />
                                </Button>
                                : ""
                            }
                            {props.onRetry ?
                                <Button
                                    className={`marginRight`}
                                    variant={getRetryActive() ? "warning" : "secondary"}
                                    onClick={() => props.onRetry(props.id)}
                                    disabled={!getRetryActive()}
                                >
                                    <AiOutlineRedo className="buttonIcon" />
                                </Button>
                                : ""
                            }
                            {props.onRemove ?
                                <>
                                    <Button
                                        ref={removeButtonTarget}
                                        variant={ getRemoveActive() ? "danger" : "secondary" }
                                        onClick={() => onRemove(props.id)}
                                        disabled={ !getRemoveActive() || removing}
                                    >
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
