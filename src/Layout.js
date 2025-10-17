import './css/main.css';
import { Outlet } from "react-router";
import Header from './Header/Header';

function Layout() {
  return (<>
    <Header />
    <div style={{ padding: '20px' }}>
    <Outlet />
    </div>
  </>);
}
  
export default Layout;