import restService from "./rest.service";

const proxyPath = "/rest"
const path = proxyPath + "/resource"


const saveValues = (resources) => {
    // TODO: remove unecessary fields
    const toSave = resources.map(res => restService.prepareDataHolder(res));
    return restService.api.patch(path + "/value", toSave)
}

const resourceService = {
    getById: (id) => restService.getById(path, id),
    getAll: (offset, limit) => restService.getAll(path, offset, limit),
    removeById: (id) => restService.removeById(path, id),
    save: (data) => restService.save(path, data),
    saveValues: saveValues
}

export default resourceService
