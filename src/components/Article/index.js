import React from 'react'
import styled, { css } from 'styled-components'
import kebabCase from 'lodash/kebabCase'
import get from 'lodash/get'
import { Link } from 'gatsby'

import {
  FiledUnderLink,
  Overlay,
  OverlayBody,
  CloseButton,
  TagTitle
} from '../'

import getCards from '../../utils/getCards'

import {
  black,
  white,
  darkWhite,
  whiteShadowTrans,
  rose,
  softblack,
  articles,
} from '../../colors'

import reorder from '../../utils/reorder'
import shuffle from '../../utils/shuffle'

const range = require('range')

const TICKER = 'ARTICLE'
const gradient2 = `linear-gradient(to bottom, #2A495C 0%, rgba(29,69,59,0.92) 100%)`

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  background-color: ${articles};

  @media (min-width: 1025px) { /* desktop */

  }

  @media (max-width: 812px) { /* mobile */
     
  }
`

const TopContainer = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;

  width: 100%;
  height: auto;


  @media (min-width: 1025px) { /* desktop */

  }

  @media (max-width: 812px) { /* mobile */
    z-index: 1;
  }
`

const BottomContaniner = styled.div`
  position: relative;

  width: 100%;
  margin-top: -100px;

  padding-top: 60px;

  z-index: 2;

  background-color: ${black};
  background-image: ${gradient2};

  @media (min-width: 1025px) { /* desktop */
    background-color: ${ props => props.overlay ? 'rgba(0,0,0,0)' : white };
    background-image: none;
  }

  @media (max-width: 812px) { /* mobile */
     
  }
`

const MainImage = styled.div`
  width: auto;
  height: 456px;
  margin-top: -30px;
  margin-left: -7vw;
  margin-right: -7vw;
  margin-bottom: 15px;
  border-bottom: solid 1px #ececec;

  background-size: cover !important;
  background-attachment: fixed;
  background: ${ props => props.background ? `url(${props.background}) center no-repeat` : null };

  @media (min-width: 1025px) { /* desktop */
    
    
  }

  @media (max-width: 812px) { /* mobile */
  
  }
`

const TextContainer = styled.div`
  z-index: 3;

  padding: 42px 30px;

  @media (min-width: 1025px) { /* desktop */
    min-width: 1000px;
    max-width: 1200px;
  }

  @media (max-width: 812px) { /* mobile */
    //width: 100vw;
    max-width:100%;
    padding:42px 0px;
  }
`

const TextInnerContainer = styled.div`
  position: relative;

  display: flex;
  flex-direction: row;

  width: auto;
  height: auto !important;

  border-top-right-radius: 3px;
  border-bottom-left-radius: 3px;

  color: ${softblack};

  margin-bottom: 50px;

  &::before {
    content: '${TICKER}';
    position: absolute;
    display:none;

    height: 45px;

    font-family: Quicksand;
    font-weight: 500;
    font-size: 12px;
    line-height: 50px;
    letter-spacing: 0.22em;

    top: -45px;
    left: 0;

    background-color: ${white};

    padding-left: 14px;
    padding-right: 14px;

    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
  }
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
`

const Column = styled.div`
  display: flex;
  flex-direction: column;
`

const Filing = styled.div`
padding-bottom: 15px;
`

const Title = styled.div`
  font-family: 'ff-tisa-web-pro';
  font-size: 42px;
  line-height: 48px;
`

const Author = styled.div`
  font-family: 'Quicksand';
  font-weight: 500;
  font-size: 12px;
  line-height: 18px;
  letter-spacing: 0.12em;

  text-transform: uppercase;

  padding-top: 18px;
  padding-bottom: 15px;
`

const IntroText = styled.div`
  font-family: 'ff-tisa-web-pro';
  font-weight: 500;
  font-size: 24px;
  line-height: 30px;
  & p {
    margin-bottom: 0;
    -webkit-margin-after: 0;
  }
`

const Text = styled.div`
  font-family: 'ff-tisa-web-pro';
  font-size: 17px;
  line-height: 24px;
`

const ContentBar = styled(Column)`
  flex: 1;
  padding: 30px 7vw;

  margin-top: -30px;

  z-index: 10;

  background-color: ${white};

  @media (min-width: 1025px) { /* desktop */
    
  }

  @media (max-width: 812px) { /* mobile */
    padding: 10px;
  }
`

const SideBar = styled(Column)`
position: relative;

display: none !important;

padding-left:30px;

display: flex;
flex-direction: column;

width: 336px;

@media (min-width: 1025px) { /* desktop */
  display: flex !important;
}

@media (max-width: 812px) { /* mobile */
  display: none;
}
`

