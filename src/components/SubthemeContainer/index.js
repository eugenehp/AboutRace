import React from 'react'
import styled from 'styled-components'
import FlipMove from 'react-flip-move'
import kebabCase from '../../utils/kebabCase'
// import get from 'lodash/get'

import Filters from '../Filters'
import {
  FiledUnderLink,
  Article,
  Interview,
  QA,
  Clip,
  CloseButton
} from '../'

import { 
  Overlay, 
  OverlayBody 
} from '../overlay'

import { default as CustomOverlay } from './Overlay'
import { gradient as gradientQA } from '../QA'
import { gradient as gradientInterview } from '../Interview'

import getCards from '../../utils/getCards'

import {
  white,
  softblack,
  smokeblue
} from '../../colors'

import hexToRGB from '../../utils/hexToRGB'
import reorder from '../../utils/reorder'
import shuffle from '../../utils/shuffle'

const range = require('range')

const NUM_CARDS_TO_SHOW = 3;

const OverlayContainer = styled.div`
  overflow-y: scroll;

  padding-top: 90px;
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;

  -ms-overflow-style: none;  // IE 10+
  overflow: -moz-scrollbars-none;  // Firefox

  &::-webkit-scrollbar {
    display: none;
    width: 0px;  /* remove scrollbar space */
    background: transparent;  /* optional: just make scrollbar invisible */
  }
`

const InnerOverlayContainer = styled.div`
  width: 1200px;
`

///

const AllEntities = styled.div`
  position: absolute;
  top: 30px;
  right: 50px;
  z-index: 999999999999;
`

const FlipContainer = styled(FlipMove)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  
  overflow: auto;

  padding-bottom: 286px;

  justify-content: center;
`

const Container = styled.div`
  background-color: ${smokeblue};
  backdrop-filter: blur(5px);

  border-bottom: solid thin grey;
`

class Subtheme extends React.Component {

  constructor(props){
    super(props)

    this.updateOrder(props, null)

    this.state = { 
      numCards: NUM_CARDS_TO_SHOW,
      filter: null,
      popup: false,
      card: null,
      typename: null,
      entities: '',
      entitiesLink: '',
    }

    this.close = this.close.bind(this)
    this.open = this.open.bind(this)
    this.toggleFilter = this.toggleFilter.bind(this)
  }

  toggleFilter(value) {
    // console.log('toggleFilter', value)
    if (this.state.filter === value) {
      this.setState({filter: null})
    } else {
      this.setState({filter: value})
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      // nextProps.filter !== this.props.filter ||
      nextState.numCards !== this.state.numCards ||
      nextState.filter !== this.state.filter ||
      nextState.popup !== this.state.popup
    );
  }

  UNSAFE_componentWillUpdate(nextProps, nextState) {
    if (this.state.filter !== nextState.filter) {
      // this.updateOrder(nextProps, nextState.filter)
    }
  }

  getShuffle = length => {
    // weird Gatsby hack
    const isBrowser = typeof window !== 'undefined';
    if (!isBrowser) return;

    let storedOrder = window.localStorage.getItem('shuffle');
    if(storedOrder){
      storedOrder = JSON.parse(storedOrder)
    }else{
      storedOrder = shuffle(range.range(length))
      window.localStorage.setItem('shuffle', JSON.stringify(storedOrder));
    }

    return storedOrder
  }

  updateOrder(props, filter) {
    if (props.filter) return;
    const length = getCards(props.data.relationships, filter).length;
    this.order = this.getShuffle(length)
  }

  close = event => {
    const array = ['close-button', 'subtheme-overlay']
    if( array.indexOf(event.target.id) === -1 ) return

    this.setState({
      popup: !this.state.popup,
      card: null
    })
  }

  open = (link, data) => {
    const typename = data.__typename.replace('node__','')
    const entities = typename === 'faq' ? `All Q&As` : `all ${typename}s`
    const entitiesLink = typename === 'faq' ? '/qa' : `/${typename}s`

    // a plain way to detect if window size is to small to show overlay
    /*if(window.innerWidth < 1000) {
      window.location = entitiesLink
      return
    }*/

    if(data.path != undefined){
      window.location = data.path.alias
    }else{
      window.location = `${entitiesLink}/${kebabCase(data.title)}`
    }
    /*this.setState({
      popup: true,
      card: {...data, link},
      typename,
      entities,
      entitiesLink
    })

    setTimeout( () => {
      window.document.getElementById('subtheme-overlay').scrollTop = 0
    }, 1)*/
  }

  renderOverlay = () => {
    const {
      typename,
      card
    } = this.state

    let component = null

    switch(typename){
      case 'article':
        component = <Article data={{nodeArticle: card}} overlay={true}/>
        break
      case 'interview':
        component = <Interview data={{nodeInterview: card}} overlay={true}/>
        break
      case 'faq':
        component = <QA data={{nodeFaq: card}} overlay={true}/>
        break
      case 'clip':
        component = <Clip data={{nodeClip: card}} overlay={true}/>
        break
      default:
        return null
    }

    return component
  }

  render() {
    const {data} = this.props;
    const subtheme = data;

    let {filter} = this.state

    const {
      popup, 
      card, 
      entities, 
      entitiesLink,
      typename
    } = this.state

    const rawCards = getCards(subtheme.relationships, filter, this.open)

    let allCards = filter ?
      rawCards.sort((a, b) => (b.props.changed - a.props.changed)) :
      reorder(rawCards, this.order)

    allCards = allCards.filter( allCards => !!allCards)

    allCards = allCards.filter( card => card.props.data.title != 'EMPTY')

    // const title = card && card.title ? card.title : '';
    // const link = card && card.link ? card.link : '';
    // const description = card && card.field_short_version ? card.field_short_version.processed : null;
    // const background = card && card.relationships.field_main_image && card.relationships.field_main_image.localFile.publicURL;

    let gradient, color

    switch(typename){
      case 'faq':
        gradient = gradientQA
        color = softblack
        break
      case 'interview':
        gradient = gradientInterview
        color = softblack
        break
      default:
        gradient = `linear-gradient(to bottom, #D9B0B0 0%, rgba(109,88,88,0.92) 100%)`
        color = white
    }

    return (
      <Container>
        <Overlay visible={popup}>
          <OverlayBody>
            <CustomOverlay gradient={gradient}>
              <OverlayContainer id="subtheme-overlay" onClick={this.close}>
                <InnerOverlayContainer>
                  { card && this.renderOverlay() }
                </InnerOverlayContainer>
              </OverlayContainer>
              <AllEntities>
                <FiledUnderLink color={color} to={entitiesLink}>{entities}</FiledUnderLink>
              </AllEntities>
              <CloseButton id="close-button" color={color} onClick={this.close} />
            </CustomOverlay>
          </OverlayBody>
        </Overlay>

        <Filters
          toggleFilter={this.toggleFilter}
          name={this.props.name}
          filter={filter}
          subtheme={subtheme}
          color={white}
        />
      
        <FlipContainer>
        {
          allCards.map( (c, k) => <div key={k}>{c}</div>)
        }
        </FlipContainer>
      </Container>
    )
  }
}

export default Subtheme;

