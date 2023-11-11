import React, { useState } from 'react';
import CustomButton from '../shared/custombutton';
import FormInput from '../forminput/forminput.component';
import useOnClickOutside from 'use-onclickoutside';

const FormEmail = ({ formHidden, handleShowForm }) => {
  const [userCredentials, setUserCredentials] = useState({
    email: '',
    phone: '',
    text: '',
  });
  const ref = React.useRef(null);
  useOnClickOutside(ref, () => handleShowForm(!formHidden));

  const { email, phone, text } = userCredentials;

  const handleChange = (event) => {
    const { value, name } = event.target;
    setUserCredentials({ ...userCredentials, [name]: value });
  };

  const handleSendEmail = (event) => {
    event.preventDefault();
    console.log('sending email...');

    handleShowForm(!formHidden);
    fetch('https://us-central1-build-ce040.cloudfunctions.net/app1/sendmail', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email,
        phone: phone,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('got response');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form onSubmit={handleSendEmail} className='mailform'>
      <div className='mailform-content' ref={ref}>
        <div onClick={() => handleShowForm(!formHidden)} className='closeIcon'>
          X
        </div>
        <FormInput
          name='email'
          type='email'
          value={email}
          label='email'
          handleChange={handleChange}
          required
        />
        <FormInput
          name='phone'
          type='phone'
          value={phone}
          label='Phone'
          onChange={handleChange}
          required
        />
        <FormInput
          name='text'
          type='text'
          value={text}
          label='Message'
          multiline
          onChange={handleChange}
          style={{ border: '1px solid black', marginBottom: '16px' }}
          required
        />
        <CustomButton type='submit'>Send message</CustomButton>
      </div>
    </form>
  );
};
export default FormEmail;
