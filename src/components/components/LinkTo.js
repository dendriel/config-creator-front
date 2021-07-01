import style from "./LinkTo.module.css";
import {Link} from "react-router-dom";


export default function LinkTo(props) {
    return (
        <div className={style.link}>
            <Link to={props.to}>{props.message}</Link>
        </div>
    )
}