const AuthorImage = styled.div`
  height: 348px;

  border-top-right-radius: 3px;

  background-size: cover !important;
  background-attachment: fixed;
  background: ${ props => props.background ? `url(${props.background}) center no-repeat` : null };

  @media (max-width: 812px) { /* mobile */
    width: 100vw;
    max-width: 100vw;
    margin-left: 0px;
  }
`

const Bio = styled.div`
  padding-top: 15px;
  font-family: "ff-tisa-web-pro";
  font-weight: 400;
  font-size: 17px;
  line-height: 24px;
  & p {
    margin: 0;
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
  }

  @media (max-width: 812px) { /* mobile */
    padding-left: 0;
  }
`

const Tag = styled.div`
  cursor: pointer;
  padding-left: 10px;
  padding-right: 10px;

  font-family: 'Quicksand';
  font-size: 14px;
  line-height: 36px;
  letter-spacing: 0.12em;
  font-weight: 500;

  text-transform: uppercase;


  margin-right: 15px;
  margin-bottom: 15px;

  border-radius: 3px;
  background-color: ${white};
  transition: all .5s;

  & :hover {
    background-color: ${rose};
    transition: all .5s;
  }
`

const BackTo = styled.div`
  width: 100%;

  @media (min-width: 1025px) { /* desktop */
    position: absolute;
    right: 0;
    bottom: 0;

    padding-bottom: 50px;
  }

  @media (max-width: 812px) { /* mobile */
    padding-bottom: 50px;
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

  @media (min-width: 1025px) { /* desktop */
    justify-content: center;
    padding-left: 0;
    padding-right: 0;
    margin-left: -15px;
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

const TextFooter = styled(Row)`
  position: relative;

  display: flex;
  flex-direction: row;

  margin-top: 50px;
  margin-left: 50px;
  margin-right: 50px;

  justify-content: center;

  @media (min-width: 1025px) { /* desktop */
    display: none;
  }

  @media (max-width: 812px) { /* mobile */
    margin-left: 0;
    margin-right: 0;
    padding-bottom: 100px;
  }
`

const Footer = styled(Row)`
  display: flex;

  width: auto;
  min-height: 20vh;

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
  }
`

const FirstMobileRow = styled(MobileRow)`
  @media (max-width: 812px) { /* mobile */
    margin-top: -150px;
  }
`

const MobileColumn = styled(Column)`
  padding: 0;

  @media (max-width: 812px) { /* mobile */
    padding-top: 60px;
    padding-left: 10px;
  }
`

const getFiledUnder = array => {
  let results = []

  array.map( ({name, path}) =>
    results.push({
      name,
      link: path.alias
      //link: `/subthemes/${kebabCase(name)}`
    })
  )

  return results
}

const getTags = array => {
  let results = []

  if(array)
  results = array.map( ({name, relationships}) => {
    return {
      name,
      cards: relationships
    }
  })

  return results
}

const getRelatedContent = array => {
  const cards = {
    articles: [],
    interviews: [],
    clips: [],
    faqs: [],
    qa: [],
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
      case 'node__interview':
        cards.interviews.push(item)
        break
      default:
        break;
    }
  })

  return getCards(cards)
}

const AllEntitiesContainer = styled(Row)`
  justify-content: flex-start;

  padding-top: 30px;
  padding-left: 60px;

  z-index: 4;

  @media (min-width: 1025px) { /* desktop */

  }

  @media (max-width: 812px) { /* mobile */
    justify-content: center;
    padding-right: 0;
  }
