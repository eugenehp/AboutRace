import React, { Component } from 'react'
import styled from 'styled-components'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import FlipMove from 'react-flip-move'

import gradientColors from '../gradients'

import Vimeo from 'react-vimeo'
//TODO: refactor assets
import playButton from '../assets/images/PlayButton.png';

import {
  FiledUnderLink,
  Link,
  Layout,
  Main,
  ThemeCard,
  PlayButton,
  CollectionPage
} from '../components'

import {
  black,
  softblack,
  white,
  episodeColors,
  fogwhite,
  smokeblue
} from '../colors'

import getCards from '../utils/getCards'

const Container = styled.div`

`

const CardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #202A37;

  @media (min-width: 1025px) { /* desktop */
    flex-direction: row;
    align-items: stretch;
    justify-content: center;
  }

  @media (max-width: 812px) { /* mobile */
    flex-direction: column;
    justify-content: center;
  }
`

const CardContainer = styled(Link)`
  display: flex;
  flex-direction: column;

  width: 80vh;
  padding: 30px;

  flex: 1 1 auto;

  background-color: ${props => props.color ? props.color : white };

  transition: all 0.5s;

  @media (min-width: 1025px) { /* desktop */
    
    width: 400px;
  }

  @media (max-width: 812px) { /* mobile */
    width: 100%;
    margin: 0;
    padding: 20px;
  }

  &:hover {
    transform: translatey(-21px);
    transition: all 0.5s;
  }

`

const EpisodeNumber = styled.div`
  font-family: Quicksand;
  font-style: normal;
  font-weight: 500;
  line-height: 42px;
  font-size: 14px;
  letter-spacing: 0.12em;

  color: ${softblack};

  text-transform: capitalize;
`

const EpisodeTitle = styled.div`
  font-family: Quicksand;
  font-style: normal;
  font-weight: 500;
  line-height: 42px;
  font-size: 36px;
  padding-bottom: 15px;

  color: ${softblack};
`

const EpisodeDescription = styled.div`
  font-family: 'ff-tisa-web-pro';
  font-style: normal;
  font-weight: normal;
  line-height: 24px;
  font-size: 17px;

  color: ${softblack};
`

const InnerContainer = styled.div`
  @media (max-width: 812px) { /* mobile */
    margin: 20px;
  }
`

const Card = props => {
  const title = get(props, 'card.title.processed')
  const number = get(props, 'number')
  const description = get(props, 'card.synopsis.processed').split('</p>')[0].replace('<p>','')

  const link = `/episodes/${number}`

  return (
    <CardContainer {...props}>
      <InnerContainer>
        <EpisodeNumber>episode {number}</EpisodeNumber>
        <EpisodeTitle>{title}</EpisodeTitle>
        <EpisodeDescription dangerouslySetInnerHTML={{ __html: description }} />
        <FiledUnderLink
          style={{paddingLeft: 0, marginTop: 50}}
          color={black}
          to={link}
          noLink
        >
          Explore
        </FiledUnderLink>
      </InnerContainer>
    </CardContainer>
  )
}

///

const VideoContainer = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;
`

const ThemesContainer = styled.div`
  background-color: #74a3bd;
`


const IMAGE_WIDTH = 500
const IMAGE_HEIGHT = 300

const VideoHolder = styled.div`
  display:flex;
  margin:20px 0px 75px;
  
  @media (max-width: 1180px) { /* mobile */
    display:block;
  }
`

const VimeoContainer = styled.div`
  position: relative;

  margin: 0px 10px 100px;

  width: ${IMAGE_WIDTH}px;
  height: ${IMAGE_HEIGHT}px;

  @media (max-width: 1500px) { /* mobile */
    width: 356px;
    height: 200px;
    margin: 0px auto 100px;
  }

  background-size:cover;
  background-position: center;
  background-image: ${props => props.background ?  `url(${props.background})` : `none`};

  .vimeo-embed{
    background:#000;
  }

`
const VideoText = styled.div`
  color:#fff;
  margin-bottom:10px;
  font-size:18px;
`

const Under = styled.div`
  font-family: 'Quicksand';
  font-style: normal;
  line-height: 24px;
  padding-top: 12px;
  font-size: 24px;
  text-align: center;
  letter-spacing: 0.03em;

  color: ${fogwhite};

  & p {
    margin: 15px;
  }
`
const SummaryContainer = styled.div`
  max-width: 510px;
  margin: 0px 10px;
  padding-bottom: 45px;
  a{
    color: #fff!important;
    font-size: 28px;
    text-align: center;
    width: 100%;
    display: inline-block;
    img{
      max-width: 75px;
      display: inline-block;
      margin: 0px 0px -22px -40px;
    }
  }
`

