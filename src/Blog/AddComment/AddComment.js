import './addComment.css';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { sendComment } from '../../api/blogs';
import { addComment } from '../../store/blogStore';

function AddComment({ id }) {
  const textareaRef = useRef();
  const dispatch = useDispatch();

  const sendAsync = () => {
    const text = textareaRef.current.value;

    if (!text) {
      return;
    }

    sendComment(id, text);
    dispatch(addComment(text));
    textareaRef.current.value = '';
  }

  return (<div className='new-comment'>
    <textarea className="add-comment" ref={textareaRef}></textarea>
    <button onClick={() => sendAsync()}>Отправить</button>
  </div>);
}

export default AddComment;