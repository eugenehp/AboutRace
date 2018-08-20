import React from 'react'
import styled from 'styled-components'
import kebabCase from 'lodash/kebabCase'
import get from 'lodash/get'

import {
  FiledUnderLink,
  PlayButton
} from '../'

import getCards from '../../utils/getCards'

import {
  black,
  white,
  darkWhite,
  red,
} from '../../colors'

const TICKER = 'CLIP'
const gradient = `linear-gradient(to bottom, #324558 0%, rgba(0,0,0,0.92) 100%)`
const gradient2 = `linear-gradient(to bottom, #A7C6D9 0%, rgba(29,69,59,0.92) 100%)`

const Container = styled.div`
  width: 100%;
  
  display: flex;
  flex-direction: column;

  @media (min-width: 1025px) { /* desktop */

  }

  @media (max-width: 812px) { /* mobile */
     
  }
`

const TopContainer = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;

  width: 100%;
  height: auto;
  min-height: 683px;

  background: ${gradient};

  @media (min-width: 1025px) { /* desktop */
    background-color: ${ props => props.overlay ? 'rgba(0,0,0,0)' : white };
    background-image: ${ props => props.overlay ? 'none' : gradient };
  }

  @media (max-width: 812px) { /* mobile */
    background-color: ${white};
    z-index: 1;
  }
`

const BottomContaniner = styled.div`
  position: relative;

  width: 100%;
  padding-top: 20px;

  z-index: 2;

  background-color: ${black};
  background-image: ${gradient2};

  @media (min-width: 1025px) { /* desktop */
    background-color: ${ props => props.overlay ? 'rgba(0,0,0,0)' : white };
    background-image: ${ props => props.overlay ? 'none' : gradient };
  }

  @media (max-width: 812px) { /* mobile */
     
  }
`

const getFiledUnder = array => {
  let results = []

  if(array)
  array.map( ({name}) =>
    results.push({
      name,
      link: `/subthemes/${kebabCase(name)}`
    })
  )

  return results
}

const getTags = array => {
  let results = []

  if(array)
  results = array.map( ({name}) => name )

  return results
}

const getRelatedContent = array => {
  const cards = {
    articles: [],
    clips: [],
    faqs: [],
  }

  array && array.forEach(item => {
    switch(item.__typename){
      case 'node__faq':
        cards.faqs.push(item)
        break
      case 'node__article':
        cards.articles.push(item)
        break
      case 'node__clip':
        cards.clips.push(item)
        break
      default:
        break;
    }
  })

  return getCards(cards)
}

const Row = styled.div`
  display: flex;
  flex-direction: row;
`

const Column = styled.div`
  display: flex;
  flex-direction: column;
`

const AllEntitiesContainer = styled(Row)`
  position: absolute;
  top: 0;
  right: 0;

  padding-top: 90px;
  padding-right: 60px;

  z-index: 4;

  @media (min-width: 1025px) { /* desktop */
    
  }

  @media (max-width: 812px) { /* mobile */
    justify-content: center;
  }
`

const AllEntitiesText = `All ${TICKER.toLowerCase()}s`
const AllEntities = () => <AllEntitiesContainer>
  <FiledUnderLink color={white}>{AllEntitiesText}</FiledUnderLink>
</AllEntitiesContainer>

///

const Content = styled(Row)`

  padding-top: 100px;

`

const SideBar = styled(Column)`
  display: none;
  min-width: 400px;

  padding-left: 60px;
  padding-right: 60px;

  @media (min-width: 1025px) { /* desktop */
    display: flex;
  }

  @media (max-width: 812px) { /* mobile */
    display: none;
  }
`

const ContentBar = styled(Column)`
  align-items: center;
`

const SubTitle = styled.div`
  font-family: Lato;
  font-size: 12px;
  line-height: 28px;
  letter-spacing: 0.22em;

  text-transform: uppercase;

  color: ${white};

  padding-left: 0;

  @media (min-width: 1025px) { /* desktop */
    padding-left: 15px;
  }

  @media (max-width: 812px) { /* mobile */
    padding-left: 0;
  }
`

///

const Tags = styled.div`
  padding-left: 0;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  
  overflow: auto;

  @media (min-width: 1025px) { /* desktop */
    padding-left: 15px;
  }

  @media (max-width: 812px) { /* mobile */
    padding-left: 0;
  }
