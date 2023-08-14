import { CouponProvider } from "./CouponContext";

const Layout = ({ children }) => {
  return (
    <CouponProvider>
      {/* Aquí puedes agregar otros componentes relacionados con el diseño si lo deseas */}
      {children}
    </CouponProvider>
  );
};

export default Layout;
