import Head from 'next/head';
import MainLayout from '../components/mainlayout/mainlayout.component';
import styles from '../styles/Home.module.css';
import Main from '../components/main/main.component';

const Home = () => {
  return (
    <MainLayout>
      <div className={styles.container}>
        <Head>
          <title>Project_build</title>
          <meta name='keywords' content='build'></meta>
          <meta name='description' content="Build company's website"></meta>
          <meta charSet='utf-8' />
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <Main styles={styles} />
      </div>
    </MainLayout>
  );
};
export default Home;
