import restService from "./rest.service";

const proxyPath = "/rest"
const path = proxyPath + "/project"

const getDefault = () => {
    return restService.api.get(path)
        .then(response => {
            if (response && response.data) {
                response.data = restService.parseDataHolder(response.data)
                return response;
            }

            return response;
        })
}

const projectService = {
    getDefault: getDefault,
    getById: (id) => restService.getById(path, id),
    count: () => restService.count(path),
    getAll: (offset, limit) => restService.getAll(path, offset, limit),
    removeById: (id) => restService.removeById(path, id),
    save: (data) => restService.save(path, data)
}

export default projectService
