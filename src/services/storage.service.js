import restService from "./rest.service";
import cookies from "js-cookie";

const proxyPath = "/storage"
const dirPath = proxyPath + "/resource"

const getAccessLink = (id) => {
    console.log("Get access link for resource " + id + " - " + cookies.get('token'))

    const headers = { Auth: `Bearer ${cookies.get('token')}` };
    return restService.download(dirPath + "/download/" + id, "exported.json", headers)
}


const storageService = {
    resource: {
        getAccessLink: getAccessLink
    }
}

export default storageService
