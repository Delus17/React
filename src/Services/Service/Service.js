import './service.css';

function Service({service}) {
  return (<div className='service-card'>
    <img alt={service.name} src={service.img} />
    <div>
      <h4>{ service.name } <span className='service-card-price'>{ service.price } за { service.mesurement }</span></h4>
      <p>{ service.description }</p>
    </div>
  </div>);
}

export default Service;