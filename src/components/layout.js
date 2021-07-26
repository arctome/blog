import * as React from "react"
import { Link } from "gatsby"
import { Helmet } from "react-helmet"

const Layout = ({ location, title, currentActive, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  let header

  if (isRootPath) {
    header = (
      <h1 className="main-heading">
        <Link to="/">{title}</Link>
      </h1>
    )
  } else {
    header = (
      <Link className="header-link-home" to="/">
        {title}
      </Link>
    )
  }

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <Helmet
        meta={[{
          name: "viewport",
          content: "width=device-width, height=device-height,  initial-scale=1.0, user-scalable=no;user-scalable=0;"
        }]}
      ></Helmet>
      <header className="global-header" style={{display: "flex", alignItems: "baseline", justifyContent: "space-between"}}>
        {header}
        <nav>
        <Link to="/frontend/1" className={[currentActive === "frontend" ? "active" : ""].join(" ")}>Frontend</Link>
        <Link to="/others/1" className={[currentActive === "others" ? "active" : ""].join(" ")}>Others</Link>
        <Link to="/life/1" className={[currentActive === "life" ? "active" : ""].join(" ")}>My Life</Link>
        {
          location.pathname === "/search" ? 
          <Link to="/"><i className="icon icon-close"></i></Link> : 
          <Link to="/search"><i className="icon icon-search"></i></Link>
        }
        </nav>
      </header>
      <main>{children}</main>
      <footer>
        Copyright © Arcto {new Date().getFullYear()}
        , Built with
        {` `}
        <a href="https://www.gatsbyjs.com">Gatsby</a>
      </footer>
    </div>
  )
}

export default Layout
