export type Stat = {
  value: number;
  /** Decimals to keep when formatting, including mid-animation. */
  decimals: number;
  suffix?: string;
  label: string;
};

export const stats: Stat[] = [
  { value: 2.4, decimals: 1, suffix: " M", label: "tâches automatisées" },
  { value: 38, decimals: 0, suffix: " %", label: "de temps gagné" },
  { value: 12000, decimals: 0, label: "utilisateurs" },
  { value: 99.99, decimals: 2, suffix: " %", label: "de disponibilité" },
];
