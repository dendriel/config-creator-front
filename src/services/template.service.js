import restService from "./rest.service";

const proxyPath = "/rest"
const path = proxyPath + "/template"

const templateService = {
    getById: (id) => restService.getById(path, id),
    getAll: (offset, limit) => restService.getAll(path, offset, limit),
    count: () => restService.count(path),
    removeById: (id) => restService.removeById(path, id),
    save: (data) => restService.save(path, data)
}

export default templateService
