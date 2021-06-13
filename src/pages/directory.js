import styles from './directory.module.css'
import {useEffect, useState} from "react";
import DirectoryList from "../components/directory/DirectoryList";
import DirectoryCreate from "../components/directory/DirectoryCreate";
import directoryService from "../services/directory.service";

export default function Directory() {
    const [inProgressCreate, setInProgressCreate] = useState(false)
    const [inProgressRemove, setInProgressRemove] = useState(false)

    const [dirs, setDirs] = useState([])

    const loadDirs = () => {
        directoryService.getAll()
            .then(response => {
                if (response && response.data) {
                    setDirs(response.data)
                }
            })
    }

    useEffect(() => {
        loadDirs()
    }, [])

    const createDir = (dir) => {
        setInProgressCreate(true)

        directoryService.create(dir.name)
            .then(() => {
                setInProgressCreate(false)
                loadDirs()
            })
            .catch(error => {
                setInProgressCreate(false)
            })
    }

    const removeDir = (id) => {
        setDirRemoveInProgress(id, true)

        directoryService.remove(id)
            .then(() => {
                setDirRemoveInProgress(id, false)
                loadDirs()
            })
            .catch(() => {
                setDirRemoveInProgress(id, false)
            })
    }

    const setDirRemoveInProgress = (id, inProgress) => {
        setInProgressRemove(inProgress)
        setDirs(prevDirs =>
            prevDirs.map(dir => {
                if (dir.id === id) {
                    return {
                        ...dir,
                        removeInProgress: inProgress,
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
