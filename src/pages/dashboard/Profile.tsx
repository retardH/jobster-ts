import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../features/store.ts';
import FormRow from '../../components/FormRow.tsx';
import { updateUser } from '../../features/user/userSlice.ts';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ProfileForm } from '../../types';

const Profile = () => {
  const { isLoading, user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  const initialFormValues = {
    name: user?.name || '',
    lastName: user?.lastName || '',
    location: user?.location || '',
    email: user?.email || '',
  };

  const { handleSubmit, register } = useForm<ProfileForm>({
    defaultValues: initialFormValues,
  });

  const onSubmit: SubmitHandler<ProfileForm> = (data) => {
    dispatch(updateUser(data));
  };

  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <h3>profile</h3>

        <div className="form-center">
          <FormRow
            labelText="first name"
            type="text"
            name="name"
            inputProps={register('name', { required: true })}
          />
          <FormRow
            type="text"
            labelText="last name"
            name="lastName"
            inputProps={register('lastName', { required: true })}
          />
          <FormRow
            labelText="email"
            type="email"
            name="email"
            inputProps={register('email', { required: true })}
          />
          <FormRow
            labelText="location"
            type="text"
            name="location"
            inputProps={register('location', { required: true })}
          />
          <button className="btn btn-block" type="submit" disabled={isLoading}>
            {isLoading ? 'Please Wait...' : 'save changes'}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default Profile;

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
