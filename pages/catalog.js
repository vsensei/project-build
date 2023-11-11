import Head from 'next/head';
import MainLayout from '../components/mainlayout/mainlayout.component';
import styles from '../styles/Home.module.css';
import CatalogPage from '../components/catalog-page/catalog-page.component';

const Catalog = () => {
  return (
    <MainLayout>
      <div className={styles.container}>
        <Head>
          <title>Project_build-catalog</title>
          <meta name='keywords' content='build'></meta>
          <meta name='description' content="Build company's website"></meta>
          <meta charSet='utf-8' />
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <CatalogPage styles={styles} />
      </div>
    </MainLayout>
  );
};
export default Catalog;
