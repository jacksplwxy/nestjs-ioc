
import 'reflect-metadata';

type Constructor<T = any> = new (...args: any[]) => T;
const Injectable = (): ClassDecorator => target => { };

export const Factory = <T>(target: Constructor<T>): T => {
  // 获取所有注入的服务
  const providers = Reflect.getMetadata('design:paramtypes', target); // 获取TestService构造函数中的参数
  if (providers) {
    const args = providers.map((provider: Constructor) => new provider());  //将参数实例化
    return new target(...args);
  } else {
    return null
  }

};

