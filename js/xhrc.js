/**Module for representing XHR Client
 *@module XHR Client
 */

var XHRC = XHRC || {};


/**
 * Constructor of RESTClient class.
 * @constructor
 * @param {object} params - The parameters for the constructor.
 */
XHRC.RESTClient = function(params) {

    /**
     * XHR instance
     * @type {XMLHttpRequest}
     * @private
     */
    this._xhrObject = this._getXHR();

    return this;
}


XHRC.RESTClient.prototype = {

/**
 * Returns XMLHttpRequest object
 * @return {XMLHttpRequest}
 * @private
 */
    _getXHR: function() {
        var xhr;

        try {
            xhr = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (E) {
                xhr = false;
            }
        };

        if (!xhr && typeof XMLHttpRequest!='undefined') {
            xhr = new XMLHttpRequest();
        };

        return xhr;
    },

/**
 * Callback for XMLHttpRequest object property onreadystatechange
 * @private
 */
    _onReadyStateChangeHandler: function() {
        if (_xhro.readyState == 4) {
            var httpCode = Math.trunc((_xhro.status) % 100);
            if( httpCode === 1 || httpCode === 2 || httpCode === 3) {
                resolve(_xhro.responseText);
            } else {
                var error = new Error(_xhro.statusText);
                error.code = _xhro.status;
                reject(error);
            };
        };
    },


/**
 * Sends GET request
 * @param {string} url - URL for the GET-request.
 * @param {object} requestParams - GET-request parameters.
 * @param {string} userName - authentification user name.
 * @param {string} passsword - authentification password.
 * @return {Promise}
 *
 */
    sendGET: function(url, requestParams, userName, password) {
        var _url,
            params = '',
            _xhro = this._xhrObject;

        if (requestParams && Object.keys(requestParams).length) {
            var paramList = [];
            for (var i in requestParams) {
                paramList.push(i + '=' + requestParams[i]);
            };
            params = '?' + paramList.join('&');
        };

        _url = url + params;

        return new Promise(function (resolve, reject) {
            _xhro.open('GET', _url, true);

            _xhro.onreadystatechange = this._onReadyStateChangeHandler;
            _xhro.send(null);
        });
    },


/**
 * Sends POST request
 * @param {string} url - URL for the POST-request.
 * @param {object} requestParams - POST-request parameters.
 * @param {string} userName - authentification user name.
 * @param {string} passsword - authentification password.
 * @return {Promise}
 *
 */
    sendPOST: function(url, requestParams, userName, password) {
        var _url,
            params = '',
            _xhro = this._xhrObject;

        if (requestParams && Object.keys(requestParams).length) {
            var paramList = [];
            for (var i in requestParams) {
                paramList.push(i + '=' + encodeURIComponent(requestParams[i]));
            };
            params = paramList.join('&');
        };

        _url = url;

        return new Promise(function (resolve, reject) {
            _xhro.open('POST', _url, true);
            _xhro.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

            _xhro.onreadystatechange = this._onReadyStateChangeHandler;
            _xhro.send(params);
        });
    }
};