import './photo.css';

function Photo({ photo }) {
  return (<div className='gallery-photo'>
    <div>
      <img alt={photo.service} src={photo.img} />
      <div className='gallery-photo-name'>{photo.service}</div>
    </div>
  </div>);
}

export default Photo;