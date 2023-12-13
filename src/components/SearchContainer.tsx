import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { AppDispatch, RootState } from '../features/store';
import FormRow from './FormRow';
import FormRowSelect from './FormRowSelect';
import { jobTypeOptions, statusOptions } from '../utils/constants';
import { useSelector } from 'react-redux';
import { getAllJobs, setSearchFilter } from '../features/jobs/jobsSlice.ts';
import { SubmitHandler, useForm } from 'react-hook-form';
import { JobSearchForm } from '../types';

const SearchContainer = () => {
  const { isLoading } = useSelector((state: RootState) => state.user);
  const { search, searchStatus, searchType, sort, sortOptions } = useSelector(
    (state: RootState) => state.jobs
  );
  const dispatch = useDispatch<AppDispatch>();
  const initialSearchValues = {
    search,
    searchStatus,
    sort,
    searchType,
  };
  const { register, handleSubmit, reset } = useForm<JobSearchForm>({
    defaultValues: initialSearchValues,
  });

  const onSubmit: SubmitHandler<JobSearchForm> = (data) => {
    reset();
    dispatch(setSearchFilter(data));
    dispatch(getAllJobs());
  };
  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <h4>search form</h4>
        <div className="form-center">
          {/* search position */}
          <FormRow
            type="text"
            name="search"
            inputProps={register('search', { required: false })}
          />
          {/* search by status */}
          <FormRowSelect
            labelText="status"
            name="searchStatus"
            options={['all', ...statusOptions]}
            inputProps={register('searchStatus', { required: true })}
          />
          {/* search by type */}
          <FormRowSelect
            labelText="type"
            name="searchType"
            options={['all', ...jobTypeOptions]}
            inputProps={register('searchType', { required: true })}
          />
          {/* sort */}
          <FormRowSelect
            name="sort"
            options={sortOptions}
            inputProps={register('sort', { required: true })}
          />
          <button className="btn btn-block btn-danger" disabled={isLoading}>
            search
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default SearchContainer;

const Wrapper = styled.section`
  .form {
    width: 100%;
    max-width: 100%;
  }
  .form-input,
  .form-select,
  .btn-block {
    height: 35px;
  }
  .form-row {
    margin-bottom: 0;
  }
  .form-center {
    display: grid;
    grid-template-columns: 1fr;
    column-gap: 2rem;
    row-gap: 0.5rem;
  }
  h5 {
    font-weight: 700;
  }
  .btn-block {
    align-self: end;
    margin-top: 1rem;
  }
  @media (min-width: 768px) {
    .form-center {
      grid-template-columns: 1fr 1fr;
    }
  }
  @media (min-width: 992px) {
    .form-center {
      grid-template-columns: 1fr 1fr 1fr;
    }
    .btn-block {
      margin-top: 0;
    }
  }
`;
