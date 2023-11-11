import { CarouselProvider, Slider, Slide } from 'pure-react-carousel';

const SliderForProduct = ({ collectionArray, setChosenImage }) => {
  return (
    <div id="catalog" style={{ marginBottom: '35px', paddingLeft: '5%' }}>
      <CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={100}
        totalSlides={collectionArray.length}
        isPlaying="true"
        infinite="true"
        interval="3000"
        dragEnabled={false}
        visibleSlides={2}
      >
        <div className="slider-main" style={{ height: 'fit-content' }}>
          <Slider
            style={{
              width: '92%',
              margin: '0 auto',
            }}
          >
            {collectionArray.map((item) => (
              <Slide index={item.id} key={item.id}>
                <div
                  className="product-card"
                  style={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-around',
                    cursor: 'pointer',
                  }}
                >
                  <div
                    className="product-image"
                    style={{ height: '25vh' }}
                    onClick={() => setChosenImage(item.image)}
                  >
                    <img src={item.image} width="90%" />
                  </div>
                </div>
              </Slide>
            ))}
          </Slider>
        </div>
      </CarouselProvider>
    </div>
  );
};
export default SliderForProduct;
