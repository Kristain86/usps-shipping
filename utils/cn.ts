type ClassValue =
  | ClassArray
  | ClassDictionary
  | string
  | number
  | bigint
  | null
  | boolean
  | undefined;
type ClassDictionary = Record<string, unknown>;
type ClassArray = ClassValue[];

function clsx(inputs: ClassValue[]) {
  let i = 0;
  let tmp;
  let str = "";
  const len = inputs.length;
  for (; i < len; i += 1) {
    tmp = inputs[i];
    if (tmp) {
      if (typeof tmp === "string") {
        str += (str && " ") + tmp;
      }
    }
  }
  return str;
}

/**
 *
 * @param {string[]} inputs
 * @returns {string}
 */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}
