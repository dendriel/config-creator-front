import List from "../components/List";
import {useUser} from "../../contexts/user-provider";
import projectService from "../../services/project.service";
import {useEffect, useState} from "react";


export default function ProjectList(props) {
    const [active, setActive] = useState(false)
    const {user} = useUser()

    const parseRows = (rows) => {
        const defaultProjectId = user.defaultProjectId
        console.log(defaultProjectId)
        return rows.map(t => {
            const defaultTag = t.id === defaultProjectId ? "default" : ""
            return {
                id : t.id,
                cols: [t.data.name, defaultTag]
            }
        })
    }

    useEffect(() => {
        setActive(user.defaultProjectId !== undefined)
    }, [user])

    return (
        <>
            {active ?
                    <List
                        header={["Project", "Default"]}
                        onEdit={props.onEdit}
                        onDefault={props.onDefault}
                        service={projectService}
                        parseRows={parseRows}
                    />
                    : ""
            }
        </>
    )
}
