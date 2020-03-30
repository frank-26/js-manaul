import { createBrowserHistory } from 'history';
import qs from 'qs';

// 判断数组是非含falsy元素
export function hasEmptyInArray(array: Array<string>) {
  return array.some(x => !x);
}

export const history = createBrowserHistory();

export function getPropFromSearch(prop: string) {
  return qs.parse(window.location.search, { ignoreQueryPrefix: true })[prop];
}

export function priceFormat(price: number) {
  return !~price ? '-' : (price / 100).toFixed(2);
}

export function redirect(url: string) {
  window.location.replace(decode(url));
}

export function decode(url: string): string {
  return decodeURIComponent(url);
}

export function preventDefault(e: Event) {
  e.preventDefault();
}

export function isBundleCustomPropertyCode(value: string) {
  value = value.trim();
  const reg = /^[^0-9][A-Za-z0-9_]{0,}/gi;
  return reg.test(value);
}

export function isBundleCustomPropertyCodeValueId4FE(value: string) {
  value = value.trim();
  return /^_/g.test(value);
}
