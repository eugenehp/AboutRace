import React from 'react'
import styled from 'styled-components'

import { black, red, white } from '../colors'
import { DISPLAY_NAMES_TO_SLUG } from '../constants'

const Container = styled.div`
  mix-blend-mode: normal;
  text-align: center;
  margin-bottom: 15px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  padding-top: 45px;
  padding-left: 138px;

  font-size: 12px;
  line-height: 24px;
  letter-spacing: 0.22em;
  font-family: 'Lato';
  color: ${props => props.color ? props.color : black};
  opacity: 0.8;

  @media (max-width: 812px) { /* mobile */
    display: none;
  }
`

const Label = styled.div`
  margin-right: 15px;
`

const Button = styled.div`
  cursor: pointer;
  margin-right: 15px;
  margin-bottom: 15px;
  
  color: ${ props => props.selected ? red : white};
  text-transform: uppercase;
`

const itemExists = (itemTag, parent) => parent.relationships[itemTag]

const Filters = ({ queryParams, filter, subtheme, toggleFilter, color}) => {
  const array = Array
    .from(DISPLAY_NAMES_TO_SLUG.keys())
    .filter(itemType => (itemType === `recently added` || itemExists(itemType, subtheme)))

  return (
    <Container color={color}>
      <Label>View:</Label>
        <Button 
          onClick={ () => toggleFilter(null) }
          selected={!filter}
        >
          All
        </Button>
      {
        array.map(filterType => {
          const filterSlug = DISPLAY_NAMES_TO_SLUG.get(filterType)

          return (
            <Button
              key={filterType}
              onClick={ () => toggleFilter(filterSlug) }
              selected={filter === filterSlug}
            >
              {filterType}
            </Button>
        )})
      }
    </Container>
  )
}

export default Filters;
