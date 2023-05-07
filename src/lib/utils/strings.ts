export function genNumericalCode(length: number) {
  let code = '';
  for (let i = 0; i < length; ++i)
    code += Math.floor(Math.random() * 10);
  return code;
}

const AlphaNumericChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

export function genAlphaNumericCode(length: number) {
  let code = '';
  for (let i = 0; i < length; ++i)
    code += AlphaNumericChars.charAt(Math.floor(Math.random() * AlphaNumericChars.length))
  return code;
}
