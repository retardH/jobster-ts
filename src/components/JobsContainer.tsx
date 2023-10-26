import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../features/store";
import Loading from "./Loading.tsx";
import { useEffect } from "react";
import { getAllJobs } from "../features/jobs/jobsSlice.ts";

const JobsContainer = () => {
  const { isLoading } = useSelector((state: RootState) => state.user);
  const { jobs } = useSelector((state: RootState) => state.jobs);
  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(getAllJobs(""));
  }, []);

  if (isLoading) {
    return (
      <Wrapper>
        <Loading isLoading={true} color="#3b82f6" />
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
      <h5>jobs info</h5>
      <div className="jobs">All Jobs</div>
    </Wrapper>
  );
};

export default JobsContainer;

const Wrapper = styled.section`
  margin-top: 4rem;
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