export const hexToRgb = hex => {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;

  hex = hex.replace(shorthandRegex, (m: string, r: string, g: string, b: string) => {
    return r + r + g + g + b + b;
  });

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  return result
    ? `${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)}`
    : null;
};

export const createSort = sortBy => {
  let sortKey: Array<string> = [];
  let sortOrder: Array<string> = [];
  if (sortBy.length) {
    for (let i = 0; i < sortBy.length; i++) {
      sortKey.push(sortBy[i].key);
      sortOrder.push(sortBy[i].order);
    }
  } else {
    // add createdAt as default sort
    sortKey.push("createdAt");
    sortOrder.push("desc");
  }
  // merge sorkKey and sortOrder a dict
  return { sortKey: sortKey.join(), sortOrder: sortOrder.join() };
};

export const injectDialogKey = Symbol();
