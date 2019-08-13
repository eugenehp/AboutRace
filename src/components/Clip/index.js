import React from 'react'
import styled from 'styled-components'
import kebabCase from 'lodash/kebabCase'
import get from 'lodash/get'

import Vimeo from 'react-vimeo'
import ReactPlayer from 'react-player'

import playButton from '../../assets/images/PlayButton.png';

import {
  FiledUnderLink,
  Overlay,
  OverlayBody,
  CloseButton,
  TagTitle,
  PlayButton
} from '../'

import getCards from '../../utils/getCards'

import {
  black,
  softblack,
  white,
  red,
  smokegrey,
  episodeColors,
  fogwhite,
} from '../../colors'

import reorder from '../../utils/reorder'
import shuffle from '../../utils/shuffle'

const range = require('range')

const TICKER = 'CLIP'
const gradient = `linear-gradient(to bottom, #f9de7b 0%, #ffe7e7 100%)`
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

  width: 100%;
  height: auto;

 // background-color: ${ props => props.fieldEpisode ? episodeColors[props.fieldEpisode - 1] : null};
  background-color: #DBDBDB;
  @media (min-width: 1025px) { /* desktop */

  }

  @media (max-width: 812px) { /* mobile */


  }
`

const BottomContaniner = styled.div`
  position: relative;

  width: 100%;
  padding-top: 20px;

  background-color: ${smokegrey};

  @media (min-width: 1025px) { /* desktop */

  }

  @media (max-width: 812px) { /* mobile */
     
  }
`

const getFiledUnder = array => {
  let results = []

  if(array)
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
  justify-content: flex-start;

  padding-top: 18px;
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
  <FiledUnderLink color={softblack} to='/clips' direction={'left'}>{AllEntitiesText}</FiledUnderLink>
</AllEntitiesContainer>



const Content = styled(Row)`
  width: 100%;
  max-width: 1360px;
  margin: 0 auto;
  padding: 18px 0 72px 0;
  align-items: flex-start;
`

const SideBar = styled(Column)`
  display: none;

  flex: 1;

  padding-left: 60px;
  padding-right: 30px;

  @media (min-width: 1025px) { /* desktop */
    display: flex;
    flex-direction: column;
    justify-content: top;
  }

  @media (max-width: 812px) { /* mobile */
    display: none;
  }


  padding: 35px;
  background: white;
  border-radius: 15px;
  height: auto;
  border:1px solid ${softblack};
`

const ContentBar = styled(Column)`
  align-items: center;
  //padding-right: 60px;
  flex:3;
  max-width:100%;
`

const SubTitle = styled.div`
  font-family: 'Quicksand';
  font-weight: 500;
  font-size: 25px;
  line-height: 100%;
  margin-bottom:20px;
  letter-spacing: 0.12em;

  text-transform: uppercase;

  color: ${black};

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
  font-weight: 500;
  font-size: 14px;
  line-height: 36px;
  letter-spacing: 0.12em;

  text-transform: uppercase;

  margin-right: 15px;
  margin-top: 15px;

  border-radius: 3px;

  background-color: #ffb558;
  border: 1px solid ${softblack};
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

const IMAGE_WIDTH = 950
const IMAGE_HEIGHT = 600

const ContentTitle = styled.div`
  display: block;
  flex-direction: row;

  width: ${IMAGE_WIDTH}px;

  text-align:left;
  h1{
    margin:0px 0px 10px;
  }
  h3{
    margin:0px 0px 20px;
  }
  @media (max-width: 812px) { /* mobile */
    max-width: 100%;
  }
`

const MainImage = styled.div`
  position:relative;
  cursor: pointer;

  display: flex;
  flex-direction: row;

  width: ${IMAGE_WIDTH}px;
  height: ${IMAGE_HEIGHT}px;

  border-radius: 0px;

  background-size: cover !important;
  background-attachment: fixed;
  background: ${ props => props.background ? `url(${props.background}) center no-repeat` : null };
  background-color: ${softblack};

  @media (min-width: 1025px) { /* desktop */
    
  }

  @media (max-width: 812px) { /* mobile */
    max-width: 100%;
    width: 100%;
    display: block;
    height: auto;
    min-height:300px;
    .vimeo-embed{
      height: 300px!important;
      width: 100%!important;
      max-height: 100%!important;
    }
  }

  .vimeo-embed{
    background:#000;
  }

`

