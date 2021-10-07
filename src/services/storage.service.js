import restService from "./rest.service";

const proxyPath = "/storage"
const dirPath = proxyPath + "/resource"

const getAccessLink = (id) => {
    return restService.download(`${dirPath}/download/${id}`, "exported.json")
}


const storageService = {
    resource: {
        getAccessLink: getAccessLink
    }
}

export default storageService
