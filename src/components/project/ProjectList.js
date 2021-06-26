import {useEffect, useState} from "react";
import List from "../components/List";
import {useUser} from "../../contexts/user-provider";


export default function ProjectList(props) {
    const [rows, setRows] = useState([])

    const {user} = useUser()

    const loadRows = () => {
        const defaultProjectId = user.defaultProjectId
        setRows(
            props.elements.map(t => {
                const defaultTag = t.id === defaultProjectId ? "default" : ""
                return {
                    id : t.id,
                    cols: [t.data.name, defaultTag]
                }
            })
        )
    }

    useEffect(() => {
        loadRows()
    }, [props.elements, setRows, user])

    return (
        <List
            header={["Project", "Default"]}
            rows={rows}
            onEdit={props.onEdit}
            onDefault={props.onDefault}
            onRemove={props.onRemove}
        />
    )
}
