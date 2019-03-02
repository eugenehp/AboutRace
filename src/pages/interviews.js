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
  const title = "Interviews"
  const description = get(data, 'taxonomyTermInterviewsPage.description.processed')
  const interviews = get(data, `allNodeInterview.edges`).map(edge => edge.node)

  const cards = { interviews }

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
  query InterviewsQuery {
    taxonomyTermInterviewsPage {
      id
      description {
        processed
      }
    }
    allNodeInterview(sort: {fields: field_weight}, filter: { title: { ne: "EMPTY" }}) {
      edges {
        node {
          ...FullInterviewFragment
        }
      }
    }
  }
`
