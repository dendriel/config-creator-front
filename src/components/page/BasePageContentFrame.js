import React from 'react';
import PageHeader from "../components/PageHeader";


export default function BasePageContentFrame(props) {
    return (
        <div className="container-fluid">
            <div className={"row"}>
                <div className={"col"}>
                    <PageHeader
                        current={props.current}
                        previous={props.previous}
                        previousLink={props.previousLink}
                        onPrevious={props.onPrevious}
                    />
                </div>
            </div>

            <div className={"row"}>
                <div className="col">
                    {React.cloneElement(props.children, {...props})}
                </div>
            </div>
        </div>
    )
}
