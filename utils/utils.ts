import qs from 'qs';

// 判断数组是非含falsy元素
export function hasEmptyInArray(array: Array<string>) {
  return array.some(x => !x);
}


export function getPropFromSearch(prop: string) {
  return qs.parse(window.location.search, { ignoreQueryPrefix: true })[prop];
}


export function redirect(url: string) {
  window.location.replace(decode(url));
}

export function decode(url: string): string {
  return decodeURIComponent(url);
}

