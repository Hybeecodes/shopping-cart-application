export interface ConfigInterface {
  get<T = any>(propertyPath: string): T | undefined;
}
