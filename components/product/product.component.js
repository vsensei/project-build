import React, { useState, useEffect } from 'react';
import CustomButton from '../shared/custombutton';
import Form from '../form/form.component';
import { db } from '../../lib/firebase';
import 'firebase/storage';
import RequestCall from '../request-call/request-call.component';

const ProductPage = ({ styles, productId }) => {
  const [formHidden, setFormHidden] = useState(true);
  const [selectedItem, setSelectedItem] = useState({
    id: 0,
    name: '',
    size: '',
    square: '',
    descr: '',
    priceinc: '',
    images: [],
  });

  const handleShowForm = () => {
    setFormHidden(!formHidden);
  };

  useEffect(() => {
    const docRef = db.collection('products').doc(productId);
    docRef.onSnapshot((doc) => {
      if (doc.exists) {
        setSelectedItem(doc.data());
      }
    });
  }, [productId]);

  const { image, name, size, square, descr, priceinc } = selectedItem;
  return (
    <main className={styles.main}>
      <RequestCall handleShowForm={handleShowForm} bigVersion={true} />

      <div className='product-container' id='product'>
        <div className='product-info'>
          <img src={image} width='300px' />;
          <div className='product-mini-info'>
            <div>{name}</div>
            <div>Size: {size}</div>
            <div>Square: {square}</div>
          </div>
        </div>
        <div className='product-add-info'>
          <div className='product-add-info-item'>
            <h3>Description:</h3>
            {descr}
          </div>
          <div className='product-add-info-item'>
            <h3>Price includes:</h3>
            {priceinc}
          </div>
        </div>
      </div>

      {formHidden ? null : (
        <Form formHidden={formHidden} handleShowForm={handleShowForm} />
      )}
    </main>
  );
};
export default ProductPage;