const Title = styled.div`
  width: calc(${IMAGE_WIDTH}px - 60px);

  font-family: 'Quicksand';

  font-size: 14px;
  line-height: 18px;

  background-color: ${fogwhite};
  padding: 15px 30px 24px 30px;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;

  color: ${softblack};
`
const ClipDescription = styled.div`
  width: calc(${IMAGE_WIDTH}px - 60px);

  font-family: 'Quicksand';

  font-size: 24px;
  line-height: 145%;

  background-color: ${fogwhite};
  padding: 15px 30px 24px 30px;
  border-radius: 0px;

  margin-top:20px;

  color: ${softblack};
  //border:1px solid ${softblack};
  p{
    margin-top:0px;
  }
  p:first-child, p:last-child{
    margin:0px
  }

  @media (max-width: 812px) { /* mobile */
    max-width: 100%;
  }
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
  padding-left: 60px;
  padding-bottom: 30px;
  color: ${fogwhite};

  @media (max-width: 812px) { /* mobile */
    padding-left: 20px;
  }
`

const CenteredContainer = styled.div`
  position: absolute;

  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`

const Image = styled.img`
  width: 53px;
  height: 53px;
  position: absolute;
  bottom: 15px;
  left: 12px;

  @media (min-width: 1025px) { /* desktop */

  }

  @media (max-width: 812px) { /* mobile */
    
  } 
`

const nodeName = 'nodeClip'

class Clip extends React.Component {
  constructor(props) {
    super(props);
    
    const background = get(props, `data.${nodeName}.relationships.field_poster_image.localFile.childImageSharp.original.src`)
  
    this.state = {
      playing: false,
      tagName: null,
      tagCards: [],
      background
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
    const fieldEpisode = get(this,`props.data.${nodeName}.field_episode`);


    // const background = get(this, `props.data.${nodeName}.relationships.field_poster_image.localFile.childImageSharp.original.src`)
    let videoURL = get(this, `props.data.${nodeName}.field_external_video_url.uri`)
    let videoId = videoURL ? videoURL.split('/').pop() : ''

    let videoPlayer;

    // console.log(videoURL)
    
    if(videoURL.includes('youtube.com')){
      videoPlayer = <ReactPlayer 
                      style={{width: IMAGE_WIDTH, height: IMAGE_HEIGHT}}
                       url={videoURL} />
    }else{
      videoPlayer = <Vimeo
                      style={{width: IMAGE_WIDTH, height: IMAGE_HEIGHT}}
                      videoId={videoId}
                      playButton={
                        <CenteredContainer>
                          <Image src={playButton} onClick={() => this.setState({background:null})}/>
                        </CenteredContainer>
                      }
                    />
    }

    const title = get(this, `props.data.${nodeName}.title`)
    const description = get(this, `props.data.${nodeName}.field_overview.processed`)

    const introText = get(this, `props.data.${nodeName}.description.processed`)

    const filedUnder = getFiledUnder(get(this, `props.data.${nodeName}.relationships.field_belongs_to_subtheme`))
    const tags = getTags(get(this, `props.data.${nodeName}.relationships.field_tags`))

    const relatedContent = getRelatedContent(get(this, `props.data.${nodeName}.relationships.field_article_related_content`))

    let subtitle = null

    const path = get(this, `props.data.${nodeName}.path`)
    console.log(this);
    if(fieldEpisode){
      subtitle = "Episode "+fieldEpisode;
    }

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

    return (
      <Container>
        {
          this.renderOverlay(tagName, tagCards)
        }
        <TopContainer overlay={overlay} fieldEpisode={fieldEpisode}>
          { !overlay && <AllEntities /> }
          <Content>
            
            <ContentBar>
              <ContentTitle>
                <h1>{title}</h1>
                <h3>{subtitle}</h3>
              </ContentTitle>
              <MainImage background={this.state.background}>
                {videoPlayer}

              </MainImage>
              <ClipDescription dangerouslySetInnerHTML={{ __html: description }} />
            </ContentBar>
            {/* <SideBar>
            <SubTitle>explore:</SubTitle>
              {
                filedUnder.map( ({name, link}, key) => <FiledUnderLink key={key} to={link} color={softblack}>{name}</FiledUnderLink>)
              }
              { renderTags() }
            </SideBar> */}

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
                { renderTags() }
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
