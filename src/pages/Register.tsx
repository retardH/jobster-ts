import React, { useEffect, useState } from 'react';
import Logo from '../components/Logo';
import FormRow from '../components/FormRow';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../features/store.ts';
import { loginUser, registerUser } from '../features/user/userSlice.ts';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true,
};
const Register = () => {
  const navigate = useNavigate();
  const { user, isLoading } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const [formValues, setFormValues] = useState(initialState);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormValues((values) => ({ ...values, [e.target.name]: e.target.value }));
  };
  const onSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, password, email, isMember } = formValues;
    console.log('form values', formValues);

    if (!email || !password || (!isMember && !name)) {
      toast.warn('Please fill out all fields');
      return;
    }
    if (isMember) {
      dispatch(loginUser({ email: email, password: password }));
      return;
    }
    dispatch(registerUser({ name: name, email: email, password: password }));
  };
  const toggleMember = () => {
    setFormValues((prev) => ({ ...prev, isMember: !prev.isMember }));
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }
  }, [user, navigate]);
  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        <Logo />
        <h3>{formValues.isMember ? 'Login' : 'Register'}</h3>
        {!formValues.isMember && (
          <FormRow
            name="name"
            value={formValues.name}
            handleChange={handleChange}
            labelText="Name"
          />
        )}
        <FormRow
          type="email"
          name="email"
          value={formValues.email}
          handleChange={handleChange}
          labelText="Email"
        />
        <FormRow
          type="password"
          name="password"
          value={formValues.password}
          handleChange={handleChange}
          labelText="Password"
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
          }}
        >
          {isLoading ? 'loading...' : 'demo'}
        </button>
        <p>
          {!formValues.isMember ? 'Already a member?' : 'Not a member yet?'}
          <button type="button" className="member-btn" onClick={toggleMember}>
            {!formValues.isMember ? 'Login' : 'Register'}
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
    margin: 0 auto;
    margin-bottom: 1.38rem;
  }
  .form {
    max-width: 400px;
    border-top: 5px solid var(--primary-500);
  }

  h3 {
    text-align: center;
  }
  p {
    margin: 0;
    margin-top: 1rem;
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
