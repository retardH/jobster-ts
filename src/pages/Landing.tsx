import Wrapper from '../assets/wrappers/LandingPage';
import Logo from '../components/Logo';
import jobHunt from '../assets/images/jobhunt.svg';
import { Link } from 'react-router-dom';
const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        {/* info */}
        <div className="info">
          <h1>
            job <span>tracking</span> app
          </h1>
          <p>
            Crucifix narwhal street art asymmetrical, humblebrag tote bag pop-up
            fixie raclette taxidermy craft beer. Brunch bitters synth, VHS
            crucifix heirloom meggings bicycle rights.
          </p>
          <Link to="/register" className="btn btn-hero">
            Login/Register
          </Link>
        </div>
        <img src={jobHunt} alt="job hunt" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default Landing;
