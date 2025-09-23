export const getCurrentRouteName = (pathname: string) => {
  return pathname.split("/").pop();
};
