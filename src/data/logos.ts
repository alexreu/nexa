export type LogoShape =
  "meridian" | "northstar" | "vertex" | "halo" | "orbit" | "frame";

export type BrandLogo = {
  name: string;
  shape: LogoShape;
};

/** Invented companies — no real brand is referenced anywhere on the page. */
export const socialProofLogos: BrandLogo[] = [
  { name: "Meridian", shape: "meridian" },
  { name: "Northstar", shape: "northstar" },
  { name: "Vertex", shape: "vertex" },
  { name: "Halo", shape: "halo" },
  { name: "Orbit", shape: "orbit" },
  { name: "Frame", shape: "frame" },
];
