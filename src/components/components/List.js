import {ListGroup} from "react-bootstrap";
import styles from "../list.module.css";
import ListItem from "./ListItem";


export default function List(props) {
    return (
        <ListGroup className={`col-12 ${styles.dirsTableList}`}>
            <ListGroup.Item className="col-6">
                <div className="container">
                    <div className="row">
                        {props.header.map(item => {
                            return (
                                <div className={`col ${styles.columns} text-center`}>
                                    <b>{item}</b>
                                </div >
                            )
                            })
                        }
                        {(props.onEdit || props.onDefault || props.onRemove) ?
                            <div className={`col ${styles.columns} text-center`}>
                            </div >
                            :
                            ""
                        }
                    </div>
                </div>
            </ListGroup.Item>

            {props.rows.map(row => (
                    <ListItem
                        key={row.id}
                        id={row.id}
                        cols={row.cols}
                        onEdit={props.onEdit}
                        onDefault={props.onDefault}
                        onRemove={props.onRemove}
                    />
                )
            )}
        </ListGroup>
    )
}
