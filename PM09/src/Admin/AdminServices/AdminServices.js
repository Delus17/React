import { useRef, useState } from 'react';
import { addFile } from '../../api/file';
import { addService } from '../../api/services';
import AdminMenu from "../AdminMenu/AdminMenu";

function AdminServices() {
  const [saved, setSave] = useState(false);
  const nameRef = useRef(null);
  const descriprionRef = useRef(null);
  const priceRef = useRef(null);
  const mesurementRef = useRef(null);
  const fileRef = useRef(null);

  const sendForm = async () => {
    setSave(false);
    const file = fileRef.current.files[0];

    if (!file) {
      return;
    }

    const filePath = await addFile(file);

    const service = {
      name: nameRef.current.value,
      descriprion: descriprionRef.current.value,
      price: priceRef.current.value,
      mesurement: mesurementRef.current.value,
      img: `/statics/${filePath}`,
    }

    await addService(service);
    setSave(true);
  }

  return (<>
    <h1 className={`${saved ? 'saved' : ''}`}>Добавление услуг</h1>
    <div className='admin'>
      <div className='admin-input'>
        <label htmlFor='name'>Название</label>
        <input id='name' type='text' ref={nameRef} />
      </div>
      <div className='admin-input'>
        <label htmlFor='descriprion'>Описание</label>
        <textarea id='descriprion' ref={descriprionRef} rows='5' ></textarea>
      </div>
      <div className='admin-input'>
        <label htmlFor='price'>Цена</label>
        <input id='price' type='text' ref={priceRef} />
      </div>
      <div className='admin-input'>
        <label htmlFor='mesurement'>Единица работы</label>
        <input id='mesurement' type='text' ref={mesurementRef} />
      </div>
      <div className='admin-input'>
        <label htmlFor='file'>Картинка</label>
        <input id='file' type='file' ref={fileRef} accept=".webp,.jpg,.jpeg,.png,.gif" />
      </div>
      <div>
        <button onClick={() => sendForm()} style={{marginLeft: "50px", marginTop: "30px"}}>Отправить</button>
      </div>
    </div>
    <AdminMenu />
  </>)
}

export default AdminServices;