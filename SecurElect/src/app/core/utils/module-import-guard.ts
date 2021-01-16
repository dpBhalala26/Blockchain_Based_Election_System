export function throwErrorIfAlreadyLoaded(
  parentModule: any,
  moduleName: string
) {
  if (parentModule) {
    throw new Error(`*** ${moduleName} is already loaded.***`);
  }
}
