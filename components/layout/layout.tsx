import MainNavigation from './main-navigation'

interface Props {
  // Birden fazla JSX.Element'i döndürdüğünde array ya da React.ReactNode yapıyoruz. ReactNode yapınca tek element döndürdüğünde de sıkıntı olmuyor
  children: React.ReactNode
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <MainNavigation />
      <main>{children}</main>
    </>
  )
}

export default Layout
