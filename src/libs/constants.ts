export const PASSWORD_MIN_LENGTH = 4;

export const WORDS_MAX_LENGTH = 30;

export const PASSWORD_REGEX_ERROR = "숫자, 소문자, 대문자, 특수문자를 조합해주세요."

export const PASSWORD_CONFIRM_ERROR = "두 비밀번호가 일치하지 않습니다."

export const PASSWORD_REQUIRED_ERROR = "비밀번호를 입력해주세요."

export const USERID_REQUIRED_ERROR = "아이디를 입력해주세요."

// 숫자,소문자,대문자,특수문자 조합 비밀번호
export const PASSWORD_REGEX = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).+$/,
);
