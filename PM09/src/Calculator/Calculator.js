import './calculator.css';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import getServicesAsync from "../api/services";

function Calculator() {
  const dispatch = useDispatch();
  
  const allServices = useSelector(
    state => state.services.services,
  );
  const [services, setService] = useState([]);
  const price = services.reduce((accumulator, currentValue) => accumulator + currentValue.price * currentValue.count, 0);
  const isAllSelected = services.length === allServices.length;
  const isServicesAvalible = services.length < allServices.length;
  const isAnySelected = services.length > 0;

  useEffect(() => {
    dispatch(getServicesAsync());
  }, [dispatch]);

  const addService = service => {
    if (services.some(x => x.name === service.name)) {
      return;
    }

    setService([...services, {...service, count: 1 } ]);
  }

  const removeService = service => {
    setService(services.filter(x => x.name !== service.name));
  }

  const changeCount = (service, value) => {
    const count = parseFloat(value);   
    const storeService = services.find(x => x.name === service.name);
    storeService.count = count;
    storeService.value = value;
    setService([...services]);
  }

  return (<>
    <h1>Калькулятор</h1>
    <div className='calc-price'>Текущая стоимость: {price}</div>
    <div className='calc-content'>
      <div className='calc-column'>
        <h4 className='calc-title'>Выберете услуги</h4>
        { isAllSelected && <div>Все услуги выбраны</div> }
        { isServicesAvalible && allServices.filter(x => !services.some(y => y.name === x.name)).map(x => (
          <div key={x.name} className='calc-service'>
            <div className='calc-service-title'>{ x.name }</div>
            <button onClick={() => addService(x)} className='calc-btn'>Добавить</button>
            <div className='calc-description'>{ x.price } р. за { x.mesurement }</div>
          </div>
        ))}
      </div>
      <div className='calc-column'>
        <h4 className='calc-title'>Выбранные услуги</h4>
        { !isAnySelected && <div>Услуги не выбраны</div> }
        { isAnySelected && services.map(x => (
          <div key={x.name} className='calc-service'>
            <div className='calc-service-title'>{ x.name }</div>
            <input type="text"
              value={x.value ?? 1} 
              onChange={(event) => changeCount(x, event.target.value)} 
              className='calc-service-input' />
            <button onClick={() => removeService(x)} className='calc-btn'>Удалить</button>
            <div className='calc-description'>{ x.price } р. за { x.mesurement }</div>
          </div>
        ))}
      </div>
    </div>
  </>);
}

export default Calculator;