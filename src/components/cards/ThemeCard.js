import React from 'react'
import styled from 'styled-components'
import kebabCase from '../../utils/kebabCase'
import get from 'lodash/get'

import Description from './Description'
import Card from '../Card'

import {
  SVGArrow,
} from '../'

//TODO: refactor assets
import playButton from '../../assets/images/PlayButton.png';

import {
  red,
  fogwhite,
  softblack,
  smokegrey,
  clipTickerColor,
} from '../../colors'

const Container = styled(Card)`
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: center;

  background-color: ${fogwhite};
  color: ${smokegrey};
  box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.17);

  padding-left: 15px;
  padding-right: 15px;

  z-index: 1;

  & .hoverExpand{
    transition:all 1s; 
    max-height:0px;
    overflow:hidden;
  }
  &:hover .hoverExpand{
    max-height:300px;
  }
  
`
const ThemeTitle = styled.div`
  font-family: 'Quicksand';
  font-weight: 600;
  font-size: 20px;
  letter-spacing: 0.00em;
  line-height: 115%;
`

const TopImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  z-index: -1;

  width: 100%;
  height: 100%;
  
  background: ${ props => props.background ? `url(${props.background}) center no-repeat` : null };
  background-size: cover;
`

const TopBlock = styled.div`
  position: relative;

  width: auto;

  display: flex;
  flex-direction: row;
  flex: 100;
  align-self: stretch;
 
  padding-right: 15px;
`

const InnerContainer = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;

  display: flex;
  flex-direction: column;
`

const Ticker = styled.div`
  position: absolute;

  left: 0;
  bottom: 0;

  display: none;

  font-family: 'Quicksand';
  font-weight: 500;
  font-size: 12px;
  line-height: 30px;
  letter-spacing: 0.22em;

  border-top-right-radius: 3px;
  background-color: ${clipTickerColor};

  padding: 5px 15px;
  text-transform: uppercase;
`

const BottomBlock = styled.div`
  flex: auto;
  display: flex;
  flex-direction: column;
  align-self: flex-end;
  padding: 12px 30px 15px 30px;
`

const Row = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;

  align-items: flex-end;
  justify-content: flex-end;
`

const TopTicker = styled.div`
  position: absolute;
  bottom: 29px;
  right: 12px;

  height: 28px;
  padding-left: 12px;
  padding-right: 12px;

  border-radius: 3px;

  text-transform: uppercase;

  font-family: 'Quicksand';
  font-weight: 500;
  font-size: 12px;
  line-height: 28px;
  letter-spacing: 0.06em;
  color: ${softblack};
  
  
  background-color: rgba(90, 94, 97, .83);
  ${ props => props.episodeNumber && props.episodeNumber == "1" ? 'background-color: rgba(250, 205, 101, .83);' : null }
  ${ props => props.episodeNumber && props.episodeNumber == "2" ? 'background-color: rgba(255, 181, 88, .83);' : null }
  ${ props => props.episodeNumber && props.episodeNumber == "3" ? 'background-color: rgba(246, 149, 92, .83);' : null }
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
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

export class ThemeCard extends React.Component {
  render() {
    const data = get(this, 'props.data');
    const { onOpen } = this.props
    const title = get(this, 'props.data.name')
    const link = `/themes#${kebabCase(title)}`
    const description = get(this, 'props.data.description.processed')
    const background = get(this, 'props.data.relationships.field_theme_image.localFile.publicURL')
    const field_episode = get(this, 'props.data.field_episode')
    const fromEpisode = `episode ${field_episode}`

    // const {title, uri} = clip.field_external_video_url

    return (
      <Container onClick={ () => onOpen(link)} >
        <InnerContainer>
          <TopBlock>
          <TopImage background={background}/>
          </TopBlock>
          <BottomBlock>
            <ThemeTitle>{title}</ThemeTitle>
            <Description>{description}</Description>
          </BottomBlock>
        </InnerContainer>
      </Container>
    )
  }
}

export default ThemeCard;
