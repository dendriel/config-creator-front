import styles from './directory.module.css'
import {useEffect, useState} from "react";
import DirectoryList from "../components/directory/DirectoryList";
import DirectoryCreate from "../components/directory/DirectoryCreate";

export default function Directory() {
    const [inProgressCreate, setInProgressCreate] = useState(false)
    const [inProgressRemove, setInProgressRemove] = useState(false)

    const [dirs, setDirs] = useState([
        { id: 1, name: "dir1", resCount: 5, removeInProgress: false},
        { id: 2, name: "dir2", resCount: 15, removeInProgress: false},
        { id: 3, name: "default", resCount: 13, removeInProgress: false},
        { id: 4, name: "dir3", resCount: 0, removeInProgress: false }
        ])

    useEffect(() => {


    }, [])


    const createDir = (dir) => {
        console.log("Create " + JSON.stringify(dir))
        setInProgressCreate(true)

        // send create request to backend
    }

    const removeDir = (id) => {
        console.log("Remove " + id)
        setInProgressRemove(true)

        enableDirRemoveInProgress(id)

        // send remove request to backend.
    }

    const enableDirRemoveInProgress = (id) => {
        setDirs(prevDirs =>
            prevDirs.map(dir => {
                if (dir.id === id) {
                    return {
                        ...dir,
                        removeInProgress: true,
                    }
                }
                return dir;
            })
        );
    }

    return (
        <div className="col-md-12 container">
            <div>
                <h1>Directories</h1>
            </div>

            <DirectoryCreate
                createDir={createDir}
                inProgressCreate={inProgressCreate}
                inProgressRemove={inProgressRemove}
                />

            <div className={styles.dirsTable}>
                <DirectoryList
                    dirs={dirs}
                    removeDir={removeDir}
                    inProgressCreate={inProgressCreate}
                    inProgressRemove={inProgressRemove}
                />
            </div>
        </div>
    )
}
