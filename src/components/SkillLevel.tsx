interface SkillLevelProps {
  level: 1 | 2 | 3;
  label?: boolean;
}

const levels = {
  1: { label: "Apprentice", color: "bg-slate-300", activeColor: "bg-slate-400" },
  2: { label: "Journeyman", color: "bg-blue-200", activeColor: "bg-blue-500" },
  3: { label: "Master", color: "bg-amber-200", activeColor: "bg-amber-500" },
};

export default function SkillLevel({ level, label = true }: SkillLevelProps) {
  const config = levels[level];
  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-1">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className={`h-2 w-6 rounded-full ${i <= level ? config.activeColor : "bg-slate-200"}`}
          />
        ))}
      </div>
      {label && (
        <span className="text-xs font-medium text-slate-600">{config.label}</span>
      )}
    </div>
  );
}
