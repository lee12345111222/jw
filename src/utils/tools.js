export const dropUndefinedFromObj = (obj) =>
  Object.entries(obj)
    .filter(([, v]) => v !== undefined)
    .reduce((pre, [k, v]) => ({ ...pre, [k]: v }), {});
