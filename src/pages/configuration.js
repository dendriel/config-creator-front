import ListPageContentFrame from "../components/page/ListPageContentFrame";
import ProjectList from "../components/project/ProjectList";

export default function Configuration() {


    return (
        <ListPageContentFrame current={"Configuration"} onCreate={onCreate}>
            <ProjectList onEdit={onEdit} onDefault={onDefault} />
        </ListPageContentFrame>
    )
}
