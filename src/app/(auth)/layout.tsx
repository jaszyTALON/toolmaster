export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full bg-[#020617] relative overflow-hidden">
      {/* Background gradient effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-gradient-to-br from-[#38bdf8]/10 via-transparent to-transparent blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[35vw] h-[35vw] rounded-full bg-gradient-to-tl from-[#f59e0b]/10 via-transparent to-transparent blur-[100px]" />
      </div>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
