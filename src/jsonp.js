function JSONP({  
  url,
  params,
  callbackKey,
  callback
}) {
  // 在参数里制定 callback 的名字
  params = params || {}
  params[callbackKey] = 'jsonpCallback'
    // 预留 callback
  window.jsonpCallback = callback
    // 拼接参数字符串
  const paramKeys = Object.keys(params)
  const paramString = paramKeys
    .map(key => `${key}=${params[key]}`)
    .join('&')
    // 插入 DOM 元素
  const script = document.createElement('script')
  script.setAttribute('src', `${url}?${paramString}`)
  document.body.appendChild(script)
}

JSONP({  
  url: 'https://s.weibo.com/ajax/jsonp/suggestion',
  params: {
    key: 'test',
  },
  callbackKey: '_cb',
  callback(result) {
    console.log(result.data)
  }
})