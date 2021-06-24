import List from "../components/List";
import {useEffect, useState} from "react";


export default function TemplateList(props) {
    const [rows, setRows] = useState([])

    useEffect(() => {
        setRows(
            props.templates.map(t => {
                return {
                    id : t.id,
                    cols: [t.data.name]
                }
            })
        )
    }, [props.templates, setRows])

    return (
        <List
            header={["Name"]}
            rows={rows}
            onEdit={props.onEdit}
            onRemove={props.onRemove}
            />
    )
}
