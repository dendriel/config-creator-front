import TemplateList from "../components/template/TemplateList";
import {useHistory} from "react-router";


export default function Template() {
    const history = useHistory();

    const onCreate = () => {
        history.push('/template/create')
    }

    const onEdit = (id) => {
        history.push('/template/edit/' + id)
    }

    return(
        <div className="col-md-12 container">
            <div>
                <h1>Templates</h1>
            </div>
            <div className="col-md-12 text-center align-middle">
                <div className={`row marginTopBottom`}>
                    <div className="col-md-9">
                        <button className={`btn btn-primary float-right actionButton`} onClick={onCreate}>
                            New
                        </button>
                    </div>
                </div>
            </div>
            <TemplateList onEdit={onEdit} />
        </div>
    )
}
