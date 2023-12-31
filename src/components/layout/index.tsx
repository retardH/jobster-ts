import { Outlet } from 'react-router-dom';
import Header from './Header.tsx';
import styled from 'styled-components';
import LargeSidebar from './LargeSidebar.tsx';
import SmallSidebar from './SmallSidebar.tsx';

const SharedLayout = () => {
  return (
    <Wrapper>
      <main className="dashboard">
        <LargeSidebar />
        <SmallSidebar />
        <div>
          <Header />
          <div className="dashboard-page">
            <Outlet />
          </div>
        </div>
      </main>
    </Wrapper>
  );
};

export default SharedLayout;

const Wrapper = styled.section`
  .dashboard {
    display: grid;
    grid-template-columns: 1fr;
  }

  .dashboard-page {
    width: 90vw;
    margin: 0 auto;
    padding: 2rem 0;
    position: relative;
  }

  @media (min-width: 992px) {
    .dashboard {
      grid-template-columns: auto 1fr;
    }

    .dashboard-page {
      width: 90%;
    }
  }
`;
