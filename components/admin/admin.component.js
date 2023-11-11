import React, { useState, useEffect } from 'react';
import CustomButton from '../shared/custombutton';
import FormInput from '../forminput/forminput.component';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../lib/firebase';
import {
  handleDeleteImage,
  handleDeleteItem,
  handleChangeSelectedItem,
  convertCollectionsSnapshotToMap,
  handleAddNewItem,
  handleChangeData,
} from './utils';

const AdminPage = ({ styles }) => {
  const selectedItemInitialState = {
    image: '',
    imageURL: '',
    name: '',
    size: '',
    square: '',
    descr: '',
    priceinc: '',
    images: [],
  };
  const [selectedItem, setSelectedItem] = useState(selectedItemInitialState);
  const [collectionArray, setCollectionArray] = useState([]);
  const [files, setFiles] = useState([]);
  const [currentImage, setCurrentImage] = useState(null);
  useEffect(() => {
    const getProducts = async () => {
      try {
        const collectionRef = await db.collection('products');
        collectionRef.onSnapshot((snapshot) => {
          const data = convertCollectionsSnapshotToMap(snapshot);
          setCollectionArray(data);
        });
      } catch (error) {
        console.log(error);
      }
    };

    getProducts();
  }, []);

  const handleChange = (event) => {
    const { value, name } = event.target;
    setSelectedItem({ ...selectedItem, [name]: value });
  };

  const handleFileChange = (event) => {
    const newf = event.target.files;
    setFiles((prevState) => [
      ...prevState,
      ...Object.keys(newf).map((fileName) => ({
        file: newf[fileName],
        relativeName: uuidv4() + '.' + newf[fileName].name.split('.').pop(),
      })),
    ]);
  };
  const formProps = [
    {
      name: 'name',
      value: selectedItem.name,
      label: 'New product',
    },
    {
      name: 'size',
      value: selectedItem.size,
      label: 'Size',
    },
    {
      name: 'square',
      value: selectedItem.square,
      label: 'Square',
    },
    {
      name: 'descr',
      value: selectedItem.descr,
      label: 'Description',
      multiline: true,
    },
    {
      name: 'priceinc',
      value: selectedItem.priceinc,
      label: 'Price includes',
    },
  ];
  return (
    <main className={styles.main}>
      <div className='settings'>
        <div className='settings-items'>
          {collectionArray.map((item) => (
            <div
              className={`item-primary ${
                item.id === selectedItem.id ? 'active' : ''
              }`}
              key={item.id}
              onClick={() =>
                handleChangeSelectedItem(
                  item.id,
                  setSelectedItem,
                  setFiles,
                  setCurrentImage
                )
              }
            >
              {item.name}
            </div>
          ))}
          <form className='form-newitem' onSubmit={handleAddNewItem}>
            <CustomButton
              type='button'
              onClick={() => {
                setSelectedItem({ ...selectedItemInitialState });
              }}
            >
              Create new
            </CustomButton>
          </form>
        </div>

        <div className='form-settings'>
          <form
            key={selectedItem.id}
            onSubmit={
              selectedItem?.id
                ? handleChangeData
                : files.length
                ? handleAddNewItem
                : () => alert('Add pictures')
            }
          >
            {formProps.map((props) => (
              <FormInput
                {...props}
                handleChange={handleChange}
                required
                key={props.label}
              />
            ))}
            <div className='file-upload'>
              <label>
                <input
                  type='file'
                  name='imagefile'
                  id='uploade-file'
                  onChange={handleFileChange}
                  accept='image/*'
                  multiple
                />
                <span>Add picture</span>
              </label>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {selectedItem?.images?.map((item, i) => (
                <div style={{ marginRight: '8px' }} key={i}>
                  <img
                    src={item.image}
                    width={75}
                    onClick={() =>
                      setCurrentImage({ type: 'uploaded', value: item })
                    }
                  />
                </div>
              ))}
              {files?.map(({ file }, i) => (
                <div style={{ marginRight: '8px' }} key={i}>
                  <img
                    src={URL.createObjectURL(file)}
                    width={75}
                    onClick={() => setCurrentImage({ type: 'local', value: i })}
                  />
                </div>
              ))}
            </div>
            {selectedItem?.id ? (
              <>
                <CustomButton type='submit'>Change data</CustomButton>
                <CustomButton
                  type='button'
                  onClick={() =>
                    handleDeleteItem(selectedItem, setSelectedItem)
                  }
                  abort
                >
                  Delete
                </CustomButton>
              </>
            ) : (
              <CustomButton type='submit'>Add</CustomButton>
            )}
          </form>
        </div>
        {currentImage ? (
          <div>
            <img
              src={
                currentImage.type === 'local'
                  ? URL.createObjectURL(files[currentImage.value]?.file)
                  : currentImage.value.image
              }
              width={300}
            />
            <br />
            <button
              onClick={() =>
                currentImage.type === 'local'
                  ? setFiles(() => {
                      setCurrentImage(null);
                      return files.filter(
                        (_, index) => index !== currentImage.value
                      );
                    })
                  : handleDeleteImage(
                      currentImage.value.id,
                      currentImage.value.imageURL,
                      selectedItem,
                      setSelectedItem
                    ).then(() => {
                      setCurrentImage(null);
                    })
              }
            >
              Delete
            </button>
          </div>
        ) : null}
      </div>
    </main>
  );
};

export default AdminPage;
