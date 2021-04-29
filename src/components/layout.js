import * as React from "react"
import { Link } from "gatsby"

const Layout = ({ location, title, children }) => {
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
      <header className="global-header" style={{display: "flex", alignItems: "baseline", justifyContent: "space-between"}}>
        {header}
        {
          location.pathname === "/search" ? 
          <Link to="/"><i className="icon icon-close"></i></Link> : 
          <Link to="/search"><i className="icon icon-search"></i></Link>}
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
