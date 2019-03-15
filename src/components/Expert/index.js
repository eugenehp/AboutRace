import React from 'react'
import styled, { css } from 'styled-components'
import kebabCase from 'lodash/kebabCase'
import get from 'lodash/get'

import FlipMove from 'react-flip-move'

import getCards from '../../utils/getCards'

export const white = '#FFFFFF';
export const experts = 'grey';
const Container = styled.div`
  width: 100%;

  background-color: ${experts};
  
  display: flex;
  flex-direction: column;

  @media (min-width: 1025px) { /* desktop */

  }

  @media (max-width: 812px) { /* mobile */
     
  }
`

const InnerContainer = styled.div`
  position: relative;

  display: flex;
  flex-direction: row;

  width: auto;
  height: auto !important;

  border-top-right-radius: 3px;
  border-bottom-left-radius: 3px;


margin:50px auto;
  max-width: 1200px;

`

const CardsContainer = styled(FlipMove)`
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

const Row = styled.div`
  display: flex;
  flex-direction: row;
`
const Column = styled.div`
  display: flex;
  flex-direction: column;
`
const SideBar = styled(Column)`
  position: relative;

  display: none !important;

  padding-left:30px;

  display: flex;
  flex-direction: column;

  width: 336px;
  margin-right: 30px;

  @media (min-width: 1025px) { /* desktop */
    display: flex !important;
  }

  @media (max-width: 812px) { /* mobile */
    display: none;
  }
`
const ExpertImage = styled.div`
  height: 348px;
  min-width: 100%;

  border-radius:15px;
  background-size: cover !important;
  background-attachment: fixed;
  background: ${ props => props.background ? `url(${props.background}) center no-repeat` : null };

  @media (max-width: 812px) { /* mobile */
    width: 100vw;
    max-width: 100vw;
    margin-left: 0px;
  }
`

const ContentBar = styled(Column)`
  flex: 1;


  @media (min-width: 1025px) { /* desktop */
    
  }

  @media (max-width: 812px) { /* mobile */
    padding: 10px;
  }
`

const ContentBox = styled(Column)`
  position: relative;
  border-radius: 15px;
  background-color: ${white};
  padding:30px;
`

const Title = styled.div`
  font-family: 'ff-tisa-web-pro';
  font-size: 42px;
  line-height: 48px;
  margin-bottom:15px;
`
const SubTitle = styled.div`
  font-family: 'ff-tisa-web-pro';
  font-size: 22px;
  line-height: 100%;
  margin-bottom:10px;
  p{
    margin:0px;
  }
`
const Text = styled.div`
  font-family: 'ff-tisa-web-pro';
  font-size: 17px;
  line-height: 24px;
`

class Expert extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
      tagName: null,
      tagCards: []
    };
  }

  render() {
    const nodeName = 'nodeExpert'

    const name = get(this, `props.data.${nodeName}.title`)
    const jobTitle = get(this, `props.data.${nodeName}.field_title.processed`)
    const overview = get(this, `props.data.${nodeName}.field_overview.processed`)
    const image = get(this, `props.data.${nodeName}.relationships.field_main_image.localFile.publicURL`)


    const allInterviews = get(this, `props.data.allNodeInterview.edges`)
    const allNodeFaq = get(this, `props.data.allNodeFaq.edges`)

    let interviews = [];
    let faqs = [];

    allInterviews.forEach(function(element) {
      let ref = get(element, `node.relationships.field_expert_reference`)
      if(ref != null && ref.title == name){   
        interviews.push(element.node);
      }
    });


    allNodeFaq.forEach(function(element) {
      let ref1 = get(element, `node.relationships.field_expert_1_reference`)
      let ref2 = get(element, `node.relationships.field_expert_2_reference`)
      let ref3 = get(element, `node.relationships.field_expert_3_reference`)
      let ref4 = get(element, `node.relationships.field_expert_4_reference`)

      if((ref1 != null && ref1.title == name) ||
         (ref2 != null && ref2.title == name) ||
         (ref3 != null && ref3.title == name) ||
         (ref4 != null && ref4.title == name)
      ){

        faqs.push(element.node);
      }
    });

    const cards = { interviews, faqs }

    const relatedContent = getCards(cards)
// // console.log(expertInterviews)
    return (
      <Container>
        <InnerContainer>
          <SideBar>
            <ExpertImage background={image}/>
          </SideBar>
          <ContentBar>
            <ContentBox>
              <Title>{name}</Title>
              <SubTitle dangerouslySetInnerHTML={{ __html: jobTitle }}/>
              <Text dangerouslySetInnerHTML={{ __html: overview }}/>
            </ContentBox>
          </ContentBar>
        </InnerContainer>
            <CardsContainer>
              { relatedContent }
            </CardsContainer>
      </Container>
    )
  }
}

export default Expert