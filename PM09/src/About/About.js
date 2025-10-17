import './about.css';
import Team from './Team/Team';
import Reviews from './Reviews/Reviews';
import example1 from '../static/example-1.jpg';
import example2 from '../static/example-2.jpg';
import example3 from '../static/example-3.jpg';
import example4 from '../static/example-4.jpg';

function About() {
  return (<>
    <h1>О нас</h1>
    <Team />

    <h2>Примеры наших работ</h2>
    
    <div className='examples'>
      <img className='demo' src={example1} alt='' />
      <img className='demo' src={example2} alt='' />
      <img className='demo' src={example3} alt='' />
      <img className='demo' src={example4} alt='' />
    </div>

    <Reviews />
  </>);
}

export default About;