class Loaders {

    constructor() {}

    /**
     * Loads a json file
     *
     * @param url
     * @returns {Promise}
     */
    loadJson(url, shouldTryFromCache) {

        const headers = new Headers({ 'Content-Type': 'application/json' });
        const request = new Request(url, { headers: headers });

        return fetch(request)
            .then(function (response) { return response.text() })
            .catch(function (error) { console.error(error) });
    }

    /**
     * Loads a text file
     *
     * @param url
     * @returns {Promise}
     */
    loadText(url, shouldTryFromCache = false) {

        const headers = new Headers({ 'Content-Type': 'text/plain' });
        const request = new Request(url, { headers: headers });

        return fetch(request)
            .then(function (response) { return response.text() })
            .catch(function (error) { console.error(error) });
    }

    /**
     * Loads an image
     *
     * @param url
     * @returns {Promise}
     */
    loadImage(url) {

        return new Promise(function (resolve, reject) {

            const image = new Image();

            image.onload = function () {
                resolve(image);
            };
            image.onerror = function () {
                console.error('Utils coundnt load image', url)
                reject('Utils coudnt load image')
            };

            image.src = url;
        })
    }

}
let Loader = new Loaders();
export default Loader;