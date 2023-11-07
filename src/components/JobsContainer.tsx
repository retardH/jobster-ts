import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { AppDispatch, RootState } from '../features/store';
import Loading from './Loading.tsx';
import { useEffect } from 'react';
import { getAllJobs } from '../features/jobs/jobsSlice.ts';
import Job from './Job.tsx';
import PageBtnContainer from './PageBtnContainer.tsx';

const JobsContainer = () => {
  const { isLoading } = useSelector((state: RootState) => state.user);
  const {
    jobs,
    numOfPages,
    totalJobs,
    page,
    sort,
    search,
    searchStatus,
    searchType,
  } = useSelector((state: RootState) => state.jobs);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getAllJobs());
  }, [page, sort, search, searchStatus, searchType]);

  if (isLoading) {
    return (
      <Wrapper>
        <Loading isLoading={true} color="#3b82f6" isFixed={false} />
      </Wrapper>
    );
  }

  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No Jobs To Display...</h2>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <h5>
        {totalJobs} job{jobs.length > 1 && 's'} found
      </h5>
      <div className="jobs">
        {jobs.map((job) => (
          <Job
            key={job._id}
            _id={job._id}
            company={job.company}
            position={job.position}
            createdAt={job.createdAt}
            status={job.status}
            jobLocation={job.jobLocation}
            jobType={job.jobType}
          />
        ))}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  );
};

export default JobsContainer;

const Wrapper = styled.section`
  margin-top: 4rem;
  position: relative;
  h2 {
    text-transform: none;
  }
  & > h5 {
    font-weight: 700;
  }
  .jobs {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 2rem;
  }
  @media (min-width: 992px) {
    .jobs {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }
  }
`;
