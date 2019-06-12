import React from 'react'
import styled from 'styled-components'
import kebabCase from 'lodash/kebabCase'
import { 
  Link,
  SVGArrow
} from '../';

import {
  red,
  white,
  softblack
} from '../../colors'

const Container = styled(Link)`
 
`

const Row = styled.div`
  display: flex;
  flex-direction: row;

  align-items: center;
`

const Title = styled.div`
  padding-left:15px;
  font-family: 'Quicksand';
  font-weight: 500;
  font-size: 24px;
  line-height: 42px;
  color: black;
` 

const ArrowContainer = styled.div`
  width: 27px;
  flex-shrink: 0;
  height: 22px;
`

const Arrow = ({color}) => <ArrowContainer>
  <SVGArrow color={color} />
</ArrowContainer>

class SubThemeCard extends React.Component {
  render() {
    const {
      data,
    } = this.props;

    const title = data.name.indexOf(':') >= 0 ? data.name.split(':')[1] : data.name
    const description = data.description ? data.description.value : '!empty content, check drupal!'
    //const link = `/subthemes/${kebabCase(data.name)}`
    const link = data.path.alias
    
    return (
      <Container href={link}>
        <Row>
        <Arrow color={softblack}/><Title color={red}>{title}</Title>
        </Row>
      </Container>
    )
  }
}

export default SubThemeCard
