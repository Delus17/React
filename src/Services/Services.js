import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import getServicesAsync from '../api/services';
import Service from './Service/Service';

function Services() {
  const dispatch = useDispatch();
  
  const services = useSelector(
    state => state.services.services,
  );

  useEffect(() => {
    dispatch(getServicesAsync());
  }, [dispatch]);

  return (<>
    <h1>Услуги</h1>
    <div style={{display: "flex", flexWrap: "wrap", alignItems: "center"}}>
      { services.map(x => <Service key={x.name} service={x}/>) }
    </div>
  </>);
}

export default Services;