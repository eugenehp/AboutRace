import React from 'react'
import styled from 'styled-components'

import {
  Link,
  SVGArrow
} from './'

import {
  black,
} from '../colors'

const FiledUnderLinkContainer = styled(Link)`
  display: flex;
  flex-direction: row;

  align-items: center;

  padding-left: 0;
  padding-right: 10px;
  padding-bottom:18px;

  font-family: 'Quicksand';
  font-weight: 500;
  font-size: 24px;
  
  text-transform: capitalize;
  text-decoration: none;

  color: ${props => props.color};

  @media (min-width: 1025px) { /* desktop */

  }

  @media (max-width: 812px) { /* mobile */
    padding-left: 0;
    padding-right: 0;
  }
`

const FiledUnderLinkContainerDiv = styled.div`
  display: flex;
  flex-direction: row;

  align-items: center;

  padding-left: 0;
  padding-right: 10px;
  padding-top:15px;

  font-family: 'Quicksand';
  font-weight: 500;
  font-size: 18px;
  
  text-transform: capitalize;

  color: ${props => props.color};

  @media (min-width: 1025px) { /* desktop */

  }

  @media (max-width: 812px) { /* mobile */
    padding-left: 0;
    padding-right: 0;
  }
`

const FiledUnderLink = props => {
  let {children, color, to, direction} = props;

  let arrowcolor = props.arrowcolor ? props.arrowcolor : color

  if(!color) color = black
  if(!direction) direction = 'right'
  if(!to) to = '#'

  let styleTransform = 'rotate(0deg)';
  if(direction == 'left'){
    styleTransform = 'rotate(180deg)';
  }

  if(props.noLink)
  return (
    <FiledUnderLinkContainerDiv {...props} href={to} to={to} color={color}>
      <SVGArrow style={{width: 25, marginRight: 10, transform:styleTransform}} color={arrowcolor}/>
      {children}
    </FiledUnderLinkContainerDiv>
  )
  else
  return (
    <FiledUnderLinkContainer {...props} href={to} to={to} color={color}>
      <SVGArrow style={{width: 27, flexShrink:0, marginRight: 15, transform:styleTransform}} color={arrowcolor}/>
      {children}
    </FiledUnderLinkContainer>
  )
}

export default FiledUnderLink