`

const AllEntitiesText = `All ${TICKER.toLowerCase()}s`
const AllEntities = () => <AllEntitiesContainer>
  <FiledUnderLink color={softblack} to='/articles' direction={'left'}>{AllEntitiesText}</FiledUnderLink>
</AllEntitiesContainer>

///

class Article extends React.Component {

  constructor(props) {
    super(props);
  
    this.state = {
      tagName: null,
      tagCards: []
    };
  }

  componentDidMount() {
    setTimeout(()=>window.scrollTo(0,0),1)
  }

  renderOverlay = (name, cards) => {
    const tagsContent = getCards(cards)
    const order = shuffle(range.range(tagsContent.length))
    const shuffledCards = reorder(tagsContent, order)

    return (
      <Overlay visible={name}>
        <OverlayBody>
          <Row style={{marginBottom: 120}}>
            <Row style={{
              position: 'fixed',
              flex: 1,
              zIndex: 5,
              justifyContent: 'center',
              top: 0, left: 0, right: 0
            }}>
              <TagTitle>{name}</TagTitle>
            </Row>
            <Row
              style={{
                position: 'fixed',
                zIndex: 5,
                top: 0,
                right: 30
              }}
            >
              <CloseButton
                color={black}
                simple={true} 
                onClick={ () => this.setState({
                  tagName: null,
                  tagCards: []
                })}
              />
            </Row>
          </Row>
          <CardsContainer>
            { shuffledCards }
          </CardsContainer>
        </OverlayBody>
      </Overlay>
    )
  }

  ///

  render() {
    const {tagName, tagCards} = this.state
    const {overlay} = this.props
    const nodeName = 'nodeArticle'

    const background = get(this, `props.data.${nodeName}.relationships.field_main_image.localFile.childImageSharp.original.src`)

    const title = get(this, `props.data.${nodeName}.title`)
    const author = get(this, `props.data.${nodeName}.field_author.processed`)
    const authorImage = get(this, `props.data.${nodeName}.relationships.field_author_image.localFile.childImageSharp.original.src`)
    const authorBio = get(this, `props.data.${nodeName}.field_author_bio.processed`)
    const introText = get(this, `props.data.${nodeName}.field_large_callout_text.processed`)
    const text = get(this, `props.data.${nodeName}.field_full_version.processed`)

    const filedUnder = getFiledUnder(get(this, `props.data.${nodeName}.relationships.field_belongs_to_subtheme`))
    const tags = getTags(get(this, `props.data.${nodeName}.relationships.field_tags`))
    const backTo = filedUnder[0]

    const relatedContent = getRelatedContent(get(this, `props.data.${nodeName}.relationships.field_article_related_content`))
    
    const expertName = get(this, `props.data.${nodeName}.relationships.field_expert_reference.title`)  
    const expertLink = get(this, `props.data.${nodeName}.relationships.field_expert_reference.path.alias`)  

    const LocalBackTo = () => (
      <BackTo>
        <SubTitle>back to:</SubTitle>
        <FiledUnderLink key="backTo" to={backTo.link}>{backTo.name}</FiledUnderLink>
      </BackTo>
    )

    ///

    const renderTags = () => (
      <Tags>
        {
          tags.map( ({name, cards}, key) => <Tag
            key={key}
            onClick={ () => this.setState({
                tagName: name,
                tagCards: cards
              })
            }
          >
            {name}
          </Tag>)
        }
      </Tags>
    )

    const DesktopSideBar = () => (
      <SideBar>
        {expertName ?
          <Link style={{color:'inherit', textDecoration:'none'}} to={expertLink}>
            <AuthorImage background={authorImage}/>
          </Link>
          :
          <AuthorImage background={authorImage}/>
        }


        <Bio dangerouslySetInnerHTML={{ __html: authorBio }}/>
        
        <SubTitle style={{marginTop: 90}}>explore:</SubTitle>
        <Filing>
          {
            filedUnder.map( ({name, link}, key) => <FiledUnderLink key={key} to={link}>{name}</FiledUnderLink>)
          }
        </Filing>
        { renderTags() }
        <SubTitle style={{marginTop: 90}}>see also:</SubTitle>

        <CardsContainer>
          { relatedContent }
        </CardsContainer>

        <LocalBackTo />
      </SideBar>
    )

    ///

    const MobileSideBar = () => (
      <Column style={{color: darkWhite}}>

        <FirstMobileRow>
          <AuthorImage background={authorImage}/>
          <Bio dangerouslySetInnerHTML={{ __html: authorBio }}/>
        </FirstMobileRow>

        <MobileRow style={{alignItems: 'flex-start'}}>
          <MobileColumn>
            <SubTitle>filed under:</SubTitle>
            {
              filedUnder.map( ({name, link}, key) => <FiledUnderLink key={key} to={link}>{name}</FiledUnderLink>)
            }
          </MobileColumn>

          <MobileColumn>
            <SubTitle>explore:</SubTitle>
            { renderTags() }
          </MobileColumn>
        </MobileRow>

        <MobileRow>
          <SubTitle>see also:</SubTitle>
        </MobileRow>

        <CardsContainer>
          { relatedContent }
        </CardsContainer>
        
      </Column>
    )

    ///

    return (
      <Container>
        {
          this.renderOverlay(tagName, tagCards)
        }
        <TopContainer overlay={overlay}>
          <AllEntities />
          <TextContainer overlay={overlay}>
            <TextInnerContainer>
              <ContentBar>
                <MainImage background={background} overlay={overlay}/>
                <Title>{title}</Title>
                <Author>by {author}</Author>
                <IntroText dangerouslySetInnerHTML={{ __html: introText}}/>
                <Text dangerouslySetInnerHTML={{ __html: text}}/>
                <TextFooter>
                  <LocalBackTo />
                </TextFooter>
              </ContentBar>
              <DesktopSideBar />
            </TextInnerContainer>
          </TextContainer>
        </TopContainer>
        <BottomContaniner overlay={overlay}>
          <Footer>
            <MobileSideBar />
          </Footer>
        </BottomContaniner>
      </Container>
    )
  }
}

export default Article
