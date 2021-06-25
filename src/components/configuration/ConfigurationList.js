import {useEffect, useState} from "react";
import List from "../components/List";


export default function ConfigurationList(props) {
    const [rows, setRows] = useState([])

    useEffect(() => {
        setRows(
            props.configurations.map(t => {
                return {
                    id : t.id,
                    cols: [t.data.name]
                }
            })
        )
    }, [props.configurations, setRows])

    return (
        <List
            header={["Name"]}
            rows={rows}
            onEdit={props.onEdit}
            onRemove={props.onRemove}
        />
    )
}
