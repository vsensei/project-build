import React, { useState } from 'react';
import CustomButton from '../shared/custombutton';
import CatalogContainer from '../catalog-container/catalog-container.component';
import Form from '../form/form.component';
import RequestCall from '../request-call/request-call.component';

export default function CatalogPage({ styles }) {
  const [formHidden, setFormHidden] = useState(true);

  const handleShowForm = () => {
    setFormHidden(!formHidden);
  };

  return (
    <main className={styles.main}>
      <RequestCall handleShowForm={handleShowForm} bigVersion={true} />

      <CatalogContainer />

      {formHidden ? null : (
        <Form formHidden={formHidden} handleShowForm={handleShowForm} />
      )}
    </main>
  );
}
