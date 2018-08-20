import React from 'react'
import styled from 'styled-components'
import get from 'lodash/get'

import {
  Link,
  FiledUnderLink,
  SVGLink,
  SVGPDF,
} from '../'

import getCards from '../../utils/getCards'

import {
  white,
  red,
  softblack,
} from '../../colors'

import PlanPane from './PlanPane'

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

  @media (min-width: 1025px) { /* desktop */
    padding-left: ${PADDING}px;
  }

  @media (max-width: 812px) { /* mobile */
    
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

const SecondTitle = styled.div`
  font-family: Lato;
  font-size: 42px;
  font-weight: 600;
  line-height: 36px;

  letter-spacing: 0.02em;

  color: ${red};

  
  margin-top: 100px;
  margin-bottom: 23px;

  @media (min-width: 1025px) { /* desktop */
    
  }

  @media (max-width: 812px) { /* mobile */
    
  }
`

const LessonsContainer = styled(Column)`

`

const CardsContainer = styled.div`
  display: flex;  
  flex-direction: row; 
  flex-wrap: wrap;

  justify-content: flex-start;
  padding-left: 50px;
  padding-right: 50px;
  padding-bottom: 70px;

  @media (min-width: 1025px) { /* desktop */
    /*justify-content: center;*/
    padding-left: 100px;
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

const LocalLink = styled(Link)`
  display: flex;
  flex-direction: row;

  font-family: Lato;
  font-size: 30px;
  line-height: 42px;
  letter-spacing: 0.02em;
`

///

class Teaching extends React.Component {
  render() {
    const lessons = get(this, `props.data.allNodeLessonPlan.edges`)
    const articles = get(this, `props.data.allNodeArticle.edges`).map(edge => edge.node)
    const interviews = get(this, `props.data.allNodeInterview.edges`).map(edge => edge.node)

    const relatedContent = getCards({articles, interviews})

    const handouts = [
      {
        name: '10 Things to Know About Race',
        link: '#'
      },
      {
        name: 'Another handout…',
        link: '#'
      }
    ]

    const links = [
      {
        name: 'External website 1',
        link: 'https://youtube.com'
      },
      {
        name: 'External website 2',
        link: 'https://google.com'
      },
    ]

    return (
      <Container>
        <TopContainer>
          <ContentColumn>
            <Title>Teaching</Title>
            <Description>{desciption}</Description>
          </ContentColumn>
          <SideBar>
            <Title>&nbsp;</Title>
            <SubTitle>you might also like:</SubTitle>
            <FiledUnderLink color={white} arrowcolor={red}>About the Film</FiledUnderLink>
            <FiledUnderLink color={white} arrowcolor={red}>Explore Key Themes</FiledUnderLink>
          </SideBar>
        </TopContainer>
        <Column>
          <BottomContainer>
            <SecondTitle>Lesson Plans</SecondTitle>
          </BottomContainer>
          <LessonsContainer>
            {
              lessons.map( ({node}, key) => <PlanPane key={key} data={node}/>)
            }
          </LessonsContainer>

          <BottomContainer>
            <SecondTitle>Handouts</SecondTitle>
            <Column>
              {
                handouts.map( ({name, link},key) => <LocalLink to={link} key={'handout'+key}>
                  <SVGPDF style={{width: 25, marginRight: 20}}/>
                  {name}
                </LocalLink>)
              }
            </Column>

            <SecondTitle>External Links</SecondTitle>
            <Column>
              {
                links.map( ({name, link},key) => <LocalLink to={link} key={'handout'+key}>
                  <SVGLink style={{width: 25, marginRight: 20}}/>
                  {name}
                </LocalLink>)
              }
            </Column>

            <SecondTitle>Additional resources</SecondTitle>
          </BottomContainer>
          <CardsContainer>
            { relatedContent }
          </CardsContainer>
        </Column>
      </Container>
    )
  }
}

const desciption = `In the United States, buying a home is the key to achieving the American Dream. Forty-two percent of the net worth of all households consists of equity in their homes - that means for most Americans, their homes are their single largest asset. Homeownership provides families with the means to invest in education, business opportunities, retirement and resources for the next generation.`

export default Teaching
