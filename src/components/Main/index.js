import React, { Component } from 'react'
import styled from 'styled-components'
import get from 'lodash/get'
import { Link } from 'gatsby'

import {
  SVGLogoMain,
} from '../'

import LogoMain from './LogoMain.png'

import {
  gold,
  midnight,
  white
} from '../../colors'

import { graphql } from 'gatsby'

const Container = styled.div`
  background-color: ${midnight};
  position: relative;
  margin-top: -96px;
  @media (max-width: 812px) { /* mobile */

  }
`

const TopContainer = styled.div`
  position: relative;

  height: 100vh;
 

  &::before {
    position: absolute;
    content: '';

    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    background-size: cover !important;
    background-attachment: fixed;
    background: ${ props => props.background ? `url(${props.background}) center no-repeat` : null };
    opacity: .18;

  }
`
const MainLogo = styled.div`
  height: 100vh;
  width: calc(100vw - 120px);
  padding-left: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Slugline = styled.div`
  width: 100%;
  height: 60px;
  letter-spacing: 0.03em;
  font-family: 'Quicksand';
  font-weight: 500;
  font-size: 21px;
  line-height: 135%;
  color: ${white};
  text-align: center;
  display: block;
  flex-direction: column;
  justify-content: flex-end;
  padding-bottom: 15px;

  @media (max-width: 812px) { /* mobile */
    //padding-top: 2em;
    font-size: 18px;
    height:auto;
  } 

`

const TrailerLink = styled.div`
  max-width:1200px;
  width: 100%;
  height: 60px;
  letter-spacing: 0.03em;

  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding-bottom: 15px;
  position:absolute;
  margin-left:20px;
  bottom:20px;
  @media (max-width: 812px) { /* mobile */
    padding-top: 2em;
    font-size: 18px;
  } 
  a{
    font-family: 'Quicksand';
    font-weight: 100;
    font-size: 21px;
    line-height: 24px;
    color: ${white};
    text-decoration:none;
  }
`

const Image = styled.img`
  width: 100%;
  max-width: 1000px;

  height:auto;
  margin-bottom: 25px;
  @media (min-width: 1025px) { /* desktop */
    width: 90%;
    max-width:90%;
  }

  @media (max-width: 812px) { /* mobile */
    
  } 
`

//export default ({ data, location, bannerImages }) => {
class Main extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      background: this.props.bannerImages[0].localFile.childImageSharp.original.src,
      backgroundIndex: 0
    };
    // This binding is necessary to make `this` work in the callback
    this.scrollToCards = this.scrollToCards.bind(this);
  }
  componentDidMount() {
    this.intervalID = setInterval(
      () => this.tick(),
      5000
    );
  }
  componentWillUnmount() {
    clearInterval(this.intervalID);
  }
  tick() {
    let i = 0;
    if(this.state.backgroundIndex >= (this.props.bannerImages.length - 1)){
      i = 0;
    }else{
      i = this.state.backgroundIndex + 1
    }

    this.setState({
      background: this.props.bannerImages[i].localFile.childImageSharp.original.src,
      backgroundIndex: i
    });
  }
  
  scrollToCards() {
    var el = document.getElementById('CardsContainer');   
    window.scrollTo({ top: el.offsetTop - 100, behavior: 'smooth' })
  }

  render() {
    const { data, location, bannerImages, bannerTagline } = this.props
    const episodeOneSynopsis = get(data, `allNodeSynopsis.edges.node[1].field_episode_synopsis.processed`)
    const linkPath = '/videos/trailer-race-power-illusion'
    return (
      <Container>
        <TopContainer background={this.state.background} onClick={this.scrollToCards} >
          <MainLogo>
            <Image src={LogoMain} />
            <Slugline dangerouslySetInnerHTML={{__html: bannerTagline}} />

            {/* <TrailerLink><Link to={linkPath}>View the trailer</Link></TrailerLink> */}
          </MainLogo>
        </TopContainer>
      </Container>
    )
  }
}

export default Main