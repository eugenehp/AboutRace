import React from 'react'
import styled from 'styled-components'

import {
  Link,
  SVGArrow
} from './'

import {
  red,
} from '../colors'

const FiledUnderLinkContainer = styled(Link)`
  display: flex;
  flex-direction: row;

  align-items: center;

  padding-left: 0;
  padding-right: 10px;
  padding-top:9px;

  font-family: Lato;
  font-size: 18px;
  
  letter-spacing: 0.02em;
  text-transform: capitalize;

  color: ${props => props.color};

  @media (min-width: 1025px) { /* desktop */
    padding-left: 15px;
    padding-right: 15px;
  }

  @media (max-width: 812px) { /* mobile */
    padding-left: 0;
    padding-right: 0;
  }
`

const FiledUnderLink = props => {
  let {children, color, to} = props;

  let arrowcolor = props.arrowcolor ? props.arrowcolor : color

  if(!color) color = red
  if(!to) to = '#'

  return (
    <FiledUnderLinkContainer {...props} href={to} to={to} color={color}>
      <SVGArrow style={{width: 25, marginRight: 10}} color={arrowcolor}/>
      {children}
    </FiledUnderLinkContainer>
  )
}

export default FiledUnderLink
