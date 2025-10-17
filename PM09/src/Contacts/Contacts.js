import './contacts.css';
import ContactForm from './ContactForm/ContactForm';
import map from "../static/map.jpg";

function Contacts() {
  return (<>
    <h1>Наши контакты</h1>
    <div className='contacts'>
      <img src={map} alt=''/>
      <div>
        <div>Адрес: г. Москва, ул. Молодежная, 11, к. 15</div>
        <div>Телефон: <a href='tel:+79120055000'>+7 (912) 00-55-000</a></div>
        <div>Email: <a href='mailto:mastervann@mail.ru'>mastervann@mail.ru</a></div>
      </div>
    </div>

    <ContactForm />
  </>);
}

export default Contacts;