module.exports = {
    localStorage: {
        set: function(key, value) {
            window.localStorage[key] = value;
        },
        get: function(key, defaultValue) {
            return window.localStorage[key] || defaultValue;
        },
        setObject: function(key, value) {
            window.localStorage[key] = JSON.stringify(value);
        },
        getObject: function(key) {
            return JSON.parse(window.localStorage[key] || null);
        }
    },
    sessionStorage: {
        set: function(key, value) {
            window.sessionStorage[key] = value;
        },
        get: function(key, defaultValue) {
            return window.sessionStorage[key] || defaultValue;
        },
        setObject: function(key, value) {
            window.sessionStorage[key] = JSON.stringify(value);
        },
        getObject: function(key) {
            return JSON.parse(window.sessionStorage[key] || null);
        }
    }
}