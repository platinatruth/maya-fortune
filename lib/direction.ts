import { MayaDirection } from "./types";

const DIRECTION_OPPOSITE: Record<MayaDirection, MayaDirection> = {
  east: "west",
  west: "east",
  north: "south",
  south: "north",
};

export type CompassDirection =
  | "N"
  | "NE"
  | "E"
  | "SE"
  | "S"
  | "SW"
  | "W"
  | "NW";

export function bearingToCompass(bearing: number): CompassDirection {
  const b = ((bearing % 360) + 360) % 360;
  const dirs: CompassDirection[] = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  return dirs[Math.round(b / 45) % 8];
}

export function compassToCardinal(c: CompassDirection): MayaDirection {
  if (c === "N" || c === "NE" || c === "NW") return "north";
  if (c === "S" || c === "SE" || c === "SW") return "south";
  if (c === "E") return "east";
  return "west";
}

export type DirectionRelation = "amplify" | "balance" | "challenge";

const RELATION_LABEL: Record<DirectionRelation, string> = {
  amplify: "強化（紋章エネルギーを伸ばす土地）",
  balance: "調和（陰陽バランスを取る土地）",
  challenge: "挑戦（新しい変化をもたらす土地）",
};

const RELATION_DESC: Record<DirectionRelation, string> = {
  amplify:
    "あなたが本来持つエネルギーが最も伸びる方位。実力を発揮しやすく、本領を現せる土地です。",
  balance:
    "陰陽のバランスを取る対極の土地。自分の弱点を補完し、内省と成熟をもたらします。",
  challenge:
    "新しい刺激と挑戦を促す土地。変化を求めるとき、停滞を破りたいときに力を貸します。",
};

export function evaluateDirection(
  sealDirection: MayaDirection,
  livingDirection: MayaDirection,
): { relation: DirectionRelation; label: string; description: string } {
  let relation: DirectionRelation;
  if (sealDirection === livingDirection) {
    relation = "amplify";
  } else if (DIRECTION_OPPOSITE[sealDirection] === livingDirection) {
    relation = "balance";
  } else {
    relation = "challenge";
  }
  return {
    relation,
    label: RELATION_LABEL[relation],
    description: RELATION_DESC[relation],
  };
}

export function bearingFromTo(
  from: { lat: number; lon: number },
  to: { lat: number; lon: number },
): number {
  const toRad = (x: number) => (x * Math.PI) / 180;
  const toDeg = (x: number) => (x * 180) / Math.PI;
  const φ1 = toRad(from.lat);
  const φ2 = toRad(to.lat);
  const Δλ = toRad(to.lon - from.lon);
  const y = Math.sin(Δλ) * Math.cos(φ2);
  const x =
    Math.cos(φ1) * Math.sin(φ2) -
    Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);
  return (toDeg(Math.atan2(y, x)) + 360) % 360;
}
