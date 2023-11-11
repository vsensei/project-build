import React, { useState } from 'react';
import CustomButton from '../shared/custombutton';
import SliderForProduct from '../sliderforproduct/sliderforproduct';
import 'firebase/storage';
import useOnClickOutside from 'use-onclickoutside';

const FormProduct = ({
  selectedItem,
  handleShowForm,
  handleShowFormProduct,
}) => {
  const { images, name, size, square, descr, priceinc } = selectedItem;
  const [chosenImage, setChosenImage] = useState(images[0]?.image);
  const ref = React.useRef(null);
  useOnClickOutside(ref, handleShowFormProduct);
  const attr = [
    { label: 'Name', value: name },
    { label: 'Size', value: size },
    { label: 'Square', value: square },
    { label: 'Description', value: descr },
    { label: 'Price includes', value: priceinc },
  ];
  return (
    <div className='product-container' id='product'>
      <div className='product' ref={ref}>
        <div onClick={handleShowFormProduct} className='closeIcon'>
          X
        </div>
        <div className='product-image'>
          <img
            src={chosenImage}
            width='100%'
            style={{
              maxHeight: '510px',
              width: '100%',
              maxWidth: '421px',
              maxHeight: '315px',
            }}
          />
          {images.length > 1 ? (
            <SliderForProduct
              collectionArray={images}
              setChosenImage={setChosenImage}
            />
          ) : null}
        </div>
        <div className='product-add-info'>
          {attr.map(({ label, value }) => (
            <div className='product-add-info-item' key={label}>
              <h3>{label}</h3>
              {value}
            </div>
          ))}

          <div>
            <CustomButton
              onClick={handleShowForm}
              style={{ marginBottom: '20px' }}
            >
              Request a call
            </CustomButton>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FormProduct;
