import './contacts.css';
import ContactForm from './ContactForm/ContactForm';
import map from "../static/map.jpg";

function Contacts() {
  return (<>
    <h1>Контакты</h1>
    <div className='contacts'>
      <img src={map} alt=''/>
      <div>
        <div>Адрес: г. Калуга
ул. Автозаводская, 15</div>
        <div>Телефон: <a href='tel:+79120055000'>8-956-123-00-05</a></div>
        <div>Email: <a href='mailto:mastervann@mail.ru'>KofeiKnigi@mail.ru</a></div>
        <div>график работы:
пн, вт, ср, чт, пт: 8:00 - 19:00
сб, вс: 8:00 - 16:00</div>
      </div>
    </div>

    <ContactForm />
  </>);
}

export default Contacts;