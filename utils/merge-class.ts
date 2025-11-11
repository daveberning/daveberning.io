import { twMerge } from "tailwind-merge";

type ClassValue =
  | string
  | number
  | null
  | undefined
  | boolean
  | ClassDictionary
  | ClassArray;
interface ClassDictionary {
  [id: string]: boolean | null | undefined;
}
interface ClassArray extends Array<ClassValue> {}

const stringify = (value: ClassValue): string => {
  if (!value) return "";
  if (typeof value === "string") return value;
  if (typeof value === "number") return value === 0 ? "" : String(value);
  if (Array.isArray(value)) {
    return value.map(stringify).filter(Boolean).join(" ");
  }
  if (typeof value === "object") {
    return Object.entries(value)
      .filter(([, active]) => Boolean(active))
      .map(([key]) => key)
      .join(" ");
  }
  return "";
};

export const mergeClass = (...inputs: ClassValue[]): string => {
  const base = inputs.map(stringify).filter(Boolean).join(" ").trim();
  return base ? twMerge(base) : "";
};
