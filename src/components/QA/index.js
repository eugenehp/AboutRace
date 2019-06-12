import React from 'react'
import styled from 'styled-components'
import kebabCase from '../../utils/kebabCase'
import get from 'lodash/get'

import Answer from './Answer'

import {
  FiledUnderLink,
  Overlay,
  OverlayBody,
  CloseButton,
  TagTitle,
  Link,
  SVGChevron,
} from '../'

import getCards from '../../utils/getCards'

import {
  white,
  black,
  darkWhite,
  backgroundColor,
  red,
  softblack,
  smokelime,
  smokegrey,
} from '../../colors'

import reorder from '../../utils/reorder'
import shuffle from '../../utils/shuffle'

const range = require('range')

const TICKER = 'Q&A'
export const gradient = `linear-gradient(to bottom, #EEFFE8 0%, rgba(255,255,255,0.92) 100%)`

const Container = styled.div`
  width: 100%;
  
  background-color: ${smokelime};

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

  width: 100%;
  height: auto;


  @media (min-width: 1025px) { /* desktop */

  }

  @media (max-width: 812px) { /* mobile */
    z-index: 1;
  }
`
const CenterContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width:100%;
`

const BottomContaniner = styled.div`
  position: relative;

  width: 100%;

  z-index: 2;


  @media (min-width: 1025px) { /* desktop */

  }

  @media (max-width: 812px) { /* mobile */
     
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

const CardsContainer = styled.div`
  display: flex;  
  flex-direction: row; 
  flex-wrap: wrap;

  justify-content: flex-start;
  padding-left: 50px;
  padding-right: 50px;
  padding-bottom: 70px;

  @media (min-width: 1025px) { /* desktop */
    justify-content: flex-start;
    padding-left: 60px;
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

const Footer = styled(Row)`
  display: flex;

  width: auto;
  min-height: 20vh;

  background-color:${smokegrey};

  @media (min-width: 1025px) { /* desktop */
    display: flex;
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

const MobileColumn = styled(Column)`
  padding: 0;

  @media (min-width: 1025px) { /* desktop */
    
  }

  @media (max-width: 812px) { /* mobile */
    padding-top: 60px;
    padding-left: 10px;
  }
`

const FiledUnderContainer = styled(MobileColumn)`
  padding: 0;

  @media (min-width: 1025px) { /* desktop */
    padding-right: 20px;
    min-width: 371px;
  }

  @media (max-width: 812px) { /* mobile */
    padding-top: 30px;
    padding-left: 10px;
  }
`

const SubTitle = styled.div`
  font-family: Lato;
  font-size: 12px;
  line-height: 28px;
  letter-spacing: 0.22em;

  color: ${softblack};

  text-transform: uppercase;

  padding-left: 0;

  @media (min-width: 1025px) { /* desktop */
    padding-left: 15px;
  }

  @media (max-width: 812px) { /* mobile */
    padding-left: 0;
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

const AllEntitiesText = `All ${TICKER}s`
const AllEntities = () => <AllEntitiesContainer>
  <FiledUnderLink color={smokegrey} to='/qa' direction={'left'}>{AllEntitiesText}</FiledUnderLink>
</AllEntitiesContainer>

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
  cursor: pointer;
  padding-left: 10px;
  padding-right: 10px;

  font-family: 'Quicksand';
  font-weight: 500;
  font-size: 14px;
  line-height: 36px;
  letter-spacing: 0.12em;

  text-transform: uppercase;

  color: ${softblack};

  margin-right: 15px;
  margin-bottom: 15px;

  border-radius: 3px;
  background-color: ${white};
`

const TopCard = styled(Column)`
  position: relative;

  width: 490px;

  margin-top: 18px;
  margin-bottom: 30px;

  margin-left: 30px;
  margin-right: 30px;

  padding: 15px 30px 54px 30px;

  border-radius: 15px;

  background-color: ${smokegrey};
  color: ${smokelime};

  @media (min-width: 1025px) { /* desktop */
  }

  @media (max-width: 812px) { /* mobile */
    margin-top: 0;
    margin-bottom: 0;

    padding: 0;
    padding-top: 18px;
    padding-left: 15px;

    width: 100vw;
    max-width: 100vw;
  }
`
const Question = styled.div`
  font-family: 'Quicksand';
  font-weight: 500;
  font-size: 14px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  text-align: center;
  padding-bottom: 24px;
`
const Title = styled.div`
  font-family: 'Quicksand';
  font-weight: 500;
  font-size: 24px;
  line-height: 27px;
  padding-bottom: 12px;
`

const Description = styled.div`
  font-family: 'Quicksand';
  font-weight: 400;
  font-size: 17px;
  line-height: 21px;
  & p {
    margin: 0;
  }
`
const Answers = styled.div`
  font-family: 'Quicksand';
  font-weight: 500;
  font-size: 14px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  text-align: center;
  padding-bottom: 24px;
`

const MAX_WIDTH = 527

const Experts = styled(Column)`
  max-width: ${MAX_WIDTH}px;
  margin: auto;
  margin-bottom: 90px;
  align-items: center;

  color: ${softblack};

  // background: ${white};
  // border-radius:15px;
  // border:1px solid;
  // padding:20px;


  @media (min-width: 1025px) { /* desktop */
  }

  @media (max-width: 812px) { /* mobile */
    width: 100vw;
    max-width: 100vw;
    padding: 10px;
  }
`

const ExpertColumn = styled(Column)`
  position:relative;
  margin-bottom: 90px;
  color: ${softblack};

  background: ${white};
  border-radius:15px;
  border:1px solid;
  padding:20px;
  overflow:hidden;
  @media (min-width: 812px) { /* mobile */

  width: 525px;
  }
  @media (max-width: 812px) { /* mobile */
   // max-width: 100%;
  }

`
const MobileSideBarContainer = styled(Column)`
  color: ${darkWhite};
  width: 100vw;
`

const ChevronContainer = styled(Link)`
  cursor: pointer;
  
  width: 18px;
  height: 30px;

  transform: rotate(${props => props.open ? 180 : 0}deg);

  transition: all 0.3s ease-out;

  @media (max-width: 812px) { /* mobile */
    display: none;
  }
`

const Chevron = ({left, to}) => <ChevronContainer href={to} open={left}>
  <SVGChevron color={red} />
</ChevronContainer>

///

const InnerTopContainer = styled(Row)`
  align-items: center;

  @media (min-width: 1025px) { /* desktop */
    
  }

  @media (max-width: 812px) { /* mobile */

  }
`

const ContentTitle = styled.div`
  display: block;
  flex-direction: row;

  text-align:left;

  width: 560px;
  text-align: left;
  margin: 0px auto;

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

const nodeName = 'nodeFaq'

class QA extends React.Component {
  constructor(props) {
    super(props);
    
    const currentId = get(props, `data.${nodeName}.id`)
    const edges = get(props, 'data.allNodeFaq.edges')
    const totalCount = get(props, 'data.allNodeFaq.totalCount')

    let left = null
    let right = null
    
    if(edges){

      edges.sort(function(a, b){
        return a.node.field_question_number-b.node.field_question_number
      })

      edges.forEach( (edge, key) => {
        const {node: {id}} = edge;
        if(currentId === id) {
          if( key - 1 >= 0 ) {
            const previous = edges[key - 1]
            // const {node: {fields: {slug}}} = previous
            // left = `/qa/${kebabCase(slug)}`
            // const {node: {title}} = previous
            // left = `/qa/${kebabCase(title)}`

            const {node: {path: {alias}}} = previous
            left = alias
          }

          if( key + 1 < totalCount) {
            const next = edges[key + 1]
            // const {node: {fields: {slug}}} = next
            // right = `/qa/${kebabCase(slug)}`
            // const {node: {title}} = next
            // right = `/qa/${kebabCase(title)}`

            const {node: {path: {alias}}} = next
            right = alias
          }
          
        }
      })
    }
  
    this.state = {
      left,
      right,
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
                top: 0,
                zIndex: 5,
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
    const {left, right} = this.state
    const {overlay} = this.props

    const title = get(this, `props.data.${nodeName}.title`)
    const description = get(this, `props.data.${nodeName}.field_question_summary.processed`)

    const field_question_number  = get(this, `props.data.${nodeName}.field_question_number`)

    // const field_expert_1  = get(this, `props.data.${nodeName}.field_expert_1.processed`)
    // const field_expert_1_answer  = get(this, `props.data.${nodeName}.field_expert_1_answer.processed`)
    // const field_expert_2 = get(this, `props.data.${nodeName}.field_expert_2.processed`)
    // const field_expert_3_name = get(this, `props.data.${nodeName}.field_expert_3_name.processed`)
    // const field_expert_4_name = get(this, `props.data.${nodeName}.field_expert_4_name.processed`)

    // fields are janky.  
    // field_expert_1 = 1, field_expert_2_answer = 2, field_expert_1_answer = 3, field_expert_4_answer = 4
    const field_expert_1_answer = get(this, `props.data.${nodeName}.field_expert_1.processed`)
    const field_expert_2_answer = get(this, `props.data.${nodeName}.field_expert_2_answer.processed`)
    const field_expert_3_answer = get(this, `props.data.${nodeName}.field_expert_1_answer.processed`)
    const field_expert_4_answer = get(this, `props.data.${nodeName}.field_expert_4_answer.processed`)

    const field_expert_1  = get(this, `props.data.${nodeName}.relationships.field_expert_1_reference`)
    const field_expert_2  = get(this, `props.data.${nodeName}.relationships.field_expert_2_reference`)
    const field_expert_3  = get(this, `props.data.${nodeName}.relationships.field_expert_3_reference`)
    const field_expert_4  = get(this, `props.data.${nodeName}.relationships.field_expert_4_reference`)

    const field_expert_1_image  = get(this, `props.data.${nodeName}.relationships.field_expert_1_reference.relationships.field_main_image.localFile.publicURL`)
    const field_expert_2_image  = get(this, `props.data.${nodeName}.relationships.field_expert_2_reference.relationships.field_main_image.localFile.publicURL`)
    const field_expert_3_image  = get(this, `props.data.${nodeName}.relationships.field_expert_3_reference.relationships.field_main_image.localFile.publicURL`)
    const field_expert_4_image  = get(this, `props.data.${nodeName}.relationships.field_expert_4_reference.relationships.field_main_image.localFile.publicURL`)

    const filedUnder = getFiledUnder(get(this, `props.data.${nodeName}.relationships.field_belongs_to_subtheme`))
    const tags = getTags(get(this, `props.data.${nodeName}.relationships.field_tags`))

    const relatedContent = getRelatedContent(get(this, `props.data.${nodeName}.relationships.field_article_related_content`))

    // TODO: order of answers is messed up in Drupal, fix it there first.

    const header_title = "Ask the Scholars";
    const header_subtitle = "Interviews from 2003";

    let answers = []
    if(field_expert_1) answers.push({answer: field_expert_1_answer, expert: field_expert_1, background: field_expert_1_image})
    if(field_expert_2) answers.push({answer: field_expert_2_answer, expert: field_expert_2, background: field_expert_2_image})
    if(field_expert_3) answers.push({answer: field_expert_3_answer, expert: field_expert_3, background: field_expert_3_image})
    if(field_expert_4) answers.push({answer: field_expert_4_answer, expert: field_expert_4, background: field_expert_4_image})

    // if(field_expert_1_answer) answers.push({answer: field_expert_1_answer, expert: field_expert_3_name})
    // if(field_expert_4_answer) answers.push({answer: field_expert_4_answer, expert: field_expert_4_name})

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

    const MobileSideBar = props => (
      <MobileSideBarContainer>

        {/* <MobileRow style={{alignItems: 'flex-start'}}>
          <FiledUnderContainer>
            <SubTitle>filed under:</SubTitle>
            {
              filedUnder && filedUnder.map( ({name, link}, key) => <FiledUnderLink key={key} to={link}>{name}</FiledUnderLink>)
            }
          </FiledUnderContainer>

          <MobileColumn>
            <SubTitle>explore:</SubTitle>
            { renderTags() }
          </MobileColumn>
        </MobileRow> */}

        <MobileRow>
          {
            relatedContent.length > 0 && <SubTitle style={{marginTop: 0}}>see also:</SubTitle>
          }
        </MobileRow>

        <CardsContainer>
          { relatedContent }
        </CardsContainer>
        
      </MobileSideBarContainer>
    )

    ///

    return (
      <Container>
        {
          tagName && this.renderOverlay(tagName, tagCards)
        }
        <TopContainer overlay={overlay}>
          { !overlay && <AllEntities /> }
          <ContentTitle>
            <h1>{header_title}</h1>
            <h3>{header_subtitle}</h3>
          </ContentTitle>
          <CenterContainer>

            <InnerTopContainer>


              { left && <Chevron to={left} left={true}/>}
              <TopCard>
                <Question>Question {field_question_number}</Question>
                <Title>{title}</Title>
                <Description dangerouslySetInnerHTML={{ __html: description }}/>
              </TopCard>
              { right && <Chevron to={right}/>}
            </InnerTopContainer>
          </CenterContainer>
        </TopContainer>
        <BottomContaniner overlay={overlay}>
          <Answers>Answers:</Answers>
          <Experts>
          {
            answers.map( ({answer, expert, background}, key) => <Row key={key}>
              <ExpertColumn>
              {/* {expert.relationships.field_main_image.localFile.publicURL} */}
                <Answer answer={answer} expert={expert} background={background}></Answer>
              </ExpertColumn>
            </Row>)
          }
          </Experts>
          {/* <Footer overlay={overlay}>
            <MobileSideBar />
          </Footer> */}
        </BottomContaniner>
      </Container>
    )
  }
}

export default QA
