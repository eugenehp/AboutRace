import React from "react"
import styled from 'styled-components'
import {
  Layout,
  Teaching
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
    <Teaching data={data} />
  </Container>
</Layout>

export const query = graphql`
  query TeachingQuery {
    allNodeLessonPlan {
      edges {
        node {
          ...LessonPlanFragment
        }
      }
    }
    allNodeArticle(filter: { field_include_in_the_teaching_se: { eq: true }}) {
      edges {
        node {
          ... ArticleFragment
        }
      }
    }
    allNodeInterview(filter: { field_include: { eq: true }}) {
      edges {
        node {
          ... InterviewFragment
        }
      }
    }
  }
`
