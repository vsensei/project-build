import Card from '../card/card.component';

const CardContainer = () => {
  return (
    <div className='card-container' id='about-us'>
      <Card
        imageSrc='/images/house.svg'
        title='We employ only professionals'
        mainText='We do not hire contractors.
        We carry out all work ourselves'
      />
      <Card
        imageSrc='/images/leaf.svg'
        title='We use ecological materials'
        mainText='We do not use harmful materials for out work'
      />
      <Card
        imageSrc='/images/pencil.svg'
        title='We work on the projects from the beginning
        to end'
        mainText='We make projects from scratch'
      />
    </div>
  );
};
export default CardContainer;
