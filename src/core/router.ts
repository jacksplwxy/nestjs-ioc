import { Express, Router } from 'express';
import {
  CONTROLLER_METADATA,
  ROUTE_METADATA,
  PARAM_METADATA,
  PARSE_METADATA,
} from './controllerDecorators';
import { RouteType, handlerFactory } from './utils';
import IoCContainer from './IoCContainer';

const router = Router();

Object.values(IoCContainer).forEach(instance => {
  const controllerMetadata: string = Reflect.getMetadata(
    CONTROLLER_METADATA,
    instance.constructor,
  );

  const proto = Object.getPrototypeOf(instance);
  const routeNameArr = Object.getOwnPropertyNames(proto).filter(
    n => n !== 'constructor' && typeof proto[n] === 'function',
  );

  routeNameArr.forEach(routeName => {
    const routeMetadata: RouteType = Reflect.getMetadata(
      ROUTE_METADATA,
      proto[routeName],
    );

    const { type, path } = routeMetadata;
    const handler = handlerFactory(
      proto[routeName].bind(instance),
      Reflect.getMetadata(PARAM_METADATA, instance, routeName),
      Reflect.getMetadata(PARSE_METADATA, instance, routeName),
    );

    router[type](controllerMetadata + path, handler);
  });
});
export default router;
