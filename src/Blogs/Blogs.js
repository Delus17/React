import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBlogsAsync } from '../api/blogs';
import Subscribe from './Subscribe/Subscribe';
import BlogCard from './BlogCard/BlogCard';

function Blogs() {
  const dispatch = useDispatch();

  const blogs = useSelector(state => state.blogs.blogs);

  useEffect(() => {
    dispatch(getBlogsAsync());
  }, [dispatch]);

  return (<>
    <h1>Блоги</h1>
    { blogs.map(x => <BlogCard key={x.id} blog={x} /> )}
    <Subscribe />
  </>);
}

export default Blogs;