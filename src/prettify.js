function prettify(obj) {
    switch (typeof(obj)) {
        case 'boolean':
            return obj.toString();
        case 'number':
            return obj.toString();
        case 'undefined':
            return 'undefined';
        case 'function':
            if (obj.name) {
                return 'function ' + obj.name;
            } else {
                return 'anonymous function';
            }
    }
    return JSON.stringify(obj);
}