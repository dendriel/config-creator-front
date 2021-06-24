import List from "../components/components/List";

export default function Home() {

    const onEdit = (id) => {
        console.log("Edit " + id)
    }

    const onRemove = (id, setRemoving) => {
        console.log("Remove " + id)
    }

    return (
        <div>
            <label>Welcome!</label>

            <List
                header={["Name", "Age", "Todo"]}
                rows={[
                    {id: 1, cols: ["Dendriel", "29", "Program"]},
                    {id: 2, cols: ["Marta", "31", "Study"]},
                    {id: 3, cols: ["Joe", "40", "Play"]}]
                }
                onEdit={onEdit}
                onRemove={onRemove}
            />

        </div>
    )
}
