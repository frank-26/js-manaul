function jsonStringify(obj) {
    const type = typeof obj;
    const theVeryOriginalReg = /undefined|function/;
    if (type !== "object" || obj === null) {
        if(type === 'symbol') return undefined;
        return theVeryOriginalReg.test(obj) ? undefined : String(obj) ;
    }else {
        const json = [];
        const isArray = Array.isArray(obj);
        const keys = Object.keys(obj); // 返回自身的所有可枚举的属性的键名
        for (let k of keys) {
            let valueStringfied = jsonStringify(obj[k]);
            if(theVeryOriginalReg.test(typeof obj[k])){
               valueStringfied = jsonStringify(null);//被转换成 null（出现在数组中时）
            }
            // patch : 模版字符
            if(/string/.test(typeof obj[k])){
                valueStringfied = `"${jsonStringify(obj[k])}"`;
            }
            json.push((isArray ? valueStringfied : `"${k}":${valueStringfied}`));
    }
        return isArray ? `[${json}]`:`{${json}}`
    }
}

jsonStringify({x : 5}) // "{"x":5}"
jsonStringify([1, "false", false]) // "[1,"false",false]"
jsonStringify({b: undefined}) // "{"b":undefined}"
