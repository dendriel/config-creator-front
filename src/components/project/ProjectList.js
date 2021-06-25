import {useEffect, useState} from "react";
import List from "../components/List";


export default function ProjectList(props) {
    const [rows, setRows] = useState([])

    useEffect(() => {
        setRows(
            props.elements.map(t => {
                return {
                    id : t.id,
                    cols: [t.data.name]
                }
            })
        )
    }, [props.elements, setRows])

    return (
        <List
            header={["Project"]}
            rows={rows}
            onEdit={props.onEdit}
            onRemove={props.onRemove}
        />
    )
}
