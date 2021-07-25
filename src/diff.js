// https://github.com/phenomLi/Blog/issues/24
// 最右访问位置算法

/**
 * diff函数
 * @param {any} newList 新数组
 * @param {any} oldList 旧数组
 */
 const diff = function(newList, oldList) {
    // lastIndex：即访问过元素的最右下标
    let lastIndex = 0;

    // 遍历新数组
    for(let i = 0, len = newList.length; i < len; i++) {
        // 查找当前元素在旧数组的下标
        let index = getIndex(newList[i], oldList);

        // 若该元素在旧数组中存在
        if(index !== -1) {
            // 若该元素在旧数组的下标小于最右下标lastIndex
            if(index < lastIndex) {
                // 移动元素：from index to i
                move(newList[i], i, index);
            }

            // 更新lastIndex，取index和lastIndex的较大者
            lastIndex = Math.max(index, lastIndex);
        }
        // 若该元素不在旧数组，说明这是个新加入元素
        else {
            // 插入元素：append to i
            append(newList[i], i);
        }
    }

    // 遍历旧数组
    for(let i = 0, len = oldList.length; i < len; i++) {
        // 若发现当前元素在新数组中不存在，说明这个元素需要移除
        if(getIndex(oldList[i], newList) === -1) {
            // 移除元素：remove from i
            remove(oldList[i], i);
        }
    }
}

const [oldList,newList] = [[1,2,3,4].map(fn), [2,1,4,3].map(fn)]


/**
 * 找出元素在数组的下标，找不到返回-1
 * @param {T} item 要找的元素
 * @param {Array<T>} list 目标数组
 */
const getIndex = function(item, list) {
    // 对比key
    return list.findIndex(i => i.key === item.key);
}

const move = function(item, newPos, oldPos) {
    console.log(`${item.val} move from ${oldPos} to ${newPos}`);
    [oldList[newPos],oldList[oldPos]] = [oldList[oldPos],oldList[newPos]]
}


const append = function(item, pos) {
    oldList[pos]=item
    console.log(`${item.val} append on ${pos}`);
}


const remove = function(item, pos) {
    oldList.splice[pos,1]
    console.log(`${item.val} delete on ${pos}`);
}


function fn(item) {
    return ({
        key:item,
        val:item
    })
}

diff(newList,oldList)
console.log('oldList: ', oldList);
