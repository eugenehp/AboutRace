import React from 'react'
import styled from 'styled-components'
import get from 'lodash/get'

import {
  Layout,
  CollectionPage
} from '../components'

import { graphql } from 'gatsby'

import {
  white
} from '../colors'

const Container = styled.div`
  background-color: ${white};

  @media (max-width: 812px) { /* mobile */

  }
`

export default ({ data, location }) => {
  const title = "Articles"
  const description = get(data, 'taxonomyTermArticlesPage.description.processed')
  const articles = get(data, `allNodeArticle.edges`).map(edge => edge.node)

  const cards = { articles }

  const props = {
    title,
    description,
    cards
  }

  return (
    <Layout location={location}>
      <Container>
        <CollectionPage {...props}/>
      </Container>
    </Layout>
  )
}

export const query = graphql`
  query ArticlesQuery {
    taxonomyTermArticlesPage {
      description {
        processed
      }
    }
    allNodeArticle(sort: {fields: field_weight}, filter: { title: { ne: "EMPTY" }}) {
      edges {
        node {
          ...FullArticleFragment
        }
      }
    }
  }
`
