import React, { Component } from 'react'

import {
  Layout,
  Main
} from '../components'

class Index extends Component {
  render() {
    return (
      <Layout location={this.props.location}>
        <Main data={this.props.data}/>
      </Layout>
    )
  }
}

///

export default Index

export const query = graphql`
  query HomeQuery {
    taxonomyTermThemes(id: { eq: "8661596c-176b-4527-97c4-af0e614da9d8" }) {
      relationships {
        field_theme_image {
          localFile {
            publicURL
            childImageSharp {
              original {
                width
                height
                src
              }
            }
          }
        }
      }
    }

    allNodeInterview {
      edges {
        node {
          ...FullInterviewFragment
        }
      }
    }
  }
`

