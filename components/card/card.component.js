const Card = ({ imageSrc, title, mainText, big }) => {
  return (
    <div className={`card-body ${big ? 'big' : ''}`}>
      <div className={`card-image-container ${big ? 'big' : ''}`}>
        <div className={`card-image-circle ${big ? 'big' : ''}`}>
          <img src={imageSrc} className={`card-image ${big ? 'big' : ''}`} />
        </div>
      </div>
      <div>
        <h3>{title}</h3>
        <p>{mainText}</p>
      </div>
    </div>
  );
};
export default Card;