const Summary = styled.div`
  font-family: 'ff-tisa-web-pro';
  font-weight: 400;
  line-height: 24px;
  font-size: 17px;
  text-align: center;

  max-width: 510px;
  padding-bottom: 45px;



  color: ${fogwhite};

  & p {
    padding: 10px;
    margin: 0px;
  }

  @media (max-width: 812px) { /* mobile */
   // display: none;
  }

  &:before{
    content: '';
    width: 25px;
    height: 25px;
    border-left: 2px solid white;
    border-top: 2px solid white;
    display: block;
    float:left;
    
  }
  &:after{
    content: '';
    width: 25px;
    height: 25px;
    border-right: 2px solid white;
    border-bottom: 2px solid white;
    display: block;
    float:right;
  }
`
const Explore = styled.div`
  font-family: 'Quicksand';
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-size: 18px;
  padding-top: 45px;
  padding-bottom: 30px;
  width:100%;
  text-align:center;

`
const ExploreInside  = styled.div`
  width: auto;
  display: inline-block;
  &:before{
    content:'';
    width:50%;
    height:2px;
    display:block;
    background:black;
    float: left;
    margin: 10px 12px;
    margin-left:-50%;
  }
  &:after{
    content:'';
    width:50%;
    height:2px;
    display:block;
    background:black;
    float: right;
    margin: 10px 12px;
    margin-right: -50%;
  }

  &.light{
    color:#fff;
    &:before, &:after{
      background:#fff;
    }
  }
`

const Image = styled.img`
  cursor: pointer;

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

const HomeCardsContainer = styled(FlipMove)`
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

class Video extends React.Component {
  constructor(props) {
    super(props);
    
    const image1 = get(props, `image1`)
    const image2 = get(props, `image2`)
  
    this.state = {
      playing: false,
      tagName: null,
      tagCards: [],
      image1,
      image2
    };
  }

  render() {
    const summary = get(this, `props.summary`)
    const under = get(this, `props.under`)
    const videoId1 = get(this, `props.videoId1`)
    const videoId2 = get(this, `props.videoId2`)
    const videoText1 = get(this, `props.videoText1`)
    const videoText2 = get(this, `props.videoText2`)
    console.log('video 2');
    
    return (
       <VideoContainer>
         <Explore><ExploreInside className="light" >Why relaunch this series?</ExploreInside></Explore>
         {/* <Under dangerouslySetInnerHTML={{ __html: under }} /> */}
         <VideoHolder>

           {videoId1 &&
             <VimeoContainer background={this.state.image1}>
               <Vimeo
                 style={{width: IMAGE_WIDTH, height: IMAGE_HEIGHT}}
                 videoId={videoId1}
                 playButton={
                   <div style={{position: 'relative', width: IMAGE_WIDTH, height: '100%'}}>
                     <Image src={playButton} onClick={() => this.setState({image1:null})}/>
                   </div>
                 }
               />
               <VideoText dangerouslySetInnerHTML={{ __html: videoText1 }} />
             </VimeoContainer>
           }
           <SummaryContainer>
             <Summary dangerouslySetInnerHTML={{ __html: summary }} />
             <Link to={'/videos/trailer-race-power-illusion'}>
               <img src={require('../assets/images/white-play-button.png')} /> View the trailer
             </Link>
           </SummaryContainer>
           {videoId2 &&
             <VimeoContainer background={this.state.image2}>
               <Vimeo
                 style={{width: IMAGE_WIDTH, height: IMAGE_HEIGHT}}
                 videoId={videoId2}
                 playButton={
                   <div style={{position: 'relative', width: IMAGE_WIDTH, height: '100%'}}>
                     <Image src={playButton} onClick={() => this.setState({image2:null})}/>
                   </div>
                 }
               />
               <VideoText dangerouslySetInnerHTML={{ __html: videoText2 }} />
             </VimeoContainer>
           }
         </VideoHolder>

       </VideoContainer>
    )
  }
}

///

