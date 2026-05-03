export type MayaColor = "red" | "white" | "blue" | "yellow";
export type MayaDirection = "east" | "north" | "west" | "south";

export interface Seal {
  number: number;
  nameJa: string;
  keyword: string;
  color: MayaColor;
  direction: MayaDirection;
  description: string;
}

export interface Tone {
  number: number;
  nameJa: string;
  keyword: string;
  description: string;
}

export interface KinResult {
  kin: number;
  seal: Seal;
  tone: Tone;
}

export interface FortuneText {
  today: string;
  thisMonth: string;
  thisYear: string;
  nextYear: string;
}

export const COLOR_LABEL: Record<MayaColor, string> = {
  red: "赤",
  white: "白",
  blue: "青",
  yellow: "黄",
};

export const DIRECTION_LABEL: Record<MayaDirection, string> = {
  east: "東",
  north: "北",
  west: "西",
  south: "南",
};

export const COLOR_HEX: Record<MayaColor, string> = {
  red: "var(--maya-red)",
  white: "var(--maya-white)",
  blue: "var(--maya-blue)",
  yellow: "var(--maya-yellow)",
};
