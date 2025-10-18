import { NavLink } from "react-router";

function AdminMenu() {
  return (
    <div style={{marginTop: '20px'}}>
      <NavLink style={{marginLeft: '20px'}} to="/">На сайт</NavLink>
      <NavLink style={{marginLeft: '20px'}} to="/admin/services">Добавить услугу</NavLink>
      <NavLink style={{marginLeft: '20px'}} to="/admin/blogs">Добавить блог</NavLink>
      <NavLink style={{marginLeft: '20px'}} to="/admin/examples">Добавить пример в галерею</NavLink>
    </div>);
}

export default AdminMenu;