import TemplateList from "../components/template/TemplateList";
import {useHistory} from "react-router";
import ListPageContentFrame from "../components/page/ListPageContentFrame";


export default function Template() {
    const history = useHistory();

    const onCreate = () => {
        history.push('/template/create')
    }

    const onEdit = (id) => {
        history.push('/template/edit/' + id)
    }

    return(
        <ListPageContentFrame current={"Templates"} onCreate={onCreate}>
            <TemplateList onEdit={onEdit} />
        </ListPageContentFrame>
    )
}
