import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../features/store';
import { useDispatch } from 'react-redux';
import { showStats } from '../../features/jobs/jobsSlice';
import Loading from '../../components/Loading';
import StatsContainer from '../../components/StatsContainer';
import ChartsContainer from '../../components/ChartsContainer';

const Stats = () => {
  const { stats, monthlyApplications } = useSelector(
    (state: RootState) => state.jobs
  );
  const { isLoading } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(showStats());
  }, []);

  if (isLoading) {
    return <Loading isLoading={true} color="#3b82f6" />;
  }
  return (
    <>
      <StatsContainer />
      {monthlyApplications.length > 0 && <ChartsContainer />}
    </>
  );
};

export default Stats;
