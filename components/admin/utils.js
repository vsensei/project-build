import { fb, db } from '../../lib/firebase';
export const handleDeleteImage = async (
  id,
  imageURL,
  selectedItem,
  setSelectedItem
) => {
  const nimages = selectedItem.images.filter((item) => item.id !== id);
  setSelectedItem({ ...selectedItem, images: nimages });
  const oldref = await fb.storage().ref().child(imageURL);
  try {
    await oldref
      .delete()
      .then(() => {
        console.log('File deleted');
      })
      .catch((error) => {
        console.log('Couldnt delete file!', error);
      });
    await db.collection('products').doc(selectedItem.id).update({
      images: nimages,
    });
  } catch (error) {
    console.log(error);
  }
};

export const handleDeleteItem = async (selectedItem, setSelectedItem) => {
  try {
    if (selectedItem.image) {
      const ref = fb.storage().ref().child(selectedItem.imageURL);
      await ref
        .delete()
        .then(() => {
          setSelectedItem(() => selectedItemInitialState);
        })
        .catch((error) => {
          console.log(`Couldn't delete file!`, error);
        });
    }
    await db.collection('products').doc(selectedItem.id).delete();
  } catch (error) {
    console.log(error);
  }
};

export const handleChangeSelectedItem = async (
  itemId,
  setSelectedItem,
  setFiles,
  setCurrentImage
) => {
  setFiles([]);
  setCurrentImage(null);
  try {
    const docRef = await db.collection('products').doc(itemId);
    docRef.get().then((doc) => {
      if (doc.exists) {
        const resdoc = { ...doc.data(), id: doc.id };
        setSelectedItem(resdoc);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export const uploadImages = (files) => {
  return files?.map(async (file) => {
    try {
      const ref = await fb
        .storage()
        .ref()
        .child(`productimages/${file.relativeName}`);
      const snapshot = await ref.put(file.file);
      return snapshot.ref.getDownloadURL();
    } catch (error) {
      console.log(error);
    }
  });
};

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map((doc) => {
    const { name, image, imageURL, descr, priceinc, size, square, images } =
      doc.data();
    return {
      id: doc.id,
      name: name,
      image: image,
      imageURL: imageURL,
      descr: descr,
      priceinc: priceinc,
      size: size,
      square: square,
      images: images,
    };
  });
  return transformedCollection;
};

export const handleAddNewItem = async (event) => {
  event.preventDefault();
  try {
    const a = await uploadImages(files);
    const imagesPromise = await Promise.all([...a]);
    const images = imagesPromise.map((downloadURL, i) => {
      return {
        id: uuidv4(),
        image: downloadURL,
        imageURL: `productimages/${files[i].relativeName}`,
      };
    });
    if (images) {
      await db.collection('products').add({ ...selectedItem, images });
    }
  } catch (error) {
    console.log(error);
  }
};

export const handleChangeData = async (event) => {
  event.preventDefault();
  if (!selectedItem?.images?.length) {
    alert('Add pictures');
    return;
  }
  try {
    const a = await uploadImages(files);
    const imagesPromise = await Promise.all([...a]);
    const images = imagesPromise.map((downloadURL, i) => {
      return {
        id: uuidv4(),
        image: downloadURL,
        imageURL: `productimages/${files[i].relativeName}`,
      };
    });
    await db
      .collection('products')
      .doc(selectedItem.id)
      .update({
        ...selectedItem,
        images: [...selectedItem.images, ...images],
      });
  } catch (error) {
    console.log(error);
  }
};
