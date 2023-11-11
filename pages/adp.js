import Head from 'next/head';
import styles from '../styles/Home.module.css';
import AdminPage from '../components/admin/admin.component';
import { useState } from 'react';
import { auth } from '../lib/firebase';
import CustomButton from '../components/shared/custombutton';
import FormInput from '../components/forminput/forminput.component';

const Home = () => {
  const selectedItemInitialState = {
    email: '',
    password: '',
  };
  const [selectedItem, setSelectedItem] = useState(selectedItemInitialState);
  const { email, password } = selectedItem;
  const [user, setUser] = useState(null);

  const handleChange = (event) => {
    const { value, name } = event.target;
    setSelectedItem({ ...selectedItem, [name]: value });
  };

  const handleSignIn = async (event) => {
    event.preventDefault();
    await auth.signInWithEmailAndPassword(email, password);
    setUser(auth.currentUser);
    setSelectedItem(selectedItemInitialState);
  };

  const handleSignOut = async () => {
    await auth.signOut();
    await setUser(null);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Admin panel</title>
        <meta name='keywords' content='build'></meta>
        <meta name='description' content="Build company's website"></meta>
        <meta charSet='utf-8' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      {user ? (
        <div className='div-user' onClick={handleSignOut}>
          {user.email} <i>(Log out)</i>
        </div>
      ) : null}

      {user ? (
        <AdminPage styles={styles} handleSignOut={handleSignOut} />
      ) : (
        <div className='pleaseSignIn'>
          At first, please log in to the system
          <form onSubmit={handleSignIn} method='post'>
            <FormInput
              name='email'
              value={email}
              label='Email:'
              handleChange={handleChange}
              type='email'
              required
            />
            <FormInput
              name='password'
              value={password}
              label='Password:'
              handleChange={handleChange}
              type='password'
              required
            />
            <CustomButton type='submit'>Log in</CustomButton>
          </form>
        </div>
      )}
    </div>
  );
};
export default Home;
