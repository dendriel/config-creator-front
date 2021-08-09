import ProjectListPageContentFrame from "../components/page/ProjectListPageContentFrame";
import ConfigurationList from "../components/configuration/ConfigurationList";
import configurationService from "../services/configuration.service";
import {useAlert} from "../contexts/alert-provider";
import {useState} from "react";
import storageService from "../services/storage.service";

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

    const onDownload = (id) => {
        storageService.resource.getAccessLink(id)
            .then(response => {
                if (!response) {
                    alertError("Failed to download configuration. Please, try again")
                    return
                }

                return response.data
            })
            .then(url => {
                storageService.download(url, 'exported.json')
                    .then(() => {
                        alertSuccess("Download completed!")
                    })
                    .catch(error => {
                        console.log(JSON.stringify(error))
                        alertError("Failed to download configuration. Please, try again")
                    })
            })
            .catch(error => {
                console.log(JSON.stringify(error))
                alertError("Failed to download configuration. Please, try again")
            })
    }

    return (
        <ProjectListPageContentFrame
            current={'Configuration'}
            onCreate={onExport}
            onCreateLabel={"Generate"}
            onDownload={onDownload}
        >
            <ConfigurationList data={reload}/>
        </ProjectListPageContentFrame>
    )
}
