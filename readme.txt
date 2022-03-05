* 理论基础：
  常见的nodejs框架如express、koa都有一个非常大的缺点，那就是缺少架构，以至于我们想怎么写就可以怎么写，非常不利于多人参与的大型应用代码的编写。
  而nestjs框架能够很好的解决架构问题，允许开发人员和团队创建高度可测试，可扩展，松散耦合且易于维护的应用程序。
  nestjs框架解决架构问题的核心理论基础是基于7大设计原则中依赖倒置原则（详见：https://github.com/jacksplwxy/DesignPatterns_TypeScript）。
  依赖倒置原则告诉我们模块间的依赖不应该通过具体产生，而应该通过抽象产生。具体和抽象都是相对的概念，例如水果相对于食物来说是具体，而水果相对香蕉来说又是抽象；对应到编程世界，对象是具体，类是对象的抽象，抽象类或接口又是类的抽象。依赖倒置原则告诉我们模块间的依赖不应该通过具体产生的意思就是对象与对象不要直接相互调用，因为越抽象的代码适应性越强，越容易改。
  我们编写代码时可以编写抽象之间的关系，但是在运行时，关系还是发生在具体对象上，而抽象的实例化由控制反转容器(IoC Container)统一处理，本项目将实现简易IoC容器，相关代码在src/core中
  
  
* 实现原理：
  刚开始接触nestjs的小伙伴会对代码中大量出现的@xxx这样的装饰器（Decorator）写法非常不适应，实际上这种写法在java spring相关框架中大量使用，只是java中使用的是注解（Annotation）。
  由于ts中的装饰器并不能提供任何附加元数据的功能，Decorator的意义仅仅是作为语法糖把函数调用写的更好看而已，而要想给类或方法附加元数据，必须借助Reflect.metadata来实现。而nestjs的原理正式利用Decorator + Reflect.metadata的组合来模拟Annotation的功能。
  核心原理代码：
  class Service1 {
    name = 'i am service1';
  }
  class Service2 {
    name = 'i am service2'
  }
  class Controller {
    constructor(public readonly service1: Service1,public readonly service2: Service2) {}
    printService1() {
      console.log(this.service1.name);  //service1不用new即可作为对象实例使用
    }
    printService2() {
      console.log(this.service2.name);  //service2不用new即可作为对象实例使用
    }
  }
  //工厂方法
  const Factory = <T>(target: Constructor<T>): T => {
    // 获取所有注入的服务
    const providers = Reflect.getMetadata('design:paramtypes', target);   // 利用反射获取Controller的构造函数中所有参数
    const args = providers.map((provider: Constructor) => new provider());  //所有服务类在这里被实例化，而不是业务代码中
    return new target(...args);
  };
  //验证
  let controller= Factory(Controller)
  controller.printService1(); //i am service1
  controller.printService2(); //i am service2


* 快速开始：
  1、npm i  //安装依赖
  2、ts-node src/index.ts   //启动项目
  3、http://localhost:8080/index  //返回{"code":200,"id":null,"message":"success"}，表明启动成功


* 参考文档：
  · 《Reflect Metadata》：https://jkchao.github.io/typescript-book-chinese/tips/metadata.html
  · 《注解与装饰器的点点滴滴》：https://zhuanlan.zhihu.com/p/22277764