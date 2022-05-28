import { useRouter } from "next/router";
import Header from "../Header";
import Footer from "../Footer";

interface Layout {
  children: React.ReactNode;
}

function Layout({ children }: Layout) {
  const router = useRouter();
  return (
    <>
      <Header />
      {children}
      {router.pathname !== "/" && <Footer />}
    </>
  );
}

export default Layout;
