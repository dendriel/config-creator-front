import List from "../components/List";
import configurationService from "../../services/configuration.service";


export default function ConfigurationList(props) {

    const formatDate = (raw) => {
        if (!raw) {
            return ''
        }

        const date = new Date(Date.parse(raw));

        return date.getDate() + '/' + (date.getMonth()+1) + '/' + date.getFullYear() + ' - ' +
                date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
    }

    const parseRows = (rows) => {
        return rows.map(elem => {
            return {
                id : elem.id,
                cols: [formatDate(elem.createdAt), formatDate(elem.createdBy), formatDate(elem.requestedAt), elem.state],
                data: {
                    downloadActive: elem.state === 'READY',
                    removeActive: elem.state === 'READY' || elem.state === 'FAILED',
                    retryActive: elem.state === 'FAILED',
                    targetId: elem.resourceId
                }
            }
        })
    }

    return (
        <List
            header={['Created At', 'Requested By', 'Requested At', 'State']}
            service={configurationService}
            parseRows={parseRows}
            data={props.data}
            onDownload={props.onDownload}
            onRetry={props.onRetry}
        />
    )
}
