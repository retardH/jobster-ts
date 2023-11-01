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
            Welcome to the JobSter, your gateway to a world of exciting career
            opportunities. Finding the perfect job can be a daunting task, but
            we're here to make it easier for you.With a vast database of job
            listings from a wide range of industries and locations, we connect
            job seekers with employers who are actively hiring. Our
            user-friendly interface, advanced search filters, and personalized
            job recommendations ensure that you can quickly pinpoint the
            positions that match your skills, interests, and aspirations. Your
            dream job is just a click away!
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
