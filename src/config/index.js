const _ = require('lodash');
const glob = require('glob');
const path = require('path');

function getGlobedPaths(globPatterns, excludes) {
    let urlRegex = new RegExp("^(?:[a-z]+:)?\/\/", "i");

    let output = [];

    if (_.isArray(globPatterns)) {
        globPatterns.forEach(function (globPattern) {
            output = _.union(output, getGlobedPaths(globPattern, excludes));
        });
    } else if (_.isString(globPatterns)) {
        if (urlRegex.test(globPatterns)) {
            output.push(globPatterns);
        } else {
            let files = glob.sync(globPatterns);
            if (excludes) {
                files = files.map(function (file) {
                    if (_.isArray(excludes)) {
                        for (let i in excludes) {
                            if (excludes.hasOwnProperty(i)) {
                                file = file.replace(excludes[i], "");
                            }
                        }
                    } else {
                        file = file.replace(excludes, "");
                    }
                    return file;
                });
            }
            output = _.union(output, files);
        }
    }

    return output;

}

function getGlobalConfig() {
    const assets = require(path.join(process.cwd(), 'src/assets/default.js'));
    
    // const arr = getGlobedPaths(assets.routes);
    // console.log(arr);

    const config = {
        routes: getGlobedPaths(assets.routes)
    }

    return config;
}

module.exports.getGlobalConfig = getGlobalConfig;