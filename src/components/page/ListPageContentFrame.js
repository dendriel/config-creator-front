import React from "react";
import BasePageContentFrame from "./BasePageContentFrame";


export default function ListPageContentFrame(props) {
    return (
        <BasePageContentFrame {...props}>
            <div className="container-fluid">
                <div className={"row"}>
                    <div className="col text-center align-middle">
                        {props.onCreate ?
                            <div className={`row marginTopBottom`}>
                                <div className="col">
                                    <button className={`btn btn-primary float-center actionButton`} onClick={props.onCreate} hidden={props.hideNewButton}>
                                        {props.onCreateLabel ? props.onCreateLabel : "New"}
                                    </button>
                                </div>
                            </div>
                            : ""
                        }

                        <div className={"row"}>
                            <div className={"col-2"}></div>
                            <div className={"col-8"}>
                                {React.cloneElement(props.children, {...props})}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </BasePageContentFrame>
    )
}
