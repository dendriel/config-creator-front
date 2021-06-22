import restService from "./api";

const proxyPath = "/rest"
const templatePath = proxyPath + "/template"

const parseTemplate = (template) => {
    return {
        ...template,
        data: JSON.parse(template.data)
    }
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

const templateService = {
    getAll: getAll
}

export default templateService
