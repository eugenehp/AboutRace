import React from 'react'
import styled from 'styled-components'
import { Link as GatsbyLink  } from 'gatsby'

// const Container = styled(Link)`
//   cursor: pointer;
//   text-decoration: none !important;
//   color:inherit;
// `

// export default props => <Container to={props.href} {...props} />



// Since DOM elements <a> cannot receive activeClassName,
// destructure the prop here and pass it only to GatsbyLink
const Link = ({ children, to, activeClassName, ...other }) => {
  // Tailor the following test to your environment.
  // This example assumes that any internal link (intended for Gatsby)
  // will start with exactly one slash, and that anything else is external.
  const internal = /^\/(?!\/)/.test(to)

  // Use Gatsby Link for internal links, and <a> for others
  if (internal) {
    return (
      <GatsbyLink style={{cursor: 'pointer', textDecoration: 'none', color:'inherit'}} to={to} activeClassName={activeClassName} {...other}>
        {children}
      </GatsbyLink>
    )
  }
  return (
    <a style={{cursor: 'pointer', textDecoration: 'none'}} href={to} {...other}>
      {children}
    </a>
  )
}

export default Link