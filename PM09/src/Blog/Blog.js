import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBlogAsync } from '../api/blogs';
import { useParams } from "react-router";
import Comment from './Comment/Comment';
import AddComment from './AddComment/AddComment';

function Blog() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const blog = useSelector(state => state.blogs.blog);
  const comments = useSelector(state => state.blogs.comments);
  
  useEffect(() => {
    dispatch(getBlogAsync(id));
  }, [dispatch, id]);

  return (<>
    <h1>{ blog.title }</h1>
    <p>{ blog.text }</p>
    <h2>Комментарии</h2>
    { comments?.map((x, index) => <Comment key={index} comment={x} />) }
    <AddComment id={id} />
  </>);
}

export default Blog;