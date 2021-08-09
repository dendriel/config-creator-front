import restService from "./rest.service";

const proxyPath = "/storage"
const dirPath = proxyPath + "/resource"

const getAccessLink = (id) => {
    console.log("Get access link for resource " + id)
    return restService.api.get(dirPath + "/view/" + id)
}


const storageService = {
    download: restService.download,
    resource: {
        getAccessLink: getAccessLink
    }
}

export default storageService
