const generateCode = function (codeLength) {
  let number = String(Math.random()).split(".")[1].split("");
  let code = "";
  let numberLength = number.length;

  if (!codeLength) {
    codeLength = 4;
  }

  for (let i = 0; i <= codeLength; i++) {
    code += number[numberLength - (i + 1)];
  }
  return code;
};
module.exports = generateCode;
