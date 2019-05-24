import React from 'react'
import styled from 'styled-components'
import kebabCase from '../../utils/kebabCase'
import get from 'lodash/get'

import Description from './Description'
import Card from '../Card'
import SVGArrow from '../SVGArrow'

import {
  red,
  white,
  articleColors,
  articleTickerColor,
  softblack,
  fogwhite,
  smokegrey,
  purple,
  articles
} from '../../colors'

const Container = styled(Card)`
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

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
  height: auto;

  display: flex;
  flex-direction: column;
  flex: 100;
  align-self: stretch;

  padding-right: 15px;
  padding-left: 15px;
`

const ArticleTitle = styled.div`
  font-family: 'Quicksand';
  font-weight: 600;
  font-size: 14px;
  letter-spacing: 0.00em;
  line-height: 18px;
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

const Author = styled.div`
  font-family: 'Quicksand';
  font-weight: 400;
  font-size: 12px;
  letter-spacing: 0.06em;
  line-height: 21px;
  padding-bottom: 9px;
  color: ${smokegrey}
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
  color: ${smokegrey};

  border-top-right-radius: 3px;
  background-color: ${articles};

  padding: 3px 15px;
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
  justify-content: space-between;
`

const ArrowContainer = styled.div`
  bottom: 15px;
  right: 17px;

  display: none;
  width: 25px;
  height: 20px;
`

const Arrow = () => <ArrowContainer><SVGArrow color={red}/></ArrowContainer>

///

export class ArticleCard extends React.Component {
  render() {
    const { data, onOpen } = this.props
    const article = data;

    //const link = `/articles/${kebabCase(article.title)}`
    const link = article.path.alias

    const background = get(article, 'relationships.field_main_image.localFile.publicURL')
    const description = get(article, 'field_article_summary.processed')
    const author = get(article, 'field_author.processed')
    const title = article.title.replace('--','–');

    return (
      <Container
        background={background}
        title={title}
        changed={article.changed}
        onClick={ () => onOpen(link)}
      >
      {
        article.field_short_version && <InnerContainer>
          <TopBlock>
          <TopImage  background={background}/>
            
            <Ticker>article</Ticker>
          </TopBlock>
          <BottomBlock>
            <ArticleTitle>{title}</ArticleTitle>
            <Author>by {author}</Author>
            <Description>{description}</Description>
            <Row>
             
              <Arrow />
            </Row>
          </BottomBlock>
        </InnerContainer>
      }
      </Container>
    )
  }
}

export default ArticleCard;
