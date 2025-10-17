import { NavLink } from "react-router";

function BlogCard({ blog }) {
  return (<div>
    <h3>{blog.title}</h3>
    <p>{blog.preview}</p>
    <NavLink to={`/blogs/${blog.id}`}>Читать</NavLink>
  </div>);
}

export default BlogCard;