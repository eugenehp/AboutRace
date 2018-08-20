import React from 'react'
import styled from 'styled-components'
import get from 'lodash/get'

import {
  white
} from '../../colors'

const gradient = `linear-gradient(to bottom, rgba(255,255,255,0.66) 0%, rgba(245,238,182,0.92) 100%)`

const Container = styled.div`
  background-color: ${white};

  @media (max-width: 812px) { /* mobile */

  }
`

const TopContainer = styled.div`
  position: relative;

  width: 100vw;
  min-height: 700px;

  &::before {
    position: absolute;
    content: '';

    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    background-size: cover !important;
    background-attachment: fixed;
    background: ${ props => props.background ? `url(${props.background}) center no-repeat` : null };

    filter: blur(9px);
  }

  &::after {
    position: absolute;
    content: '';

    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    background: ${gradient};

    opacity: 0.79;
  }
`

const InnerContainer = styled.div`
  position: absolute;

  width: 100vw;
  min-height: 700px;

  top: 0;
  left: 0;
  right: 0;
`

const Race = styled.div`
  position: absolute;

  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  display: flex;
  flex-direction: row;

  justify-content: center;
  align-items: center;

  font-family: Lato;
  font-size: 300px;
  line-height: 84px;
  font-weight: bold;

  letter-spacing: 0.1em;

  color: rgba(255,255,255,0.57);

  text-transform: uppercase;
`

const Power = styled.div`
  position: absolute;

  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  display: flex;
  flex-direction: row;

  justify-content: center;
  align-items: center;

  font-family: Lato;
  font-size: 30px;
  line-height: 36px;
  font-weight: bold;

  letter-spacing: 0.36em;

  text-transform: uppercase;

  color: rgba(34,34,34,0.84);
`

export default ({ data, location }) => {
  const background = get(data, `taxonomyTermThemes.relationships.field_theme_image.localFile.childImageSharp.original.src`)

  // const cards = { interviews }

  // const props = {
  //   cards
  // }

  return (
    <Container>
      <TopContainer background={background} />
      <InnerContainer>
        <Race>race</Race>
        <Power>THE POWER OF AN ILLUSION</Power>
      </InnerContainer>
    </Container>
  )
}