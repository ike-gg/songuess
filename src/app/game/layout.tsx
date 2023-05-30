export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div id="game">{children}</div>;
}
