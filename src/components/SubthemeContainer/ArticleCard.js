import React from 'react'
import styled from 'styled-components'
import kebabCase from 'lodash/kebabCase'

import Description from './Description'
import Card from '../card'
import SVGArrow from '../SVGArrow'

import {
  red,
  white,
  articleColors,
  articleTickerColor
} from '../../colors'

const Container = styled(Card)`
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: center;

  background: linear-gradient(to bottom, ${articleColors[0]} 0%, ${articleColors[1]} 100%);

  color: ${white};

  padding-left: 15px;
  padding-right: 15px;

  z-index: 1;
`

const TopImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  z-index: -1;

  width: 100%;
  height: 221px;
  
  background: ${ props => props.background ? `url(${props.background}) center no-repeat` : null };

  filter: brightness(50%);
  opacity: 0.53;
`

const TopBlock = styled.div`
  position: relative;

  width: 100%;
  height: 221px;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  padding-right: 15px;
  padding-left: 15px;
`

const ArticleTitle = styled.div`
  font-family: 'Tisa Pro';
  font-size: 36px;
  line-height: 36px;
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
  font-family: Lato;
  font-size: 12pt;
  line-height: 18px;
  letter-spacing: 0.022em;

  text-transform: uppercase;
`

const Ticker = styled.div`
  position: absolute;

  left: 0;
  bottom: 0;

  font-family: Lato;
  font-weight: 600;
  font-size: 12pt;
  line-height: 30px;
  letter-spacing: 0.022em;

  border-top-right-radius: 3px;
  background-color: ${articleTickerColor};

  padding: 13px;
  text-transform: uppercase;
`

const BottomBlock = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 15px;
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

  width: 25px;
  height: 20px;
`

const Arrow = () => <ArrowContainer><SVGArrow color={red}/></ArrowContainer>

///

export class ArticleCard extends React.Component {
  render() {
    const { article, i, style = {}, onOpen } = this.props
    const link = `/articles/${kebabCase(article.title)}`

    const background = article.relationships.field_main_image.localFile.publicURL;
    const description = article.field_short_version ? `"${article.field_short_version.processed}"` : null;
    const author = article.field_author && article.field_author.processed;
    const title = article.title.replace('--','–');

    return (
      <Container
        background={background}
        title={title}
        type="Article"
        slug="article"
        changed={article.changed}
        onClick={ () => onOpen(link)}
      >
        <TopImage  background={background}/>
      {
        article.field_short_version && <InnerContainer>
          <TopBlock>
            <ArticleTitle>{title}</ArticleTitle>
            <Ticker>article</Ticker>
          </TopBlock>
          <BottomBlock>
            <Description>{description}</Description>
            <Row>
              <Author>by {author}</Author>
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
