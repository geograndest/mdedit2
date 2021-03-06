export class UtilsService {
    constructor($http) {
        'ngInject';

        this.$http = $http;
        this.promises = [];
    }

    sayHello(name = 'World') {
        var message = 'Hello ' + name + ' !';
        return message;
    }

    getJsonFile(file, cache) {
        if ((cache && !promises[cache]) || (!cache)) {
            return this.$http.get(file)
                .then((response) => {
                    response.data.file = file;
                    return response.data;
                })
                .catch((reason) => {
                    console.log("Error in UtilsService.getJsonFile() service : can't get '" + file + "' JSON file (" + reason + ").");
                });
        } else {
            return promises[cache];
        }
    }

    get(file, callback) {
        return this.$http.get(file)
            .then((response) => {
                if (callback) {
                    callback(response.data);
                }
                return response.data;
            })
            .catch((reason) => {
                console.log("Error: can't get " + file + " file (" + reason + ").");
            });
    }

    post(url, data, callback) {
        return this.$http.post(url, data).then(
            function (response) {
                callback(response.data);
            },
            function (response) {
                console.log('Error', data, response)
            }
        );

    }

    testRequest(url) {
        console.log('Try UtilsService.testRequest(' + url + ').');
        return this.$http.head(url)
            .then((response) => {
                console.log(response);
                return response.data;
            })
            .catch((reason) => {
                console.log("Error in UtilsService.getJsonFile() service : can't get '" + url + "' JSON file (" + reason + ").");
            });
    }


    getProxyUrl(url, proxy) {
        proxy = proxy || false;
        if (proxy) {
            return proxy + encodeURIComponent(url);
        }
        return url;
    }

    getBaseUrl(url) {
        return url.split('?')[0];
    }

    getUrlParameter(paramName, defaultValue) {
        defaultValue = defaultValue || 0;
        var response = defaultValue;
        var value = $location.search()[paramName];
        if (typeof value != 'undefined') {
            response = value;
            if (typeof value != 'boolean' && ['0', 'false'].indexOf(value.toLowerCase()) > -1) {
                response = 0;
            }
        }
        return response;
    }

    readFile(file, callback) {
        var reader = new FileReader();
        reader.onloadend = (e) => {
            var data = e.target.result;
            callback(data);
        }
        reader.readAsText(file);
    }

    getUrl(proxy, url, callback) {
        if (proxy) {
            url = this.getProxyUrl(url, proxy)
        }
        return this.get(url, callback);
    }
}