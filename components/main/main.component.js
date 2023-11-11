import React, { useState, useEffect } from 'react';
import CardContainer from '../card-container/card-container.component';
import InfoContainer from '../info-container/info-container.component';
import Map from '../map/map.component';
import Form from '../form/form.component';
import SliderComponent from '../slider/slider';
import FormEmail from '../form-email/form-email.component';
import FormProduct from '../form-product/form-product.component';
import { db } from '../../lib/firebase';
import RequestCall from '../request-call/request-call.component';

const Main = ({ styles }) => {
  const [formHidden, setFormHidden] = useState(true);
  const [formProductHidden, setFormProductHidden] = useState(true);
  const [collectionArray, setCollectionArray] = useState([]);
  const [selectedItem, setSelectedItem] = useState({
    id: 0,
    name: '',
    size: '',
    square: '',
    descr: '',
    priceinc: '',
    images: [],
  });

  const convertCollectionsSnapshotToMap = (collections) => {
    const transformedCollection = collections.docs.map((doc) => {
      const { name, image, descr, priceinc, size, square, images } = doc.data();
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

  useEffect(() => {
    const collectionRef = db.collection('products');
    collectionRef.onSnapshot((snapshot) => {
      const data = convertCollectionsSnapshotToMap(snapshot);
      setCollectionArray(data);
    });
  }, []);

  const handleShowForm = () => {
    setFormHidden(!formHidden);
  };

  const handleShowFormProduct = () => {
    setFormProductHidden(!formProductHidden);
  };

  return (
    <main className={styles.main}>
      <RequestCall handleShowForm={handleShowForm} />
      <CardContainer />
      <InfoContainer />
      <SliderComponent
        collectionArray={collectionArray}
        setSelectedItem={setSelectedItem}
        handleShowFormProduct={handleShowFormProduct}
      />
      <Map />
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
    </main>
  );
};
export default Main;
