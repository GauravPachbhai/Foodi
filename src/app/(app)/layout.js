export default async function RootLayout({ children }) {
  return (
    <div className="grid flex-col min-h-screen">
      {children}
    </div>
  );
}