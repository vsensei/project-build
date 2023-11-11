const Map = () => {
  return (
    <div
      style={{ width: '100%', backgroundColor: '#f4f4f4', marginTop: '20px' }}
      id='map'
    >
      <div style={{ width: '90%', margin: '0 auto' }} id='map'>
        <h2 style={{ textAlign: 'left', width: '80%' }}>Contacts</h2>
        <div className='map-container'>
          <iframe
            src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d86931.70675333648!2d86.89171415724394!3d27.993434743027475!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e854a215bd9ebd%3A0x576dcf806abbab2!2sMt%20Everest!5e0!3m2!1sen!2srs!4v1693760474776!5m2!1sen!2srs'
            width='600'
            height='450'
            style={{ border: 0 }}
            allowfullscreen=''
            loading='lazy'
            referrerpolicy='no-referrer-when-downgrade'
          ></iframe>
          <div className='map-info'>
            Full name -&nbsp;
            <b>Build company «Project_build»</b>
            <br />
            Our address is unknown, but you can trust us :)
            <br />
            SEO is unknown
            <br />
            Email -&nbsp;
            <a href='mailto:'>test email</a>
            <br />
            Phone - <a href='tel:+10000000000'> +1 (000) 000-00-00 </a>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Map;
