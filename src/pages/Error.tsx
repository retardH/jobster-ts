import Wrapper from '../assets/wrappers/ErrorPage';
import notFound from '../assets/images/not-found.svg';
import { Link } from 'react-router-dom';
const Error = () => {
  return (
    <Wrapper className="full-page">
      <div>
        <img src={notFound} alt="Not Found" />
        <h3>text</h3>
        <p>text</p>
        <Link to="/">Back Home</Link>
      </div>
    </Wrapper>
  );
};

export default Error;
