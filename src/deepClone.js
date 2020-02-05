// 仅考虑数组与对象的情况
// simplest
function deepClone1(target){
return JSON.parse(JSON.stringify(target))
}
//simplest
function deepClone2(target){
    return Object.fromEntries(Object.entries(target))
}
// 
function deepClone(target){
    const isArray = Array.isArray(target)
    const newObj = isArray ? []:{};
    const keys = Object.keys(target);
    keys.forEach(key=>{
        if(target[key] instanceof Object){
            newObj[key] = deepClone(target[key]);
        }else{
            newObj[key] = target[key];
        }
    })
    return newObj;
}

// 深拷贝（尤雨溪版）
function find(list, f) {
    return list.filter(f)[0]
}

function deepCopy(obj, cache = []) {
    // just return if obj is immutable value
    if (obj === null || typeof obj !== 'object') {
        return obj
    }

    // if obj is hit, it is in circular structure
    const hit = find(cache, c => c.original === obj)
    if (hit) {
        return hit.copy
    }

    const copy = Array.isArray(obj) ? [] : {}
    // put the copy into cache at first
    // because we want to refer it in recursive deepCopy
    cache.push({
        original: obj,
        copy
    })
    Object.keys(obj).forEach(key => copy[key] = deepCopy(obj[key], cache))

    return copy
}
