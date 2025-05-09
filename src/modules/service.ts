export class BaseService {
  _makeMethodsFinal(methods: any) {
    for (const methodName in methods) {
      Object.defineProperty(this, methodName, {
        writable: false,
        configurable: false,
        value: methods[methodName]
      });
    }
  }
}