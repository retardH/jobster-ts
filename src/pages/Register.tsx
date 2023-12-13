import React, { useEffect } from 'react';
import Logo from '../components/Logo';
import FormRow from '../components/FormRow';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../features/store.ts';
import { loginUser, registerUser } from '../features/user/userSlice.ts';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { SubmitHandler, useForm } from 'react-hook-form';
import { RegisterLoginForm } from '../types';

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true,
};
const Register = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, watch, getValues, setValue } =
    useForm<RegisterLoginForm>({
      defaultValues: initialState,
    });
  const { user, isLoading } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const watchIsMember = watch('isMember');
  const onSubmit: SubmitHandler<RegisterLoginForm> = (data) => {
    const { name, email, password, isMember } = data;
    // if (!email || !password || (!isMember && !name)) {
    //   toast.warn("Please fill out all fields");
    //   return;
    // }
    if (isMember) {
      dispatch(loginUser({ email: email, password: password }));
      return;
    }
    dispatch(registerUser({ name: name!, email: email, password: password }));
  };
  const toggleMember = () => {
    const isMember = getValues('isMember');
    setValue('isMember', !isMember);
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/');
      }, 1500);
    }
  }, [user, navigate]);
  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <Logo />
        <h3>{watchIsMember ? 'Login' : 'Register'}</h3>
        {/*<b>Errors: {formState.errors.email?.message}</b>*/}
        {!watchIsMember && (
          <FormRow
            name="name"
            inputProps={register('name', { required: !watchIsMember })}
          />
        )}
        <FormRow
          type="email"
          name="email"
          inputProps={register('email', {
            required: {
              value: true,
              message: 'Please enter email',
            },
          })}
        />
        <FormRow
          type="password"
          name="password"
          inputProps={register('password', { required: true })}
        />
        <button type="submit" className="btn btn-block" disabled={isLoading}>
          {isLoading ? 'loading...' : 'submit'}
        </button>
        <button
          type="button"
          className="btn btn-block btn-hipster"
          disabled={isLoading}
          onClick={() => {
            dispatch(
              loginUser({ email: 'testUser@test.com', password: 'secret' })
            );
          }}>
          {isLoading ? 'loading...' : 'demo'}
        </button>
        <p>
          {!watchIsMember ? 'Already a member?' : 'Not a member yet?'}
          <button type="button" className="member-btn" onClick={toggleMember}>
            {!watchIsMember ? 'Login' : 'Register'}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: grid;
  align-items: center;
  .logo {
    display: block;
    margin: 0 auto 1.38rem auto;
  }
  .form {
    max-width: 400px;
    border-top: 5px solid var(--primary-500);
  }

  h3 {
    text-align: center;
  }
  p {
    margin: 1rem 0 0 0;
    text-align: center;
  }
  .btn {
    margin-top: 1rem;
  }
  .member-btn {
    background: transparent;
    border: transparent;
    color: var(--primary-500);
    cursor: pointer;
    letter-spacing: var(--letterSpacing);
  }
`;

export default Register;
