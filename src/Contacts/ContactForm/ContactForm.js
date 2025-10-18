import './contactForm.css';
import { useRef, useState } from 'react';
import sendClient from '../../api/clients';

function ContactForm() {
  const [saved, setSave] = useState(false);
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);

  const sendForm = async () => {
    setSave(false);
    const client = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      phone: phoneRef.current.value,
    }

    nameRef.current.value = '';
    emailRef.current.value = '';
    phoneRef.current.value = '';
    
    await sendClient(client);
    setSave(true);
  }

  return (<div className='contact-body'>
    <h2 className={`${saved ? 'saved' : ''}`}>Задайте нам вопрос</h2>
    <div className='contact'>
      <div>
        <label htmlFor='name'>Имя</label>
        <input id='name' type='text' ref={nameRef} />
      </div>
      <div>
        <label htmlFor='email'>Почта</label>
        <input id='email' type='email' ref={emailRef} />
      </div>
      <div>
        <label htmlFor='phone'>Телефон</label>
        <input id='phone' type='text' ref={phoneRef} />
      </div>
      <button onClick={() => sendForm()}>Отправить</button>
    </div>
  </div>);
}

export default ContactForm;