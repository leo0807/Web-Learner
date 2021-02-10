let accessToken = "";
// 使用setter和getter方法 访问accessToken
export const setAccessToken = (s: string) => {
  accessToken = s;
};

export const getAccessToken = () => {
  return accessToken;
};
