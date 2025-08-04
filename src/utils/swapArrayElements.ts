export const swapArrayElements = <T>(
  arr: T[],
  index1: number,
  index2: number
) => {
  if (
    index1 < 0 ||
    index1 >= arr.length ||
    index2 < 0 ||
    index2 >= arr.length
  ) {
    throw new Error("Invalid indexes");
  }

  const newArr = [...arr]; // Create a shallow copy to avoid mutation
  const [element] = newArr.splice(index1, 1); // Remove the element at index1
  newArr.splice(index2, 0, element); // Insert it at index2

  return newArr;
};
