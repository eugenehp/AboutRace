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

class TeachingContainer extends React.Component {
  
  componentDidMount() {
    setTimeout(()=>window.scrollTo(0,0),1)
  }

  render() {
    return (
      <Layout location={this.props.location}>
        <Container>
          <Teaching data={this.props.data} />
        </Container>
      </Layout>
    )
  }
}

export default TeachingContainer

export const query = graphql`
  query TeachingQuery {
    taxonomyTermForTeachers {
      field_intro_text {
        processed
      }
    }
    allNodeHandout {
      edges {
        node {
          title
        }
      }
    }
    allNodeExternalLink {
      edges {
        node {
          title
          field_link {
            uri
            title
          }
        }
      }
    }
    allNodeLessonPlan {
      edges {
        node {
          ...LessonPlanFragment
        }
      }
    }
    allNodeArticle(filter: { field_is_additional_resource: { eq: true }}) {
      edges {
        node {
          ... ArticleFragment
        }
      }
    }
    allNodeInterview(filter: { field_is_additional_resource: { eq: true }}) {
      edges {
        node {
          ... InterviewFragment
        }
      }
    }
  }
`
