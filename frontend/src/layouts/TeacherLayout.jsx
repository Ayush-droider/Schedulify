export default function TeacherLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="p-8">
        {children}
      </div>
    </div>
  );
}