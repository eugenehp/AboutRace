import React from "react"
import styled from 'styled-components'
import {
  Layout,
  QA
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

export default ({ data, location }) => <Layout location={location}>
  <Container>
    <QA data={data} />
  </Container>
</Layout>


export const faqQuery = graphql`
  query faqQuery($id: String) {

    allNodeFaq {
      totalCount
      edges {
        node {
          id
          title
          field_question_number
          fields {
            slug
          }
          path{
            alias
          }
        }
      }
    }

    nodeFaq(id: { eq: $id }) {
  	  ...FullQAFragment
    }
  }
`
