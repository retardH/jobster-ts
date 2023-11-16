import Logo from '../components/Logo';
import jobHunt from '../assets/images/landingImage.png';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
        <Link to="/register" className="btn btn-hero">
          Login/Register
        </Link>
      </nav>
      <div className="container page">
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
          <Link to="/" className="btn btn-hero">
            Go To Dashboard
          </Link>
        </div>
        <img src={jobHunt} alt="job hunt" className="img main-img" />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  nav {
    width: var(--fluid-width);
    max-width: var(--max-width);
    margin: 0 auto;
    height: var(--nav-height);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .page {
    min-height: calc(100vh - var(--nav-height));
    display: grid;
    align-items: center;
    margin-top: -3rem;
  }
  h1 {
    font-weight: 700;
    span {
      color: var(--primary-500);
    }
  }
  p {
    color: var(--grey-600);
  }
  .main-img {
    display: none;
  }
  @media (min-width: 992px) {
    .page {
      grid-template-columns: 1fr 1fr;
      column-gap: 3rem;
    }
    .main-img {
      display: block;
    }
  }
`;

export default Landing;