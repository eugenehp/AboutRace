import React from 'react'
import styled from 'styled-components'
import kebabCase from '../../utils/kebabCase'

import Card from '../Card'
import SVGArrow from '../SVGArrow'

import {
  qaColor,
  red,
  softblack,
  fogwhite,
  smokelime
} from '../../colors'

const Container = styled(Card)`
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: center;

  background-color: ${softblack};
  color: ${fogwhite};

  box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.17);

  padding-left: 15px;
  padding-right: 15px;

  &::before {
    content: '?';
    position: absolute;
    top: -115px;
    right: 100px;

    font-family: 'ff-tisa-web-pro';
    font-weight: 400;
    font-size: 400px;

    opacity: 0.16;
    display: none;
  }
`

const Title = styled.div`
  font-family: 'Quicksand';
  font-weight: 500;
  font-size: 12px;
  line-height: 30px;
  letter-spacing: 0.12em;
  text-align: center;
  color: ${smokelime};
`

const Question = styled.div`
  font-family: 'Quicksand';
  font-weight: 500;
  font-size: 24px;
  line-height: 27px;
  text-align: center;
  padding: 15px;
`

const ArrowContainer = styled.div`
  position: absolute;

  bottom: 15px;
  right: 17px;

  display: none;
  width: 25px;
  height: 20px;
`
const EpisodeTicker = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;

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

const Arrow = () => <ArrowContainer><SVGArrow color={red}/></ArrowContainer>

///

export class QACard extends React.Component {
  render() {
    const {  data = {}, onOpen } = this.props
    const qa = data
   //const link = `/qa/${kebabCase(qa.title)}`
    const link = qa.path.alias

    const fromEpisode = `episode ${qa.field_belong_to_episode}`
    
    return (
      <Container
        changed={qa.changed}
        onClick={ () => onOpen(link)}
      >
        <Title>Q&A</Title>
        <Question>{qa.title}</Question>
        <Arrow />
        { qa.field_belong_to_episode && <EpisodeTicker episodeNumber={qa.field_belong_to_episode}>{fromEpisode}</EpisodeTicker> }
      </Container>
    )
  }
}

export default QACard;
