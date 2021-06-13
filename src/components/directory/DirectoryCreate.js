import styles from "../../pages/directory.module.css";
import {useState} from "react";


export default function DirectoryCreate(props) {
    const [dir, setDir] = useState({ name: "" })

    const create = () => {
        props.createDir(dir)
        setDir({ name: "" })
    }

    const getCreateButton = () => {
        if (props.inProgressCreate) {
            return <button className="btn btn-primary" disabled>
                <span className="spinner-border spinner-border-sm" />
                Creating..
            </button>
        }

        if (props.inProgressRemove) {
            return <button className="btn btn-primary" onClick={create} disabled>
                Create
            </button>
        }

        return <button className="btn btn-primary" onClick={create} disabled={!dir.name} >
            Create
        </button>
    }

    return (
        <div className="text-center">
            <label>New directory:</label>
            <input
                className={styles.dirNameInput}
                type="text"
                value={dir.name}
                onChange={(e) => setDir({ name: e.target.value })}
            />
            {getCreateButton()}
        </div>
    )
}
