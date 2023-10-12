import React, { useState } from 'react';
import Wrapper from '../assets/wrappers/RegisterPage';
import Logo from '../components/Logo';
import FormRow from '../components/FormRow';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../features/store.ts';
import { loginUser, registerUser } from '../features/user/userSlice.ts';

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true,
};
const Register = () => {
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
    console.log('submitted');
  };
  const toggleMember = () => {
    setFormValues((prev) => ({ ...prev, isMember: !prev.isMember }));
  };
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

export default Register;
