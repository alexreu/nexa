import {
  Braces,
  Calendar,
  Contact,
  FileText,
  Mail,
  MessageSquare,
  Table,
  Webhook,
  type LucideIcon,
} from "lucide-react";

export type Integration = {
  name: string;
  category: string;
  icon: LucideIcon;
};

/**
 * Generic categories drawn with neutral icons rather than real product
 * logos, which are trademarked.
 */
export const integrations: Integration[] = [
  { name: "Email", category: "Communication", icon: Mail },
  { name: "Calendar", category: "Planification", icon: Calendar },
  { name: "Slack", category: "Communication", icon: MessageSquare },
  { name: "Notion", category: "Documentation", icon: FileText },
  { name: "CRM", category: "Ventes", icon: Contact },
  { name: "Sheets", category: "Données", icon: Table },
  { name: "Webhook", category: "Développeurs", icon: Webhook },
  { name: "API", category: "Développeurs", icon: Braces },
];

export const integrationsCount = "Plus de 100 intégrations disponibles.";
