export const PASSWORD_MIN_LENGTH = 4;

// 숫자,소문자,대문자,특수문자 조합 비밀번호
export const PASSWORD_REGEX = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).+$/,
);
