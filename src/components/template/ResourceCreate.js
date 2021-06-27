import {useState} from "react";
import TemplateComponent from "../base-components/TemplateComponent";


export default function ResourceCreate(props) {
    const [data, setData] = useState({
        key: "CDAB11C6194F4008A985EE19B6D052D5",
        id: 1,
        type: "template",
        name: "template 01",
        value: [
            {
                key: "83254B5B72E14EA99354E181551F3B43",
                name: "Raça",
                type: "text",
                value: "Chiuaua"
            },
            {
                key: "62488A6FDFE64FC7BE18655DFBBD9FE8",
                name: "Puppy",
                type: "toggle",
                value: false
            },
            {
                key: "55433A6FDFE64FC7BE18655DFBBD9FE8",
                name: "Age",
                type: "number",
                value: 123
            },
            {
                key: "55433A6FDFE64FC7BE18655DFBBD8899",
                name: "Bio",
                type: "textarea",
                rows: 5,
                value: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
            },
            {
                key: "55433A6FDFEKKFF7BE18655DFBBD9FE8",
                name: "Age",
                type: "list",
                subtype: "number",
                value: [
                    {
                        key: "55433A6FDFE64FC7BE18655GGHHKK001",
                        name: "Number 01",
                        type: "number",
                        value: 0
                    },
                    {
                        key: "55433A6FDFE64FC7BE18655GGHHKK002",
                        name: "Number 02",
                        type: "number",
                        value: 10
                    },
                    {
                        key: "55433A6FDFE64FC7BE18655GGHHKK003",
                        name: "Number 03",
                        type: "number",
                        value: 30
                    }
                ]
            },
            {
                key: "CDAB11C6194F4008A985EE19B6D0KKLO",
                id: 2,
                type: "template",
                name: "template 02",
                value: [
                    {
                        key: "83254B5B72E14EA99354E18155GG3B43",
                        name: "Origem",
                        type: "text",
                        value: "Chi"
                    },
                    {
                        key: "HH488A6FDFE64FC7BE18655DFBBD9FE8",
                        name: "Nativo",
                        type: "toggle",
                        value: false
                    },

                    {
                        key: "CDAB11C6166F4008A985EE19B6D0KKLO",
                        id: 2,
                        type: "template",
                        name: "template 03",
                        value: [
                            {
                                key: "11254B5B72E14EA99354E18155GG3B43",
                                name: "Teste",
                                type: "text",
                                value: "Pastor Alemao"
                            },
                            {
                                key: "22488A6FDFE64FC7BE18655DFBBD9FE8",
                                name: "Brasileiro",
                                type: "toggle",
                                value: true
                            }
                        ]
                    }
                ]
            }
        ]
    })

    const setName = (name) => {
        setData(old => {
            return {
                ...old,
                name: name
            }
        })
    }

    return(
        <div className="col-md-10 container">
            <div>
                <div className="form-group row">
                    <label className="col-md-2 col-form-label text-right">Id</label>
                    <div className="col-md-8">
                        <label className="col-md-10 col-form-label text-left">{data.id}</label>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-md-2 col-form-label text-right">Name</label>
                    <div className="col-md-8">
                        <input
                            type="text"
                            className="form-control"
                            onChange={(e) => setName(e.target.value)}
                            value={data.name}
                        />
                    </div>
                </div>
            </div>
            <hr />
            <div className="col-md-12 container align-middle">
                <TemplateComponent
                    root={true}
                    component={data}
                    setData={setData}
                />
            </div>

            <div>
                <button
                    className={`btn btn-primary float-left`}
                    onClick={() => console.log(JSON.stringify(data))}
                >
                    Save
                </button>
            </div>
        </div>
    )
}
