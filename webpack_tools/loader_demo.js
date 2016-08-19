

/**
 * 同步的 Loader
 */
module.exports = function(content) {
    return someSyncOperation(content);
};

/**
 * 异步的 Loader
 */
module.exports = function(content) {
    var callback = this.async();
    if(!callback) return someSyncOperation(content);
    someAsyncOperation(content, function(err, result) {
        if(err) return callback(err);
        callback(null, result);
    });
};