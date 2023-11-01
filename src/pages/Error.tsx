import Wrapper from '../assets/wrappers/ErrorPage';
import notFound from '../assets/images/404.svg';
import { Link } from 'react-router-dom';
const Error = () => {
  return (
    <Wrapper className="full-page">
      <div>
        <img src={notFound} alt="Not Found" />
        <h3>Not Found</h3>
        <p>We can't afford to find the page you're looking for.</p>
        <Link to="/">Back Home</Link>
      </div>
    </Wrapper>
  );
};

export default Error;
