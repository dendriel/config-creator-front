import restService from "./api";

const proxyPath = "/storage"
const dirPath = proxyPath + "/directory"

function create(name) {
    console.log("Create directory " + name)
    return restService.api.post(dirPath + '?name=' + name)
        .catch(error => {
            console.log("Failed to create directory " + name + ". " + error.message)
            throw error
        })
}

function getAll() {
    console.log("Get all directories")
    return restService.api.get(dirPath + "/all")
        .catch(error => {
            console.log("Failed to get all directories.")
            throw error
        })
}

function removeById(id) {
    console.log("Remove directory " + id)
    return restService.api.delete(dirPath + '/' + id)
        .catch(error => {
            console.log("Failed to remove directory " + id + ". " + error.message)
            throw error
        })
}

const directoryService = {
    create: create,
    getAll: getAll,
    remove: removeById
}

export default directoryService;
