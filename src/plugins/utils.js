export const Utils = {
    isObject: (object) => object !== undefined && typeof object === 'object' &&  Object.keys(object).length > 0,
};