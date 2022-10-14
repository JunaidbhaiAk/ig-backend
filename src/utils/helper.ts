export const getSum = (arr: Array<any>): number => {
  return arr.reduce((pre, { total }) => pre + Number(total), 0);
};
