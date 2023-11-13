import { useDispatch } from "react-redux";
import styled from "styled-components";
import { AppDispatch, RootState } from "../features/store";
import FormRow from "./FormRow";
import FormRowSelect from "./FormRowSelect";
import { jobTypeOptions, statusOptions } from "../utils/constants";
import { useSelector } from "react-redux";
import { useState } from "react";
import { getAllJobs } from "../features/jobs/jobsSlice.ts";

const SearchContainer = () => {
  const { isLoading } = useSelector((state: RootState) => state.user);
  const { search, searchStatus, searchType, sort, sortOptions } = useSelector(
    (state: RootState) => state.jobs,
  );
  const dispatch = useDispatch<AppDispatch>();
  const initialSearchValues = {
    search,
    searchStatus,
    sort,
    searchType,
  };
  const [searchForm, setSearchForm] = useState(initialSearchValues);

  const handleSearch = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (isLoading) {
      return;
    }
    setSearchForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchForm(initialSearchValues);
    dispatch(getAllJobs());
  };
  return (
    <Wrapper>
      <form className="form">
        <h4>search form</h4>
        <div className="form-center">
          {/* search position */}

          <FormRow
            type="text"
            name="search"
            value={searchForm.search}
            handleChange={handleSearch}
          />
          {/* search by status */}
          <FormRowSelect
            labelText="status"
            name="searchStatus"
            value={searchForm.searchStatus}
            handleChange={handleSearch}
            options={["all", ...statusOptions]}
          />
          {/* search by type */}
          <FormRowSelect
            labelText="type"
            name="searchType"
            value={searchForm.searchType}
            handleChange={handleSearch}
            options={["all", ...jobTypeOptions]}
          />
          {/* sort */}
          <FormRowSelect
            name="sort"
            value={searchForm.sort}
            handleChange={handleSearch}
            options={sortOptions}
          />
          <button
            className="btn btn-block btn-danger"
            disabled={isLoading}
            onClick={handleSubmit}
          >
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