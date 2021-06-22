import {ListGroup} from "react-bootstrap";
import styles from "../list.module.css";


export default function TemplateList(props) {
    return (
        <ListGroup className={`col-md-12 ${styles.dirsTableList}`}>

            <ListGroup.Item className="col-md-6 text-center align-middle">
                <div className={`col-md-6 form-group ${styles.columns} float-left`}>
                    <b>Name</b>
                </div >
                <div className="col-md-6 form-group float-left">
                </div >
            </ListGroup.Item>

            {props.templates.map(template => (
                    <ListGroup.Item className="col-md-6 text-center align-middle form-inline" key={template.id}>
                        <div className={`col-md-6 form-group ${styles.columns} float-left`}>
                            {template.data.name}
                        </div >
                        <div className="col-md-6 form-group">
                            <button className={`btn btn-outline-info ${styles.button}`} onClick={() => props.showEditTemplate(template.id)}>
                                Edit
                            </button>
                        </div >
                    </ListGroup.Item>
                )
            )}
        </ListGroup>
    )
}
