import {Link} from "react-router-dom";


export default function PageHeader(props) {
    return (
        <h1>
            {props.onPrevious ?
                <Link to={props.previousLink} onClick={props.onPrevious}>{props.previous}</Link>
                :
                <>
                    {props.previousLink ?
                            <Link to={props.previousLink}>{props.previous}</Link>
                            : props.previous
                    }
                </>
            }

            {props.previous ? " / " : ""}
            {props.current}
        </h1>
    )
}
