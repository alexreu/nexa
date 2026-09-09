import {
  History,
  ShieldCheck,
  Sparkles,
  Users,
  Workflow,
  Zap,
  type LucideIcon,
} from "lucide-react";

export type Feature = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export const features: Feature[] = [
  {
    title: "Automatisations intelligentes",
    description:
      "Construisez des workflows capables de prendre des décisions selon vos données.",
    icon: Workflow,
  },
  {
    title: "Connexions instantanées",
    description: "Connectez vos outils en quelques clics.",
    icon: Zap,
  },
  {
    title: "Nexa AI",
    description: "Transformez une instruction naturelle en workflow.",
    icon: Sparkles,
  },
  {
    title: "Historique complet",
    description: "Visualisez chaque action réalisée automatiquement.",
    icon: History,
  },
  {
    title: "Collaboration",
    description: "Partagez les workflows avec votre équipe.",
    icon: Users,
  },
  {
    title: "Sécurité",
    description: "Vos données restent chiffrées et isolées.",
    icon: ShieldCheck,
  },
];
