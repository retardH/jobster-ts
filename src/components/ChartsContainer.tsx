import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../features/store';
import { useState } from 'react';
import BarChartComponent from './BarChart';
import AreaChartComponent from './AreaChart';

const ChartsContainer = () => {
  const [showBarChart, setShowBarChart] = useState(true);
  const { monthlyApplications } = useSelector((state: RootState) => state.jobs);
  return (
    <Wrapper>
      <h4>Monthly Applications</h4>
      <button type="button" onClick={() => setShowBarChart(!showBarChart)}>
        {showBarChart ? 'Area Chart' : 'Bar Chart'}
      </button>
      {showBarChart ? (
        <BarChartComponent data={monthlyApplications} />
      ) : (
        <AreaChartComponent data={monthlyApplications} />
      )}
    </Wrapper>
  );
};

export default ChartsContainer;

const Wrapper = styled.section`
  margin-top: 4rem;
  text-align: center;
  button {
    background: transparent;
    border-color: transparent;
    text-transform: capitalize;
    color: var(--primary-500);
    font-size: 1.25rem;
    cursor: pointer;
  }
  h4 {
    text-align: center;
    margin-bottom: 0.75rem;
  }
`;
