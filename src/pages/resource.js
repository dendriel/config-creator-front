import {useUser} from "../contexts/user-provider";
import ResourceList from "../components/resources/ResourceList";
import {useHistory} from "react-router";
import ProjectListPageContentFrame from "../components/page/ProjectListPageContentFrame";


export default function Resource() {
    const history = useHistory();
    const {user} = useUser()

    const onCreate = () => {
        history.push('/resource/create/' + user.defaultProjectId)
    }

    const onEdit = (id) => {
        history.push('/resource/edit/' + user.defaultProjectId + '/' + id)
    }

    return (
        <ProjectListPageContentFrame
            current={'Resources'}
            onCreate={onCreate}
            onEdit={onEdit}
            >
            <ResourceList />
        </ProjectListPageContentFrame>
    )
}
