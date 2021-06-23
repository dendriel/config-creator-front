import restService from "./api";

const proxyPath = "/rest"
const templatePath = proxyPath + "/template"

const parseTemplate = (template) => {
    return {
        ...template,
        data: JSON.parse(template.data)
    }
}

const prepareTemplate = (template) => {
    return {
        ...template,
        data: JSON.stringify(template.data)
    }
}

const getById = (id) => {
    console.log("Get template " + id)

    return restService.api.get(templatePath + "/" + id)
        .catch(error => {
            console.log("Failed to get template.")
            throw error
        })
        .then(response => {
            if (response && response.data) {
                response.data = parseTemplate(response.data)
                return response;
            }

            return response;
        })
}

const getAll = (offset, limit) => {
    console.log("Get all templates")

    return restService.api.get(templatePath + "/all?limit=" + limit + "&offset=" + offset)
        .catch(error => {
            console.log("Failed to get all templates.")
            throw error
        })
        .then(response => {
            if (response && response.data) {
                response.data = response.data.map(parseTemplate)
                return response;
            }

            return response;
        })
}

const getSaveRequest = (template) => {
    return template.id ? restService.api.put : restService.api.post;
}

const save = (template) => {
    console.log("Save template " + JSON.stringify(template))

    const saveRequest = getSaveRequest(template)
    const toSave = prepareTemplate(template)
    return saveRequest(templatePath, toSave)
        .catch(error => {
            console.log("Failed to save template.")
            throw error
        })
        .then(response => {
            if (response && response.data) {
                console.log("Template saved successfuly. Id: " + response.data)
            }

            return response;
        })
}

const templateService = {
    getById: getById,
    getAll: getAll,
    save: save
}

export default templateService
