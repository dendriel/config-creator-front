import {useEffect, useState} from "react";
import {useUser} from "../../contexts/user-provider";
import List from "../components/List";


export default function ResourceList(props) {
    const [rows, setRows] = useState([])
    const {user} = useUser()

    const loadRows = () => {
        setRows(
            props.elements.map(elem => {
                const subtype = elem.data.componentType === "list" ? elem.data.componentSubtype : ""
                return {
                    id : elem.id,
                    cols: [elem.data.name, elem.data.type, elem.data.componentType, subtype]
                }
            })
        )
    }

    useEffect(() => {
        loadRows()
    }, [props.elements, setRows, user])

    return (
        <List
            header={["Name", "Resource", "Component", "Subtype"]}
            rows={rows}
            onEdit={props.onEdit}
            onDefault={props.onDefault}
            onRemove={props.onRemove}
        />
    )
}
