export const setUserInfo = ({
  isAdmin = true,
  result = [],
  token = '',
}) => {
  localStorage.setItem(
    'userInfo',
    JSON.stringify({
      result,
      token,
      isAdmin,
    })
  );
};

export const getUserInfo = () => {
  return localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : { token: '' };
};
