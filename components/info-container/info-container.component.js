import Card from '../card/card.component';

const InfoContainer = () => {
  return (
    <div className='info-container' id='services'>
      <Card
        imageSrc='/images/1.jpg'
        title='Construction of houses and baths'
        mainText='We are engaged in the construction of houses and baths from a log house,
        we also do finishing, electrical, heating
        and sewerage. We make a sketch of the building and discuss
        it with the client.'
        big
      />
      <Card
        imageSrc='/images/2.jpg'
        title='Foundation installation'
        mainText='Choosing and making the most suitable foundation
        Our employees carefully study the type of soil,
        the depth of its freezing, the relief of the site,
        climate and other factors.'
        big
      />
      <Card
        imageSrc='/images/3.webp'
        title='Roofing'
        mainText='Our company can not only make a roof
        of any shape and complexity, but also to create an insulated
        attic, which is convenient to use as
        additional room.'
        big
      />
    </div>
  );
};
export default InfoContainer;
