import {camelCase, kebabCase, lowerCase, snakeCase, startCase, upperCase, upperFirst} from 'lodash';

export default class StringUtility {

  static toCamelCase(str: any) {
    return camelCase(str);
  }

  static toTitleCase(str: any) {
    return startCase(camelCase(str));
  }

  static toPascalCase(str: any) {
    return startCase(camelCase(str)).replace(/ /g, '');
  }

  static toConstantCase(str: any) {
    return upperCase(str).replace(/ /g, '_');
  }

  static toDotCase(str: any) {
    return lowerCase(str).replace(/ /g, '.');
  }

  static toKebabCase(str: string) {
    return kebabCase(str);
  }

  static toLowerCase(str: any) {
    return lowerCase(str).replace(/ /g, '');
  }

  static toPathCase(str: any) {
    return lowerCase(str).replace(/ /g, '/');
  }

  static toSnakeCase(str: any) {
    return snakeCase(str);
  }

  static toSentenceCase(str: any) {
    return upperFirst(lowerCase(str));
  }

}