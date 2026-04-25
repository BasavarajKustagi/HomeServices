import { ShieldCheck, Star, Clock, Award } from "lucide-react";

interface TrustBadgeProps {
  type: "verified" | "rating" | "warranty" | "emergency";
  value?: string | number;
  size?: "sm" | "md";
}

const config = {
  verified: {
    icon: ShieldCheck,
    label: "BG Verified",
    color: "text-green-600 bg-green-50 border-green-200",
  },
  rating: {
    icon: Star,
    label: "Top Rated",
    color: "text-yellow-600 bg-yellow-50 border-yellow-200",
  },
  warranty: {
    icon: Award,
    label: "90-Day Warranty",
    color: "text-blue-600 bg-blue-50 border-blue-200",
  },
  emergency: {
    icon: Clock,
    label: "2-Hr Ready",
    color: "text-red-600 bg-red-50 border-red-200",
  },
};

export default function TrustBadge({ type, value, size = "sm" }: TrustBadgeProps) {
  const { icon: Icon, label, color } = config[type];
  const isSmall = size === "sm";

  return (
    <span
      className={`inline-flex items-center gap-1 border rounded-full font-medium ${color} ${
        isSmall ? "text-xs px-2 py-0.5" : "text-sm px-3 py-1"
      }`}
    >
      <Icon className={isSmall ? "w-3 h-3" : "w-4 h-4"} />
      {value ?? label}
    </span>
  );
}
