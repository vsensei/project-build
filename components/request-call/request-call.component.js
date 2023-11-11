import React from 'react';
import CustomButton from '../shared/custombutton';

const RequestCall = ({ handleShowForm, bigVersion = false }) => {
  return (
    <div className='request-call-bgimage-bg'>
      {bigVersion ? <div className='request-call-bgimage'></div> : null}
      <div className='request-call-container'>
        <div className='request-call-text'>
          <h1>We build with great quality, quickly and for centuries</h1>
          <h3>
            We will consult and help you with the choice of the necessary
            construction services of any complexity for free
          </h3>
          <div className='button-container'>
            <CustomButton onClick={handleShowForm}>Request a call</CustomButton>
            {bigVersion ? <CustomButton inverted>More</CustomButton> : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestCall;
