export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="fixed inset-0 z-50"
      style={{
        height: "100vh",
        maxHeight: "100dvh",
        overscrollBehavior: "none",
      }}
    >
      {children}
    </div>
  );
}
