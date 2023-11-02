import { useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../features/store';
import styled from 'styled-components';
import FormRow from '../../components/FormRow';
import FormRowSelect from '../../components/FormRowSelect';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { request } from '../../utils/axios.ts';
import { useDispatch } from 'react-redux';
import { editJob } from '../../features/jobs/jobsSlice.ts';

const AddJob = () => {
  const {
    isEditing,
    editJobId,
    position,
    company,
    jobLocation,
    jobType,
    status,
  } = useSelector((state: RootState) => state.jobs);
  const { user, isLoading } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const initialFormValues = {
    position,
    company,
    jobLocation,
    jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
    jobType,
    statusOptions: ['interview', 'declined', 'pending'],
    status,
  };

  const [jobForm, setJobForm] = useState(initialFormValues);

  const requestNewJobCreate = async (payload: any) => {
    try {
      await request('post', '/jobs', payload, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      toast.success('Job Created!');
    } catch (err: any) {
      toast.error(err.response.data.msg);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    const { position, company, jobLocation, jobType, status } = jobForm;
    e.preventDefault();
    if (!position || !company || !jobLocation) {
      toast.warn('Please fill out all fields');
      return;
    }

    if (isEditing) {
      dispatch(
        editJob({
          jobId: editJobId,
          job: { company, position, jobLocation, jobType, status },
        })
      );
      return;
    }

    requestNewJobCreate({ position, company, jobLocation, jobType, status });
  };

  const handleJobInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const name = e.target.name;
    const value = e.target.value;
    setJobForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (!isEditing) {
      setJobForm((prev) => ({
        ...prev,
        jobLocation: user!.location,
      }));
    }
  }, [isEditing, user]);

  return (
    <Wrapper>
      <form className="form">
        <h3>{isEditing ? 'edit job' : 'add job'}</h3>

        <div className="form-center">
          {/* position */}
          <FormRow
            type="text"
            name="position"
            value={jobForm.position}
            handleChange={handleJobInput}
          />
          {/* company */}
          <FormRow
            type="text"
            name="company"
            value={jobForm.company}
            handleChange={handleJobInput}
          />
          {/* location */}
          <FormRow
            type="text"
            labelText="job location"
            name="jobLocation"
            value={jobForm.jobLocation}
            handleChange={handleJobInput}
          />
          {/* job status */}
          <FormRowSelect
            name="status"
            value={jobForm.status}
            handleChange={handleJobInput}
            options={jobForm.statusOptions}
          />
          {/* job type */}
          <FormRowSelect
            name="jobType"
            labelText="job type"
            value={jobForm.jobType}
            handleChange={handleJobInput}
            options={jobForm.jobTypeOptions}
          />
          {/* btn container */}
          <div className="btn-container">
            <button
              type="button"
              className="btn btn-block clear-btn"
              onClick={() => setJobForm(initialFormValues)}
            >
              clear
            </button>
            <button
              type="submit"
              className="btn btn-block submit-btn"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              submit
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default AddJob;

const Wrapper = styled.section`
  border-radius: var(--borderRadius);
  width: 100%;
  background: var(--white);
  padding: 3rem 2rem 4rem;
  box-shadow: var(--shadow-2);
  h3 {
    margin-top: 0;
  }
  .form {
    margin: 0;
    border-radius: 0;
    box-shadow: none;
    padding: 0;
    max-width: 100%;
    width: 100%;
  }
  .form-row {
    margin-bottom: 0;
  }
  .form-center {
    display: grid;
    row-gap: 0.5rem;
  }
  .form-center button {
    align-self: end;
    height: 35px;
    margin-top: 1rem;
  }
  .btn-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
    align-self: flex-end;
    margin-top: 0.5rem;
    button {
      height: 35px;
    }
  }
  .clear-btn {
    background: var(--grey-500);
  }
  .clear-btn:hover {
    background: var(--black);
  }
  @media (min-width: 992px) {
    .form-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
      column-gap: 1rem;
    }
    .btn-container {
      margin-top: 0;
    }
  }
  @media (min-width: 1120px) {
    .form-center {
      grid-template-columns: 1fr 1fr 1fr;
    }
    .form-center button {
      margin-top: 0;
    }
  }
`;
