function StatsCard({ title, value, color }) {
  return (
    <div className="
      bg-white
      rounded-2xl
      p-6
      shadow-md
      hover:shadow-xl
      hover:-translate-y-1
      transition-all duration-300
      border
    ">
      <h2 className="text-gray-500 font-medium">
        {title}
      </h2>

      <p className={`text-5xl font-bold mt-4 ${color}`}>
        {value ?? 0}
      </p>
    </div>
  );
}

export default StatsCard;