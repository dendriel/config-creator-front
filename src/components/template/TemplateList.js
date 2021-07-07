import List from "../components/List";
import templateService from "../../services/template.service";


export default function TemplateList(props) {
    const parseRows = (rows) => {
        return rows.map(t => {
            return {
                id : t.id,
                cols: [t.data.name]
            }
        })
    }

    return (
        <List
            header={["Name"]}
            service={templateService}
            parseRows={parseRows}
            onEdit={props.onEdit}
            />
    )
}
