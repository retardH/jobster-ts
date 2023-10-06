import React, { useState } from 'react';
import Wrapper from '../assets/wrappers/RegisterPage';
import Logo from '../components/Logo';
import FormRow from '../components/FormRow';
import { toast } from 'react-toastify';

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true,
};
const Register = () => {
  const [formValues, setFormValues] = useState(initialState);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    console.log(e.target.value);
    setFormValues((values) => ({ ...values, [e.target.name]: e.target.value }));
  };
  const onSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, password, email, isMember } = formValues;
    if (!email || !password || !isMember || !name) {
      console.log('Please fill out all fields');
      toast.warn('Please fill out all fields');
      return;
    }
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
        <button type="submit" className="btn btn-block">
          submit
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
