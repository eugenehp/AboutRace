import React from 'react'
import styled from 'styled-components'
import get from 'lodash/get'
import FlipMove from 'react-flip-move'

import {
  FiledUnderLink,
} from '../'

import getCards from '../../utils/getCards'

import {
  white,
  red,
  softblack,
} from '../../colors'

const PADDING = 138;
const PADDING_TABLET = 80;
const gradient = `linear-gradient(to bottom, #69D7DB 0%, #DBD8FF 100%)`

const Container = styled.div`
  width: 100%;
  
  display: flex;
  flex-direction: column;

  @media (min-width: 1025px) { /* desktop */

  }

  @media (max-width: 812px) { /* mobile */
     
  }
`

const Column = styled.div`
  display: flex;
  flex-direction: column;
`

const TopContainer = styled.div`
  display: flex;
  flex-direction: column;

  background: ${gradient};

  min-height: 300px;

  padding: 20px;
  padding-top: 160px;
  padding-left: ${PADDING_TABLET}px;
  padding-right: ${PADDING_TABLET}px;

  @media (min-width: 1025px) { /* desktop */
    flex-direction: row;
    padding-left: ${PADDING}px;
    padding-right: 0;

    min-height: 500px;
  }

  @media (max-width: 812px) { /* mobile */
     padding-bottom: ${PADDING_TABLET}px;
  }
`

const BottomContainer = styled(Column)`
  padding-left: ${PADDING_TABLET}px;
  margin-top: -100px;

  @media (min-width: 1025px) { /* desktop */
    padding-left: ${PADDING}px;
    margin-top: -200px;
  }

  @media (max-width: 812px) { /* mobile */
    padding-left: 0;
    margin-top: -50px;
  }
`

const Title = styled.div`
  font-family: 'Tisa Pro';
  font-size: 48px;
  line-height: 60px;

  margin-bottom: 17px;

  color: ${white};
`

const Description = styled.div`
  font-family: 'Tisa Pro';
  font-size: 20px;
  line-height: 24px;

  color: ${softblack};
`

const ContentColumn = styled(Column)`
  
  @media (min-width: 1025px) { /* desktop */
    flex: 1;
  }

  @media (max-width: 812px) { /* mobile */
     
  }
`

const SideBar = styled.div`
  position: absolute;
  top: 0;
  right: 20px;

  @media (min-width: 1025px) { /* desktop */
    position: relative;
    display: flex;
    flex-direction: column;

    flex: 1;
    padding-left: 270px;
  }

  @media (max-width: 812px) { /* mobile */
     display: none;
  }
`

const SubTitle = styled.div`
  font-family: Lato;
  font-size: 12px;
  line-height: 28px;
  letter-spacing: 0.22em;

  text-transform: uppercase;

  padding-left: 0;

  @media (min-width: 1025px) { /* desktop */
    padding-left: 15px;
  }

  @media (max-width: 812px) { /* mobile */
    padding-left: 0;
  }
`

const CardsContainer = styled(FlipMove)`
  display: flex;  
  flex-direction: row; 
  flex-wrap: wrap;

  justify-content: flex-start;
  padding-left: 0;
  padding-right: 50px;
  padding-bottom: 70px;

  @media (min-width: 1025px) { /* desktop */
    padding-left: 0;
    padding-right: 0;
    padding-bottom: 200px;
  }

  @media (max-width: 812px) { /* mobile */
    justify-content: center;
    align-items: center;
    padding-left: 0;
    padding-right: 0;

    min-width: 100vw;
  }
`

class CollectionPage extends React.Component {

  render() {
    const title = get(this, 'props.title')
    const description = get(this, 'props.description')
    const cards = get(this, 'props.cards')

    const relatedContent = getCards(cards)

    return (
      <Container>
        <TopContainer>
          <ContentColumn>
            <Title>{title}</Title>
            <Description dangerouslySetInnerHTML={{ __html: description }}/>
          </ContentColumn>
          <SideBar>
            <Title>&nbsp;</Title>
            <SubTitle>you might also like:</SubTitle>
            <FiledUnderLink color={white} arrowcolor={red}>About the Film</FiledUnderLink>
            <FiledUnderLink color={white} arrowcolor={red}>Explore Key Themes</FiledUnderLink>
          </SideBar>
        </TopContainer>
        <BottomContainer>
          {
            this.props.children
          }
          <CardsContainer>
            { relatedContent }
          </CardsContainer>
        </BottomContainer>
      </Container>
    )
  }
}

export default CollectionPage
