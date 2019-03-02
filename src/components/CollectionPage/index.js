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
  fogwhite,
  smokegrey,
  softblack,
  gold,
  smokeblue,
} from '../../colors'

const PADDING = 60;
const PADDING_TABLET = 80;
const gradient = `linear-gradient(to bottom, #69D7DB 0%, #DBD8FF 100%)`

const Container = styled.div`
  width: 100%;

  background: ${smokegrey};
  
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
  justify-content: center;

  padding: 20px;
  padding-left: ${PADDING_TABLET}px;
  padding-right: ${PADDING_TABLET}px;

  @media (min-width: 1025px) { /* desktop */
    flex-direction: row;
    padding-left: ${PADDING}px;

  }

  @media (max-width: 812px) { /* mobile */
     padding-bottom: ${PADDING_TABLET}px;
  }
`

const BottomContainer = styled(Column)`

  @media (min-width: 1025px) { /* desktop */

  }

  @media (max-width: 812px) { /* mobile */
    padding-left: 0;
    margin-top: -50px;
  }
`

const Title = styled.div`
display:none;
  font-family: 'Neue Plak W01 Bold';
  font-weight: 500;
  font-size: 36px;
  line-height: 42px;
  max-width: 469px;
  margin-bottom: 17px;
  letter-spacing: 0.06em;
  color: ${fogwhite};
  text-transform: uppercase;
`

const Description = styled.div`
  font-family: "ff-tisa-web-pro";
  font-size: 17px;
  line-height: 21px;
  
  max-width: 469px;
  text-align: left;
  color: ${fogwhite};

  & p {
    margin: 0;
  }
`

const ContentColumn = styled(Column)`
  display: flex;
  flex-direction: column;
  justify-content: center;

  width: 306px;
  padding: 30px;
  text-align: center;
  
  @media (min-width: 1025px) { /* desktop */
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
  font-family: Quicksand;
  font-weight: 500;
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

  justify-content: center;
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

  componentDidMount() {
    setTimeout(()=>window.scrollTo(0,0),1)
  }

  render() {
    const title = get(this, 'props.title')
    const description = get(this, 'props.description')
    const cards = get(this, 'props.cards')

    const relatedContent = getCards(cards)

    if(this.props.sort != undefined){
      switch(this.props.sort){
        case 'field_resource_weight':

          relatedContent.sort(function(a, b){
            return a.props.data.field_resource_weight-b.props.data.field_resource_weight
          })  
        break;
      }
    }

    return (
      <Container>
        <TopContainer>
          
          {/* <SideBar>
            <Title>&nbsp;</Title>
            <SubTitle>you might also like:</SubTitle>
            <FiledUnderLink color={white} arrowcolor={red}>About the Film</FiledUnderLink>
            <FiledUnderLink color={white} arrowcolor={red}>Explore Key Themes</FiledUnderLink>
          </SideBar> */}
        </TopContainer>
        <BottomContainer>
          {
            this.props.children
          }
          <CardsContainer>
          <ContentColumn>
            <Title>{title}</Title>
            <Description dangerouslySetInnerHTML={{ __html: description }}/>
          </ContentColumn>
            { relatedContent }
          </CardsContainer>
        </BottomContainer>
      </Container>
    )
  }
}

export default CollectionPage
