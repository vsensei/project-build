import React, { useState, useEffect } from 'react';
import { db } from '../../lib/firebase';
import Form from '../form/form.component';
import FormProduct from '../form-product/form-product.component';
import FormEmail from '../form-email/form-email.component';

const CatalogContainer = () => {
  const [collectionArray, setCollectionArray] = useState([]);
  const [formHidden, setFormHidden] = useState(true);
  const [formProductHidden, setFormProductHidden] = useState(true);
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

  const handleShowFormProduct = () => {
    setFormProductHidden(!formProductHidden);
  };

  const convertCollectionsSnapshotToMap = (collections) => {
    const transformedCollection = collections.docs.map((doc) => {
      const { name, images, descr, priceinc, size, square } = doc.data();
      return {
        id: doc.id,
        name: name,
        descr: descr,
        priceinc: priceinc,
        size: size,
        square: square,
        images: images,
      };
    });
    return transformedCollection;
  };

  const selectItem = (item) => {
    setSelectedItem(item);
    handleShowFormProduct();
  };

  useEffect(() => {
    const collectionRef = db.collection('products');
    collectionRef.onSnapshot((snapshot) => {
      const data = convertCollectionsSnapshotToMap(snapshot);
      setCollectionArray(data);
    });
  }, []);

  return (
    <div className='catalog-container' id='catalog'>
      <section className='products'>
        {collectionArray.map((item) => (
          <div
            className='product-card'
            key={item.id}
            onClick={() => selectItem(item)}
          >
            <div className='product-image'>
              <img src={item.images[0]?.image} />
            </div>
            <div className='product-info'>
              <h5>{item.name}</h5>
              <h6>Size: {item.size}</h6>
            </div>
          </div>
        ))}
      </section>
      {formProductHidden ? null : (
        <Form
          formProductHidden={formProductHidden}
          handleShowFormProduct={handleShowFormProduct}
        >
          <FormProduct
            selectedItem={selectedItem}
            handleShowForm={handleShowForm}
            handleShowFormProduct={handleShowFormProduct}
          />
        </Form>
      )}
      {formHidden ? null : (
        <Form formHidden={formHidden} handleShowForm={handleShowForm}>
          <FormEmail handleShowForm={handleShowForm} formHidden={formHidden} />
        </Form>
      )}
    </div>
  );
};
export default CatalogContainer;
