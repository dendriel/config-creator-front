import {Link} from "react-router-dom";


export default function PageHeader(props) {

    return <div>
        <h1>
            {props.previousLink ?
                <Link to={props.previousLink}>{props.previous}</Link>
                : props.previous
            }
            {props.previous ? " / " : ""}
            {props.current}
        </h1>
    </div>
}
