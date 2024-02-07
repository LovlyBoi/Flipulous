export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="w-full">
      <div className="w-[1100px] mx-auto bg-slate-200 min-h-[100vh]">
        {children}
      </div>
    </div>
  )
}
