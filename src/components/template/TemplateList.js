import styles from "../list.module.css";
import TemplateListItem from "./TemplateListItem";
import {ListGroup} from "react-bootstrap";


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
                <TemplateListItem
                    key={template.id}
                    id={template.id}
                    name={template.data.name}
                    showEditTemplate={props.showEditTemplate}
                    removeTemplate={props.removeTemplate}
                />
                )
            )}
        </ListGroup>
    )
}
