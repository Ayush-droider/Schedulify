import { ArrowUpRight } from "lucide-react";

function StatsCard({
  title,
  value,
  icon: Icon,
  iconBg = "bg-blue-100",
  iconColor = "text-blue-600",
  subtitle,
}) {
  return (
    <div
      className="
      bg-white
      rounded-2xl
      border
      border-slate-200
      p-6
      shadow-sm
      hover:shadow-lg
      hover:-translate-y-1
      transition-all
      duration-300
    "
    >
      <div className="flex items-center justify-between">

        <div
          className={`h-12 w-12 rounded-xl ${iconBg} flex items-center justify-center`}
        >
          {Icon && <Icon className={iconColor} size={24} />}
        </div>

        <ArrowUpRight
          className="text-slate-300"
          size={18}
        />

      </div>

      <p className="mt-6 text-sm font-medium text-slate-500">
        {title}
      </p>

      <h2 className="mt-2 text-4xl font-bold text-slate-800">
        {value ?? 0}
      </h2>

      {subtitle && (
        <p className="mt-2 text-sm text-slate-400">
          {subtitle}
        </p>
      )}
    </div>
  );
}

export default StatsCard;