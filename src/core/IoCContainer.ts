import * as fs from 'fs'
import { resolve } from 'path'
import { CONTROLLER_METADATA } from './controllerDecorators'
import { Factory } from './providerFactory'

// 启动时扫描所有文件，获取定义的类，根据元数据进行绑定
let IoCContainer = {}
const path = 'src/controllers'
const list = fs.readdirSync(path)
for (const file of list) {
  if (/\.ts$/.test(file)) {
    const exports = require(resolve(path, file))
    for (const m in exports) {
      const module = exports[m]
      if (typeof module === 'function') {
        const metadata = Reflect.getMetadata(CONTROLLER_METADATA, module) || '/'
        let instance = Factory(module)
        if (instance) {
          IoCContainer[metadata] = instance
        }
      }
    }
  }
}
export default IoCContainer

