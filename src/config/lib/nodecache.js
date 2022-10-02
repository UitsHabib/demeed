const NodeCache = require("node-cache");
const cache = new NodeCache;

function getValue (key) {
    return process.env[key] || cache.get(key);
}

function setValue (key, value) {
    cache.set(key, value);
}

function getAllkeys () {
    return cache.keys();
}

module.exports.getValue = getValue;
module.exports.setValue = setValue;
module.exports.getAllkeys = getAllkeys;