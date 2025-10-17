import { useRef, useState } from 'react';
import { addBlog } from '../../api/blogs';
import { v4 as uuid } from 'uuid'
import AdminMenu from "../AdminMenu/AdminMenu";

function AdminBlog() {
  const [saved, setSave] = useState(false);
  const titleRef = useRef(null);
  const previewRef = useRef(null);
  const textRef = useRef(null);  

  const sendBlog = async () => {
    setSave(false);
    const blog = {
      guid: uuid(),
      title: titleRef.current.value,
      preview: previewRef.current.value,
      text: textRef.current.value,
      comments: []
    }

    await addBlog(blog);
    setSave(true);
  }

  return (<>
    <h1 className={`${saved ? 'saved' : ''}`}>Добавление блога</h1>
    <div className='admin'>
      <div className='admin-input'>
        <label htmlFor='title'>Название</label>
        <input id='title' type='text' ref={titleRef} />
      </div>
      <div className='admin-input'>
        <label htmlFor='preview'>Превью</label>
        <textarea id='preview' ref={previewRef} rows='5' ></textarea>
      </div>
      <div className='admin-input'>
        <label htmlFor='text'>Текст</label>
        <textarea id='text' ref={textRef} rows='5' ></textarea>
      </div>
      <div>
        <button onClick={() => sendBlog()} style={{marginLeft: "50px", marginTop: "30px"}}>Отправить</button>
      </div>
    </div>
    <AdminMenu />
  </>)
}

export default AdminBlog;