import './subscribe.css';
import { useRef, useState } from 'react';
import subscribe from '../../api/subscribers';

function Subscribe() {
  const [saved, setSave] = useState(false);
  const nameRef = useRef(null);
  const emailRef = useRef(null);

  const sendForm = async () => {
    setSave(false);
    const client = {
      name: nameRef.current.value,
      email: emailRef.current.value,
    }
    
    nameRef.current.value = '';
    emailRef.current.value = '';
    await subscribe(client);
    setSave(true);
  }

  return (<div className='subscribe'>
    <h4 className={`${saved ? 'saved' : ''}`}>Подпишитесь на новости</h4>
    <div>
      <label htmlFor='name'>Ваше имя</label>
      <input id='name' type='text' ref={nameRef} />
    </div>
    <div>
      <label htmlFor='email'>Почта</label>
      <input id='email' type='email' ref={emailRef} />
    </div>
    <button onClick={() => sendForm()}>Отправить</button>
  </div>)
}

export default Subscribe;