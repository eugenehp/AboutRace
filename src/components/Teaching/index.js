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
  green,
  softblack,
} from '../../colors'

import PlanPane from './PlanPane'

const PADDING = 60;
const PADDING_TABLET = 60;

const Container = styled.div`
  width: 100%;
  
  background: ${green};

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


  padding: 20px;
  padding-top: 30px;
  padding-left: ${PADDING_TABLET}px;
  padding-right: ${PADDING_TABLET}px;

  @media (min-width: 1025px) { /* desktop */
    flex-direction: row;
    padding-left: ${PADDING}px;
    padding-right: 0;

  }

  @media (max-width: 812px) { /* mobile */
     padding-bottom: ${PADDING_TABLET}px;
  }
`

const HandoutsContainer = styled.div`
  margin-bottom: 60px;
`

const ExternalLinksContainer = styled.div`
  margin-bottom: 60px;
`

const BottomContainer = styled(Column)`
  padding-left: ${PADDING_TABLET}px;
  margin-bottom: 15px;

  @media (min-width: 1025px) { /* desktop */
    padding-left: ${PADDING}px;
  }

  @media (max-width: 812px) { /* mobile */
    
  }
`

const Title = styled.div`
  font-family: 'Quicksand';
  font-weight: 500;
  font-size: 36px;
  line-height: 60px;


  color: ${softblack};
`

const Description = styled.div`
  font-family: 'ff-tisa-web-pro';
  font-size: 17px;
  line-height: 24px;
  max-width: 469px;
  padding-bottom: 36px;

  color: ${softblack};

  & p {
    margin: 0;
  }
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
  font-family: 'Quicksand';
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

const SecondTitle = styled.div`
  font-family: 'Quicksand';
  font-size: 27px;
  font-weight: 500;
  line-height: 36px;

  letter-spacing: 0.02em;

  @media (min-width: 1025px) { /* desktop */
    
  }

  @media (max-width: 812px) { /* mobile */
    
  }
`

const LessonsContainer = styled(Column)`
  padding-left: ${PADDING_TABLET}px;
  padding-right: ${PADDING_TABLET}px;
  margin-bottom: 60px;

  @media (min-width: 1025px) { /* desktop */
    padding-left: ${PADDING}px;
    padding-right: ${PADDING}px;
  }

  @media (max-width: 812px) { /* mobile */
    
  }
`

const CardsContainer = styled.div`
  display: flex;  
  flex-direction: row; 
  flex-wrap: wrap;

  justify-content: flex-start;
  padding-left: 50px;
  padding-right: 50px;
  padding-bottom: 70px;

  justify-content: center;

  @media (min-width: 1025px) { /* desktop */
    /*justify-content: center;*/
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

  font-family: 'Quicksand';
  font-weight: 500;
  font-size: 20px;
  line-height: 45px;
`

///

class Teaching extends React.Component {
  render() {
    const lessons = get(this, `props.data.allNodeLessonPlan.edges`)

    // const articles = get(this, `props.data.allNodeArticle.edges`).map(edge => edge.node)
    const articleQuery = get(this, `props.data.allNodeArticle.edges`);
    let articles = []
    if(articleQuery != undefined){
      articles = articleQuery.map(edge => edge.node)
    }

    // const interviews = get(this, `props.data.allNodeInterview.edges`).map(edge => edge.node)
    const interviewQuery = get(this, `props.data.allNodeInterview.edges`);
    let interviews = []
    if(interviewQuery != undefined){
      interviews = interviewQuery.map(edge => edge.node)
    }


    const relatedContent = getCards({articles, interviews})

    const handouts = get(this, `props.data.allNodeHandout.edges`).map(edge => edge.node)

    const links = get(this, `props.data.allNodeExternalLink.edges`).map(edge => edge.node)

    return (
      <Container>
        <TopContainer>
          <ContentColumn>
            <Title>Teaching</Title>
            <Description dangerouslySetInnerHTML={{ __html: get(this, `props.data.taxonomyTermForTeachers.field_intro_text.processed`) }}/>
          </ContentColumn>
          {/* <SideBar>
            <Title>&nbsp;</Title>
            <SubTitle>you might also like:</SubTitle>
            <FiledUnderLink color={white} arrowcolor={red}>About the Film</FiledUnderLink>
            <FiledUnderLink color={white} arrowcolor={red}>Explore Key Themes</FiledUnderLink>
          </SideBar> */}
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
            <HandoutsContainer>
              <SecondTitle>Handouts</SecondTitle>
              <Column>
                {
                  handouts.map( ({title, link},key) => <LocalLink to={link} key={'handout'+key}>
                    <SVGPDF style={{width: 25, marginTop:6, marginRight: 20}}/>
                    {title}
                  </LocalLink>)
                }
              </Column>
            </HandoutsContainer>
            <ExternalLinksContainer>
              <SecondTitle>External Links</SecondTitle>
              <Column>
                {
                  links.map( ({title, uri},key) => <LocalLink to={uri} key={'link'+key}>
                    <SVGLink style={{width: 25, marginTop:6, marginRight: 20}}/>
                    {title}
                  </LocalLink>)
                }
              </Column>
            </ExternalLinksContainer>
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



export default Teaching
