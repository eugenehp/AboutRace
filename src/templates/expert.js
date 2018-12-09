import React from "react"

import styled from 'styled-components'

import { graphql } from 'gatsby'

import {
  Layout,
  Expert
} from '../components'

import {
  white
} from '../colors'

const Container = styled.div`
  background-color: ${white};

  @media (max-width: 812px) { /* mobile */

  }
`

export default ({ data, location }) => <Layout location={location}>
  <Container>
    <Expert data={data} />
  </Container>
</Layout>

export const expertQuery = graphql`
  query expertQuery($id: String) {
    nodeExpert(id: { eq: $id }) {
      ...FullExpertFragment
    }

    allNodeInterview {
      edges {
        node {
          ...FullInterviewFragment
        }
      }
    }

    allNodeFaq {
      edges {
        node {
          ...FullQAFragment
        }
      }
    }
  }
`

