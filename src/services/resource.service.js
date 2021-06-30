import restService from "./rest.service";

const proxyPath = "/rest"
const path = proxyPath + "/resource"

const mapToValue = (res) => {
    return {
        id: res.id,
        data: {
            componentType: res.data.componentType,
            value: res.data.value
        }
    }
}

const saveValues = (resources) => {
    resources = resources.map(res => {
        let value = res.data.value
        if (value !== null && res.data.componentType === "list") {
            value = value.map(mapToValue)
        }
        return {
            id: res.id,
            data: {
                componentType: res.data.componentType,
                value: value
            }
        }
    })

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
