export function getClassMethodsNames(obj: any): string[] {
  const methods: string[] = [];
  const instance = new obj();
  const prototype = Reflect.getPrototypeOf(instance);
  Reflect.ownKeys(prototype).forEach(k =>
    methods.push(typeof k === 'symbol' ? k.toString() : k + '')
  );

  return methods;
}
