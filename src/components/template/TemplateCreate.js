import {useState} from "react";
import TextComponent from "../base-components/TextComponent";
import NumberComponent from "../base-components/NumberComponent";
import ToggleComponent from "../base-components/ToggleComponent";
import TextAreaComponent from "../base-components/TextAreaComponent";


export default function TemplateCreate(props) {
    const [data, setData] = useState({
        key: "CDAB11C6194F4008A985EE19B6D052D5",
        id: 1,
        type: "holder",
        name: "template 01",
        components: [
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
                    <label className="col-md-2 col-form-label text-sm-right">Id</label>
                    <div className="col-md-8">
                        <label className="col-md-10 col-form-label text-sm-left">{data.id}</label>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-md-2 col-form-label text-sm-right">Name</label>
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
            <div className="form-group">
                {data.components.map(comp => {
                    switch(comp.type) {
                        case "text":
                            return <TextComponent
                                key={comp.key}
                                component={comp}
                                setData={setData}
                            />
                        case "textarea":
                            return <TextAreaComponent
                                key={comp.key}
                                component={comp}
                                setData={setData}
                            />
                        case "number":
                            return <NumberComponent
                                key={comp.key}
                                component={comp}
                                setData={setData}
                            />
                        case "toggle":
                            return <ToggleComponent
                                key={comp.key}
                                component={comp}
                                setData={setData}
                            />
                        default:
                            return <div>unknown component {comp.type} </div>
                    }
                })}
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
