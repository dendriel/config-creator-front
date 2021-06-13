import styles from './directory.module.css'
import {useEffect, useState} from "react";
import DirectoryList from "../components/directory/DirectoryList";
import DirectoryCreate from "../components/directory/DirectoryCreate";
import restService from "../services/api";

export default function Directory() {
    const [inProgressCreate, setInProgressCreate] = useState(false)
    const [inProgressRemove, setInProgressRemove] = useState(false)

    const [dirs, setDirs] = useState([])

    const loadDirs = async () => {

        restService.api.get('http://localhost:8082/directory/all')
            .then(response => {
                console.log(JSON.stringify(response.data))
                if (!response.data) {
                    console.log("Failed to retrieve directories")
                    return false;
                }

                setDirs(response.data)
            })
            .catch(error => {
                console.log("Failed to retrieve dirs! " + error.message)
                if (error.response.status === 403 || error.response.status === 401) {
                    console.log("Forbidden");
                }
            })
        // try {
        //     const { dirs: data } = await api.get('http://localhost:8082/directory/all')
        //     if (!data) {
        //         console.log("Failed to retrieve directories")
        //         return false;
        //     }
        //
        //     setDirs(data)
        //     console.log("Got dirs " + data)
        // } catch (error) {
        //     console.log("Failed to retrieve dirs! " + error)
        // }
    }

    useEffect(() => {
        loadDirs()

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
