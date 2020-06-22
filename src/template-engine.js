function render(template, data) {
  const reg = /\{\{(\w+)\}\}/; 
  if (reg.test(template)) { 
    const prop = reg.exec(template)[1]; 
    template = template.replace(reg, data[prop]); 
    return render(template, data); 
  }
  return template; 
}

function renderPro(template, data) {
  const reg = /\{\{(\w+)\}\}/g; 
  // while(reg.test(template)){
  //   const prop = reg.exec(template)[1]; 
  //   template = template.replace(reg, data[prop]); 
  // }
  // return template; 

  return template.replace(reg,$0=>data[$0.replace(/\{|\}/g,'')])
}

let template = '我是{{name}}，年龄{{age}}，性别{{sex}}';
let data = {
  name: '姓名',
  age: 18
}

console.log(renderPro(template, data)); // 我是姓名，年龄18，性别undefined