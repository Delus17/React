import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from 'react';
import { addFile } from '../../api/file';
import getServicesAsync from '../../api/services';
import { addExample } from '../../api/examples';
import AdminMenu from "../AdminMenu/AdminMenu";

function AdminExamples() {
  const [saved, setSave] = useState(false);
  const fileRef = useRef(null);
  const [serviceName, setServiceName] = useState('');

  const dispatch = useDispatch();
  const services = useSelector(state => state.services.services).map(x => x.name);

  useEffect(() => {
    dispatch(getServicesAsync());
  }, [dispatch]);
  

  const sendExample = async () => {
    setSave(false);
    const file = fileRef.current.files[0];

    if (!file || !serviceName) {
      return;
    }

    const filePath = await addFile(file);

    const example = {
      service: serviceName,
      img: `/statics/${filePath}`,
    }

    await addExample(example);
    setSave(true);
  }

  return (<>
    <h1 className={`${saved ? 'saved' : ''}`}>Добавление примера</h1>
    <div className='admin'>
      <select className='gallery-select' onChange={event => setServiceName(event.target.value)} defaultValue={serviceName}>
        <option value='' disabled={true}>Выберете услугу</option>
        {services.map(x => 
          <option key={x} value={x}>{x}</option>
        )}
      </select>
      <div className='admin-input'>
        <label htmlFor='file'>Картинка</label>
        <input id='file' type='file' ref={fileRef} accept=".webp,.jpg,.jpeg,.png,.gif" />
      </div>
      <div>
        <button onClick={() => sendExample()} style={{marginLeft: "50px", marginTop: "30px"}}>Отправить</button>
      </div>
    </div>
    <AdminMenu />
  </>)
}

export default AdminExamples;