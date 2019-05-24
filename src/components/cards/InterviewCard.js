import React from 'react'
import styled from 'styled-components'
import kebabCase from '../../utils/kebabCase'

import Description from './Description'
import Card from '../Card'
import SVGArrow from '../SVGArrow'

import {
  red,
  interviewColors,
  interviews,
  softblack,
  fogwhite
} from '../../colors'

const Container = styled(Card)`
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: center;

  background-color: ${fogwhite};
  color: ${softblack};
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
  padding-left: 15px;
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

const IntervieweeName = styled.div`
  font-family: 'Quicksand';
  font-weight: 600;
  font-size: 20px;
  letter-spacing: 0.00em;
  line-height: 115%;
`

const Ticker = styled.div`
  position: absolute;

  left: 0;
  bottom: 0;

  font-family: 'Quicksand';
  font-weight: 500;
  font-size: 12px;
  line-height: 30px;
  letter-spacing: 0.12em;

  border-top-right-radius: 3px;
  background-color: ${interviews};

  padding: 3px 15px;
  text-transform: uppercase;
`

const BottomBlock = styled.div`
  flex: auto;
  display: flex;
  flex-direction: column;
  padding: 15px;
  align-self: flex-end;
  padding: 12px 30px 15px 30px;
`

const Bio = styled.div`
  font-family: 'Quicksand';
  display: none;
  font-weight: 500;
  font-size: 12px;
  line-height: 18px;
`

const Row = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;

  align-items: flex-end;
  justify-content: flex-end;
`

const ArrowContainer = styled.div`
  bottom: 15px;
  right: 17px;

  display: none;
  min-width: 25px;
  height: 20px;
`

const Arrow = () => <ArrowContainer><SVGArrow color={red}/></ArrowContainer>

///

export class InterviewCard extends React.Component {
  render() {
    const { data = {}, onOpen } = this.props
    const interview = data;
    
    //const link = `/interviews/${kebabCase(interview.title)}` 
    const link = interview.path.alias
    const background = interview.relationships.field_interviewee.localFile.publicURL;
    const description = interview.field_interview_summary.processed;

    const interviewee = interview.field_interviewee_name ? interview.field_interviewee_name.processed : null;
    const bio = interview.field_interviewee_bio ? interview.field_interviewee_bio.processed : null;

    return (
      <Container onClick={ () => onOpen(link)} >
        
        <InnerContainer>
          <TopBlock>
            <TopImage  background={background}/>
            <Ticker>interview</Ticker>
          </TopBlock>
          <BottomBlock>
            <IntervieweeName>{interviewee}</IntervieweeName>
            <Description>{description}</Description>
            <Row>
              <Bio dangerouslySetInnerHTML={{ __html: bio }}/>
              <Arrow />
            </Row>
          </BottomBlock>
        </InnerContainer>
      </Container>
    )
  }
}

export default InterviewCard;
