import React from 'react'
import styled from 'styled-components'
import get from 'lodash/get'
import kebabCase from 'lodash/kebabCase'

import episodes from '../utils/episodes-data'

import {
  Layout,
  FiledUnderLink
} from '../components'

import { graphql } from 'gatsby'

import {
  white,
  black,
  smokegrey,
  softblack,
  fogwhite
} from '../colors'

const Container = styled.div`
  background-color: ${fogwhite};

  padding-top: 90px;
  padding-bottom: 90px;

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

const Title = styled.div`
  font-family: Quicksand;
  font-style: normal;
  font-weight: 500;
  line-height: 42px;
  font-size: 36px;

  color: ${black};
`

const SubTitle = styled.div`
  font-family: 'ff-tisa-web-pro';
  font-style: normal;
  font-weight: bold;
  line-height: 24px;
  font-size: 17px;

  color: ${black};
`

const Text = styled.div`
  font-family: 'ff-tisa-web-pro';
  font-style: normal;
  line-height: 24px;
  font-size: 17px;

  color: ${black};
`

const InnerContainer = styled(Column)`
  max-width: 700px;
  padding-left: 49px;

  @media (min-width: 1025px) { /* desktop */
    padding-left: 49px;
  }

  @media (max-width: 812px) { /* mobile */
     max-width: 100vw;
     padding-left: 20px;
     padding-right: 20px;
  }
`

///

class Credits extends React.Component {

  render() {
    const nodes = get(this, `props.data.allTaxonomyTermAboutTheFilmPage.edges`).map(edge => edge.node)
    const credits = nodes[0].field_series_production_credits.processed

    return (
      <Layout location={this.props.location}>
        <Container>
          <InnerContainer>
            <Title>Series Credits</Title>
            <Text dangerouslySetInnerHTML={{ __html: credits }}/>
          </InnerContainer>
        </Container>
      </Layout>
    )
  }
}

export default Credits

export const query = graphql`
  query CreditsQuery {

    allTaxonomyTermAboutTheFilmPage {
      edges {
        node {
          field_series_production_credits {
            processed
          }
        }
      }
    }
    
  }
`

