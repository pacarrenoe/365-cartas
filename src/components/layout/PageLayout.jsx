export default function PageLayout({ children }) {
  return (
    <div className="page">
      <main className="container">{children}</main>
    </div>
  );
}
