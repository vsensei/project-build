const MainLayout = ({ children }) => {
  return (
    <div className='mainlayout'>
      <nav>
        <a href='/#about-us'>About us</a>
        <a href='/#services'>Services</a>
        <a href='/#map'>Contacts</a>
        <a href='/#catalog'>Samples</a>
        <a href='/catalog'>Catalog</a>
      </nav>
      <main>{children}</main>
    </div>
  );
};
export default MainLayout;