class Index extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    setTimeout(()=>window.scrollTo(0,0),1)
  }
  
  render() {
    let themes = get(this, 'props.data.allTaxonomyTermThemes.edges').map( ({node}) => node )
    themes.sort(function(a, b){
      return a.weight-b.weight
    })

    const episodeOne = get(this, 'props.data.episodeOne')
    const episodeTwo = get(this, 'props.data.episodeTwo')
    const episodeThree = get(this, 'props.data.episodeThree')

    const cardsEpisodes = [episodeOne, episodeTwo, episodeThree]
    const numbers = ['one', 'two', 'three']

    const trailerClip = get(this, 'props.data.trailerClip')
    const url = get(trailerClip, 'field_external_video_url.uri')
    const videoId = url ? url.split('/').pop() : ''
    const image = get(trailerClip, 'relationships.field_poster_image.localFile.publicURL')

    const trailerData = get(this, 'props.data.allTaxonomyTermHomePage.edges').map( ({node}) => node )[0]

    const bannerImages = get(trailerData, 'relationships.field_home_page_top_image')

    const bannerTagline = get(trailerData, 'field_site_summary_tagline.processed')
    const summary = get(trailerData, 'field_small_text_under_john_powe.processed')
    const under = get(trailerData, 'field_text_under_john_a_powell_v.processed')


    const field_external_video_url_1 = get(trailerData, 'field_external_video_url_1.uri')
    let videoId1 = field_external_video_url_1 ? field_external_video_url_1.split('/').pop() : ''
    const field_external_video_url_2 = get(trailerData, 'field_external_video_url_2.uri')
    let videoId2 = field_external_video_url_2 ? field_external_video_url_2.split('/').pop() : ''

    if(videoId1 == videoId2){
      videoId2 = null
    }

    const videoText1 = get(trailerData, 'field_textarea_1.processed')
    const videoText2 = get(trailerData, 'field_textarea_2.processed')
    
    const image1 = get(trailerData, 'relationships.field_image_1.localFile.publicURL')
    const image2 = get(trailerData, 'relationships.field_image_2.localFile.publicURL')

    const cards = { themes }

    const title = ''
    const description = ''
    const props = {
      title,
      description,
      cards
    }

    const relatedContent = getCards(cards)

    return (
      <Layout location={this.props.location}>
        <Main 
          data={this.props.data} 
          bannerImages={bannerImages}
          bannerTagline={bannerTagline}
        />

        <CardsContainer id="CardsContainer">
          {
            cardsEpisodes.map( (card, key) => <Card
              to={'/episodes/'+numbers[key]}
              key={key}
              card={card}
              number={numbers[key]}
              color={episodeColors[key]}
            />)
          }
        </CardsContainer>


        <Video
          videoId1={videoId1}
          videoId2={videoId2}
          videoText1={videoText1}
          videoText2={videoText2}
          image1={image1}
          image2={image2}
          summary={summary}
          under={under}
        />

        <ThemesContainer>
          <Explore><ExploreInside className="dark">Themes from the films:</ExploreInside></Explore>

          {/* {
            edges.map( (edge, key) =>
              <ThemeCard key={key} data={edge} color={gradientColors[key]}/>
            )
          } */}

          {/* <Container>
            <CollectionPage {...props}/>
          </Container> */}

          <HomeCardsContainer>
            { relatedContent }
          </HomeCardsContainer>


        </ThemesContainer>
      </Layout>
    )
  }
}

export default Index

export const query = graphql`
  query HomeQuery {

    episodeOne: taxonomyTermEpisodeOnePage {
      ...EpisodeOneFragment
    }
    episodeTwo: taxonomyTermEpisodeTwoPage {
      ...EpisodeTwoFragment
    }
    episodeThree: taxonomyTermEpisodeThreePage {
      ...EpisodeThreeFragment
    }

    allNodeSynopsis {
      edges {
        node {
          title
          field_episode_synopsis {
            processed
          }
          field_synopsis_copyright {
            processed
          }
        }
      }
    }
    allTaxonomyTermThemes {
      edges {
        node {
          id
          name
          weight
          description {
            processed
          }
          relationships {
            field_theme_image {
              localFile {
                publicURL
                childImageSharp {
                  id
                  original {
                    width
                    height
                    src
                  }
                  sizes {
                    src
                  }
                  resolutions {
                    height
                    width
                    src
                  }
                }
              }
            }
            subthemes: backref_field_belongs_to_theme {
              name
              id
              description {
                value
              }
              relationships {
                contentNodes: backref_field_belongs_to_subtheme {
                  __typename
                  ... on node__article {
                    title
                  }
                  ... on node__faq {
                    title
                  }
                  ... on node__clip {
                    title
                  }
                  ... on node__quickfact {
                    title
                  }
                }
              }
            }
          }
        }
      }
    }

    trailerClip: nodeClip(id: { eq:"72e4ec93-6d32-460e-a7e3-1b958360d330" } ) {
      ...ClipFragment
    }
  
    taxonomyTermThemes(id: { eq: "8661596c-176b-4527-97c4-af0e614da9d8" }) {
      relationships {
        field_theme_image {
          localFile {
            publicURL
            childImageSharp {
              original {
                width
                height
                src
              }
            }
          }
        }
      }
    }

    allTaxonomyTermHomePage {
      edges {
        node {
          field_site_summary_tagline {
            processed
          }
          field_text_under_john_a_powell_v {
            processed
          }
          field_small_text_under_john_powe {
            processed
          }
          field_external_video_url_1 {
            uri
          }
          field_external_video_url_2 {
            uri
          }
          field_textarea_1 {
            processed
          }
          field_textarea_2 {
            processed
          }
          relationships {
            field_home_page_top_image {
              localFile {
                publicURL
                childImageSharp {
                  original {
                    width
                    height
                    src
                  }
                }
              }
            }
            field_image_1 {
              localFile {
                publicURL
                childImageSharp {
                  original {
                    width
                    height
                    src
                  }
                }
              }
            }
            field_image_2 {
              localFile {
                publicURL
                childImageSharp {
                  original {
                    width
                    height
                    src
                  }
                }
              }
            }
          }
        }
      }
    }

  }
  
`

