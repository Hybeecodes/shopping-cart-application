export interface ConfigInterface {
  get<T = any>(propertyPath: string,  defaultValue?: T): T | undefined;
}
