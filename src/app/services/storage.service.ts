
function store(key: string, value: any) {
    localStorage[key] = JSON.stringify(value)
}

function load(key: string, defaultValue = null) {
    var value = localStorage[key] || defaultValue;
    return JSON.parse(value);
}

function remove(key: string) {
    localStorage.removeItem(key)
}
export const storageService = {
    store,
    load,
    remove
}
