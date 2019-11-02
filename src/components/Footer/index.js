import React from 'react'
import Link from '../Link'
import styled from 'styled-components'
import get from 'lodash/get'

import berkley from './berkley.png'
import cn from './cn.png'
import haas from './haas.png'
import belonging from './belonging.svg'
import cultures from './cultures.png'

import {
  black
} from '../../colors'

const Column = styled.div`
  display: flex;
  flex-direction: column;
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
`

const MobileRow = styled.div`

  display: flex;
  flex-direction: row;

  margin-top: 40px;
  margin-bottom: 80px;

  @media (min-width: 1025px) { /* desktop */
    
  }

  @media (max-width: 812px) { /* mobile */
    flex-direction: column;
  }
`

const Container = styled(Column)`
  justify-content: center;
  align-items: center;
  padding: 64px;


  font-family: Quicksand;
  font-style: normal;
  font-weight: normal;
  line-height: 28px;
  font-size: 20px;
  text-align: center;

  color: ${black};

`

const ImageHolder = styled(Column)`
  flex: 1;
  align-items: center;
  justify-content: center;

  @media (min-width: 1025px) { /* desktop */
    
  }

  @media (max-width: 812px) { /* mobile */
    
  }
`

const Image = styled.img`
  width: 100%;
  max-width: 400px;

  @media (min-width: 1025px) { /* desktop */
    width: 90%;
  }

  @media (max-width: 812px) { /* mobile */
    
  } 
`

class Footer extends React.Component {
  render() {
    const data = get(this, 'props.data.edges').map( ({node}) => node )[0]
    const footer = get(data, 'field_legal_text.processed')

    return (
      <Container>
        <Row>a production of:</Row>
        <MobileRow>
          <ImageHolder>
            <Image src={belonging} />
          </ImageHolder>

          <ImageHolder>
            <Image src={cn} />
          </ImageHolder>

          <ImageHolder>
            <Image src={berkley} />
          </ImageHolder>

          <ImageHolder>
            <Image src={cultures} />
          </ImageHolder>
        </MobileRow>
        <Row
          style={{marginBottom: 100}}
          dangerouslySetInnerHTML={{ __html: footer }}
        />
      </Container>
    )
  }
}

///

export default Footer
