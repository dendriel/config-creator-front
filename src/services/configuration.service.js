import restService from "./rest.service";

const proxyPath = "/rest"
const path = proxyPath + "/configuration"

const getAll = (offset, limit) => {
    return restService.api.get(path + "/all?limit=" + limit + "&offset=" + offset)
        .then(response => {
            if (response && response.data) {
                return response;
            }

            return response;
        })
}

const generate = () => {
    return restService.api.get(path + "/export")
}

const retry = (id) => {
    return restService.api.get(path + "/export/retry/" + id)
}

const configurationService = {
    getAll: getAll,
    generate: generate,
    retry: retry,
    count: () => restService.count(path),
    removeById: (id) => restService.removeById(path, id)
}

export default configurationService
