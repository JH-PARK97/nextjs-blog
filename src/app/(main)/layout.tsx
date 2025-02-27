export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div>헤더</div>
      컨텐츠
      {children}
      <div>푸터</div>
    </>
  );
}
