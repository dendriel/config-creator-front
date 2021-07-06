import List from "../components/List";


export default function ResourceList(props) {
    const parseRows = (rows) => {
        return rows.map(elem => {
            const compType = elem.data.componentType === 'template' ? elem.data.componentSubtype : elem.data.componentType
            const compSubtype = elem.data.componentType === 'list' ? elem.data.componentSubtype : ''
            return {
                id : elem.id,
                cols: [elem.data.name, elem.data.type, compType, compSubtype]
            }
        })
    }

    return (
        <List
            header={['Name', 'Resource', 'Component', 'Subtype']}
            onEdit={props.onEdit}
            service={props.service}
            parseRows={parseRows}
        />
    )
}
