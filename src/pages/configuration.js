import ProjectListPageContentFrame from "../components/page/ProjectListPageContentFrame";
import ConfigurationList from "../components/configuration/ConfigurationList";
import configurationService from "../services/configuration.service";
import {useAlert} from "../contexts/alert-provider";
import {useState} from "react";

export default function Configuration() {
    const [reload, setReload] = useState(true)

    const {closeAlert, alertSuccess, alertError} = useAlert();

    const onExport = () => {
        closeAlert()

        configurationService.generate()
            .then(() => {
                alertSuccess("Configuration generation successfully scheduled")
                setReload(old => !old)
            })
            .catch(() => {
                alertError("Failed to schedule configuration generation")
            })
    }

    return (
        <ProjectListPageContentFrame
            current={'Configuration'}
            onCreate={onExport}
            onCreateLabel={"Generate"}
        >
            <ConfigurationList data={reload}/>
        </ProjectListPageContentFrame>
    )
}
