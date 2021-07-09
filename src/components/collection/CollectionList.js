import List from "../components/List";


export default function CollectionList(props) {
    const parseRows = (rows) => {
        return rows.map(t => {
            return {
                id : t.id,
                cols: [t.id]
            }
        })
    }

    const getAll = (offset, limit) => {
        return Promise.resolve({ data: props.value.slice(offset, limit) })
    }

    const count = () => {
        return Promise.resolve({ data: props.value.length })
    }

    const removeById = (id) => {
        const newValue = props.value.filter(comp => comp.id !== id)
        return props.onRemoved(newValue)
    }

    const collectionService = {
        getAll: getAll,
        count: count,
        removeById: removeById
    }

    return (
        <List
            header={["Component"]}
            service={collectionService}
            parseRows={parseRows}
            onEdit={props.onEdit}
            data={props.value}
        />
    )
}
