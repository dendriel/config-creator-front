import Axios from "axios";
import cookies from "js-cookie"

let urls = {
    test: `http://localhost:8080`,
    development: 'http://localhost:3000/',
    production: 'https://your-production-url.com/'
}

const axiosInstance = Axios.create({
    baseURL: urls[process.env.NODE_ENV],
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

const parseDataHolder = (holder) => {
    return {
        ...holder,
        data: JSON.parse(holder.data)
    }
}

const prepareDataHolder = (holder) => {
    return {
        ...holder,
        data: JSON.stringify(holder.data)
    }
}

const getById = (path, id) => {
    return restService.api.get(path + "/" + id)
        .then(response => {
            if (response && response.data) {
                response.data = parseDataHolder(response.data)
                return response;
            }

            return response;
        })
}

const getAll = (path, offset, limit) => {
    return restService.api.get(path + "/all?limit=" + limit + "&offset=" + offset)
        .then(response => {
            if (response && response.data) {
                response.data = response.data.map(parseDataHolder)
                return response;
            }

            return response;
        })
}

const removeById = (path, id) => {
    return restService.api.delete(path + "/" + id)
}

const count = (path) => {
    return restService.api.get(path + "/count")
}

const getSaveRequest = (template) => {
    return template.id ? restService.api.put : restService.api.post;
}

const save = (path, template) => {
    const saveRequest = getSaveRequest(template)
    const toSave = prepareDataHolder(template)
    return saveRequest(path, toSave)
}

const download = (url, fileName) => {
    return restService.api({
        method: "get",
        url: url,
        responseType: "arraybuffer"
    })
        .then((response) => {
            let link = document.createElement("a");
            link.href = window.URL.createObjectURL(
                new Blob([response.data], { type: "application/octet-stream" })
            );

            link.download = fileName;

            document.body.appendChild(link);

            link.click();
            setTimeout(function () {
                window.URL.revokeObjectURL(link);
            }, 200);
        })
}

const restService = {
    api: axiosInstance,
    redirect: null,
    setToken: null,
    logout: () => {
        console.log("Logging out")
        cookies.remove('token')
        localStorage.removeItem("user")
        restService.setToken(null)
        restService.redirect.push('/login')
    },
    getById: getById,
    getAll: getAll,
    count: count,
    removeById: removeById,
    save: save,
    parseDataHolder: parseDataHolder,
    prepareDataHolder: prepareDataHolder,
    download: download
}

axiosInstance.interceptors.response.use((response) => response, (error) => {
    if (!error) {
        console.log("Not an error")
        return;
    }

    console.log("interceptor " + JSON.stringify(error))

    if (window.location.pathname !== '/login' &&
        (error.response.status === 403 || error.response.status === 401)) {
        restService.logout()
    }
    else {
        throw error;
    }
});

export default restService;
