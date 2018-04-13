/**
 * 在O（N）中比较两个列表。
 * @param {Array} oldList - 原始列表
 * @param {Array} newList - 列表在某些插入，删除或移动之后
 * @return {Object} - {moves: <Array>}
 *                  - 移动是指示如何移除和插入的操作列表
 */
function diff (oldList, newList, key) {
    var oldMap = makeKeyIndexAndFree(oldList, key)
    var newMap = makeKeyIndexAndFree(newList, key)
  
    var newFree = newMap.free
  
    var oldKeyIndex = oldMap.keyIndex
    var newKeyIndex = newMap.keyIndex
  
    var moves = []
  
    // 一个模拟列表来操作
    var children = []
    var i = 0
    var item
    var itemKey
    var freeIndex = 0
  
    // 首先检查旧列表中的项目：是否删除
    while (i < oldList.length) {
      item = oldList[i]
      itemKey = getItemKey(item, key)
      if (itemKey) {
        if (!newKeyIndex.hasOwnProperty(itemKey)) {
          children.push(null)
        } else {
          var newItemIndex = newKeyIndex[itemKey]
          children.push(newList[newItemIndex])
        }
      } else {
        var freeItem = newFree[freeIndex++]
        children.push(freeItem || null)
      }
      i++
    }
  
    var simulateList = children.slice(0)
  
    // 删除项目不再存在
    i = 0
    while (i < simulateList.length) {
      if (simulateList[i] === null) {
        remove(i)
        removeSimulate(i)
      } else {
        i++
      }
    }
  
    // i是光标指向新列表中的项目
    // j是指向模拟列表中的项目的光标
    var j = i = 0
    while (i < newList.length) {
      item = newList[i]
      itemKey = getItemKey(item, key)
  
      var simulateItem = simulateList[j]
      var simulateItemKey = getItemKey(simulateItem, key)
  
      if (simulateItem) {
        if (itemKey === simulateItemKey) {
          j++
        } else {
          // 新的项目，只是inesrt它
          if (!oldKeyIndex.hasOwnProperty(itemKey)) {
            insert(i, item)
          } else {
            // 如果删除当前的simulateItem使项目item在正确的位置
            // 然后删除它
            var nextItemKey = getItemKey(simulateList[j + 1], key)
            if (nextItemKey === itemKey) {
              remove(i)
              removeSimulate(j)
              j++ //删除后，当前j是正确的，只是跳到下一个
            } else {
              // 插入项目item
              insert(i, item)
            }
          }
        }
      } else {
        insert(i, item)
      }
  
      i++
    }
  
    //如果j没有移除到最后，则移除所有其余项目
    var k = simulateList.length - j
    while (j++ < simulateList.length) {
      k--
      remove(k + i)
    }
  
  
    function remove (index) {
      var move = {index: index, type: 0}
      moves.push(move)
    }
  
    function insert (index, item) {
      var move = {index: index, item: item, type: 1}
      moves.push(move)
    }
  
    function removeSimulate (index) {
      simulateList.splice(index, 1)
    }
  
    return {
      moves: moves,
      children: children
    }
  }
  
  /**
   * 将列表转换为键项keyIndex对象。
   * @param {Array} list
   * @param {String|Function} key
   */
  function makeKeyIndexAndFree (list, key) {
    var keyIndex = {}
    var free = []
    for (var i = 0, len = list.length; i < len; i++) {
      var item = list[i]
      var itemKey = getItemKey(item, key)
      if (itemKey) {
        keyIndex[itemKey] = i
      } else {
        free.push(item)
      }
    }
    return {
      keyIndex: keyIndex,
      free: free
    }
  }
  
  function getItemKey (item, key) {
    if (!item || !key) return void 666
    return typeof key === 'string'
      ? item[key]
      : key(item)
  }
  
  exports.makeKeyIndexAndFree = makeKeyIndexAndFree // exports for test
  exports.diff = diff