`

const Tag = styled.div`
  padding-left: 10px;
  padding-right: 10px;

  font-family: Lato;
  font-size: 15px;
  line-height: 36px;
  letter-spacing: 0.22em;
  font-weight: 600;

  text-transform: uppercase;

  color: ${red};

  margin-right: 15px;
  margin-bottom: 15px;

  border-radius: 3px;
  background-color: ${white};
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
    justify-content: center;
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

const IMAGE_WIDTH = 663

const MainImage = styled.div`
  cursor: pointer;

  display: flex;
  flex-direction: row;

  justify-content: center;
  align-items: center;

  color: ${white};

  width: ${IMAGE_WIDTH}px;
  height: 391px;

  border-radius: 3px;
  background-color: ${white};

  background-size: cover !important;
  background-attachment: fixed;
  background: ${ props => props.background ? `url(${props.background}) center no-repeat` : null };

  @media (min-width: 1025px) { /* desktop */
    
  }

  @media (max-width: 812px) { /* mobile */
    width: 100vw;
  }
`

const Title = styled.div`
  width: ${IMAGE_WIDTH}px;

  font-family: 'Tisa Pro';
  font-size: 20px;
  line-height: 24px;

  margin-top: 15px;

  color: ${darkWhite};
`

const Footer = styled(Row)`
  display: flex;

  width: auto;
  min-height: 20vh;

  padding-bottom: 90px;

  @media (min-width: 1025px) { /* desktop */
    display: none;
  }

  @media (max-width: 812px) { /* mobile */
    display: flex;
  }
`

const MobileRow = styled(Row)`
  align-items: center;
  padding-left: 60px;

  margin-top: 60px;

  @media (max-width: 812px) { /* mobile */
    flex-direction: column;
    padding-left: 0;
    margin-top: 0;

    justify-content: center;
    align-items: flex-start;
  }
`

const MobileColumn = styled(Column)`
  padding: 0;

  @media (max-width: 812px) { /* mobile */
    margin-top: 45px;
    padding-left: 20px;
  }
`

const MobileSubTitle = styled(SubTitle)`
  padding-left: 100px;
  padding-bottom: 30px;

  @media (max-width: 812px) { /* mobile */
    padding-left: 20px;
  }
`

const nodeName = 'nodeClip'

class Clip extends React.Component {
  render() {
    const {overlay} = this.props

    const background = get(this, `props.data.${nodeName}.relationships.field_poster_image.localFile.childImageSharp.original.src`)
    // const videoURL = get(this, `props.data.${nodeName}.field_external_video_url.uri`)
    const title = get(this, `props.data.${nodeName}.title`)

    const filedUnder = getFiledUnder(get(this, `props.data.${nodeName}.relationships.field_belongs_to_subtheme`))
    const tags = getTags(get(this, `props.data.${nodeName}.relationships.field_tags`))

    const relatedContent = getRelatedContent(get(this, `props.data.${nodeName}.relationships.field_article_related_content`))

    return (
      <Container>
        <TopContainer overlay={overlay}>
          { !overlay && <AllEntities /> }
          <Content>
            <SideBar>
              <SubTitle>filed under:</SubTitle>
              {
                filedUnder.map( ({name, link}, key) => <FiledUnderLink key={key} to={link}>{name}</FiledUnderLink>)
              }
              {
                tags.length > 0
                &&
                <SubTitle style={{marginTop: 90}}>explore:</SubTitle>
              }
              <Tags>
                {
                  tags.map( (name, key) => <Tag key={key}>{name}</Tag>)
                }
              </Tags>
            </SideBar>
            <ContentBar>
              <MainImage background={background}>
                <PlayButton size={72}/>
              </MainImage>
              <Title>{title}</Title>
            </ContentBar>
          </Content>
        </TopContainer>
        <BottomContaniner overlay={overlay}>
          <Footer>
            <MobileRow>
              <MobileColumn>
                <SubTitle>filed under:</SubTitle>
                {
                  filedUnder.map( ({name, link}, key) => <FiledUnderLink key={key} to={link}>{name}</FiledUnderLink>)
                }
              </MobileColumn>
                
              <MobileColumn>
                {
                  tags.length > 0
                  &&
                  <SubTitle>explore:</SubTitle>
                }
                <Tags>
                  {
                    tags.map( (name, key) => <Tag key={key}>{name}</Tag>)
                  }
                </Tags>
              </MobileColumn>
            </MobileRow>
          </Footer>
          <MobileSubTitle>see also:</MobileSubTitle>
          <CardsContainer>
            { relatedContent }
          </CardsContainer>
        </BottomContaniner>
      </Container>
    )
  }
}

export default Clip
