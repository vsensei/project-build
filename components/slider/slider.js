import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from 'pure-react-carousel';

const SliderComponent = ({
  collectionArray,
  setSelectedItem,
  handleShowFormProduct,
}) => {
  const selectItem = (item) => {
    setSelectedItem(item);
    handleShowFormProduct();
  };

  return (
    <div
      style={{
        minHeight: '370px',
        width: '90%',
      }}
      id='catalog'
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <h2 style={{ marginRight: '16px' }}>Samples of our work</h2>
      </div>
      <CarouselProvider
        naturalSlideWidth={200}
        naturalSlideHeight={200}
        totalSlides={collectionArray.length}
        isPlaying='true'
        infinite='true'
        interval='3000'
        dragEnabled={false}
        visibleSlides={3}
      >
        <div className='slider-main'>
          <ButtonBack className='slider-btn slider-btn-back'></ButtonBack>
          <Slider
            style={{
              minHeight: '25vh',
              width: '92%',
              margin: '0 auto',
              paddingLeft: '3%',
              outline: 'none',
            }}
          >
            {collectionArray.map((item) => (
              <Slide
                index={item.id}
                key={item.id}
                onClick={() => selectItem(item)}
              >
                <div
                  className='product-card'
                  style={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-around',
                    cursor: 'pointer',
                  }}
                >
                  <div className='product-image' style={{ height: '25vh' }}>
                    <img
                      src={item.images[0]?.image}
                      height='80%'
                      width='90%'
                      style={{ minHeight: '25vh' }}
                    />
                  </div>
                  <div className='product-info'>
                    <h5>{item.name}</h5>
                    <h6>Size: {item.size}</h6>
                  </div>
                </div>
              </Slide>
            ))}
          </Slider>
          <ButtonNext className='slider-btn slider-btn-next'></ButtonNext>
        </div>
      </CarouselProvider>
    </div>
  );
};
export default SliderComponent;
