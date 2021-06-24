import styles from "../list.module.css";
import TemplateListItem from "./TemplateListItem";
import {ListGroup} from "react-bootstrap";


export default function TemplateList(props) {
    return (
        <ListGroup className={`col-12 ${styles.dirsTableList}`}>
            <ListGroup.Item className="col-6">
                <div className="container">
                    <div className="row">
                <div className={`col-8 ${styles.columns} text-center`}>
                    <b>Name</b>
                </div >
                </div>
            </div>
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
