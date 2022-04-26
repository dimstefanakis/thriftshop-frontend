import Header from "../Header";

interface Layout {
  children: React.ReactNode;
}

function Layout({ children }: Layout) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}

export default Layout;
