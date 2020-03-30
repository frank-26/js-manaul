type StringArray = Array<string>;

const DEFAULTOCCUPYSTRING = '-';

export function VMProxy(target: StringArray) {
  const handler = {
    get(target: StringArray, prop: number) {
      return Reflect.get(target, prop) || DEFAULTOCCUPYSTRING;
    }
  };
  return new Proxy(target, handler);
}

export function VMMapProxy(target: Map<string | number, string>) {
  return (key: string | number) => target.get(key) || DEFAULTOCCUPYSTRING;
}
