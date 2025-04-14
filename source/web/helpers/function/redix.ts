export function decimalToBinary(oct: string) {
  let binary = "";
  let decimal = parseInt(oct, 10);
  while (decimal > 0) {
    binary = (decimal % 2) + binary;
    decimal = Math.floor(decimal / 2);
  }
  return binary;
}

export function binaryToDecimal(binary: string) {
  return parseInt(binary, 2);
}
