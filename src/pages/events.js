import React from 'react'
import styled from 'styled-components'
import get from 'lodash/get'
import kebabCase from 'lodash/kebabCase'

import Vimeo from 'react-vimeo'
import ReactPlayer from 'react-player'

import playButton from '../assets/images/PlayButton.png';

import {
  Layout,
  FiledUnderLink,
  Link
} from '../components'

import { graphql } from 'gatsby'

import {
  white,
  black,
  smokegrey,
  softblack,
  fogwhite,
  episodeColors
} from '../colors'

const IMAGE_WIDTH = 950
const IMAGE_HEIGHT = 600

const Row = styled.div`
  display: flex;
  flex-direction: row;
`

const Column = styled.div`
  display: flex;
  flex-direction: column;
`

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

const Content = styled(Row)`
  width: 100%;
  max-width: 1360px;
  margin: 0 auto;
  padding: 18px 0 72px 0;
  align-items: flex-start;

  @media (max-width: 812px) { /* mobile */
    flex-direction:column;
  }

`

const SideBar = styled(Column)`

  display: flex;
  flex-direction: column;
  justify-content: top;


  flex: 1;

  padding-left: 60px;
  padding-right: 30px;

  @media (min-width: 1025px) { /* desktop */

  }

  // @media (max-width: 812px) { /* mobile */
  //   display: none;
  // }


  padding: 35px;
  margin-top: 55px;
 
  height: auto;

  // border-radius: 15px;
  // background: white;
  // border:1px solid ${softblack};
`

const Chat = styled(Column)`
  display: block;
`

const ContentBar = styled(Column)`
  align-items: center;
  //padding-right: 60px;
  flex:3;
  max-width:100%;
`

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
  img{
    max-width:100%;
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

///

class EventsPage extends React.Component {
  
  constructor(props) {
    super(props);



    const self = this

  }

  componentDidMount() {
    setTimeout(()=>window.scrollTo(0,0),1)
  }

  render() {
    
    const events = get(this, `props.data.events.edges`).map(edge => edge.node)

    let event = null;
 
    events.forEach(function(item) {
      if(item.id == '1f620dc8-dc7e-4dba-83a3-95f8a7e0bbcb'){
        event = item;
      }
    })

    let title = event.title;
    let body = (event.body != null) ? event.body.processed : '';


    let sidebar = (event.field_sidebar != null) ? event.field_sidebar.processed : '';


    let videoURL = event.field_external_video_url.uri;

    let videoId = videoURL ? videoURL.split('/').pop() : ''

    let videoPlayer;
    
    if(videoURL.includes('youtube.com')){
      videoPlayer = <ReactPlayer 
                      style={{width: IMAGE_WIDTH, height: IMAGE_HEIGHT}}
                       url={videoURL} 
                       controls={true}                    
                       />
    }

    return (
      <Layout location={this.props.location}>
        <Container>

          <TopContainer>

            <Content>
              
              <ContentBar>
                <ContentTitle>
                  <h1>{title}</h1>
             
                </ContentTitle>
                <MainImage >
                  {videoPlayer}

                </MainImage>
          

                <ClipDescription dangerouslySetInnerHTML={{ __html: body }} />
              </ContentBar>
            
              {/* <SideBar>
              <SubTitle>explore:</SubTitle>
                {
                  filedUnder.map( ({name, link}, key) => <FiledUnderLink key={key} to={link} color={softblack}>{name}</FiledUnderLink>)
                }
                { renderTags() }
              </SideBar> */}
              <SideBar>
                <Chat dangerouslySetInnerHTML={{ __html: sidebar }} />
              </SideBar>
            </Content>
          </TopContainer>



          <Footer>

          </Footer>

        </Container>
      </Layout>
    )
  }
}

export default EventsPage

export const query = graphql`
  query EventsPageQuery {


    events: allNodeEvent {
      edges {
        node {
          id
          title
          body {
            processed
          }
          field_sidebar {
            processed
          }
          field_external_video_url {
            uri
            title
          }
        }
      }
    }

}
`

