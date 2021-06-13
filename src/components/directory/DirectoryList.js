import styles from "../../pages/directory.module.css";
import {ListGroup} from "react-bootstrap";

export default function DirectoryList(props) {

    const getDeleteButton = (dir) => {
        if (dir.removeInProgress) {
            return <button className={`btn btn-outline-danger ${styles.deleteButton}`} disabled onClick={() => props.removeDir(dir.id)}>
                <span className="spinner-border spinner-border-sm" />
                Removing..
            </button>
        }

        if (dir.name === 'default' || dir.resourcesCount > 0 || props.inProgressRemove || props.inProgressCreate) {
            return <button className={`btn btn-outline-danger ${styles.deleteButton}`} disabled onClick={() => props.removeDir(dir.id)}>
                Remove
            </button>
        }

        return <button className={`btn btn-outline-danger ${styles.deleteButton}`} onClick={() => props.removeDir(dir.id)}>
            Remove
        </button>
    }

    return (
        <ListGroup className={`col-md-12 ${styles.dirsTableList}`}>

            <ListGroup.Item className="col-md-6 text-center align-middle">
                <div className={`col-md-4 form-group ${styles.columns} float-left`}>
                    <b>Name</b>
                </div >
                <div className={`col-md-4 form-group ${styles.columns} float-left`}>
                    <b>Resources</b>
                </div>
                <div className="col-md-4 form-group float-left">
                </div >
            </ListGroup.Item>

            {props.dirs.map(dir => (
                    <ListGroup.Item className="col-md-6 text-center align-middle form-inline" key={dir.id}>
                        <div className={`col-md-4 form-group ${styles.columns} float-left`}>
                            {dir.name}
                        </div >
                        <div className={`col-md-4 form-group ${styles.columns} float-left`}>
                            {dir.resourcesCount}
                        </div>
                        <div className="col-md-4 form-group">
                            {getDeleteButton(dir)}
                        </div >
                    </ListGroup.Item>
                )
            )}
        </ListGroup>
    )
}
