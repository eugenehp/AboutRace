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

const description = `In the United States, buying a home is the key to achieving the American Dream. Forty-two percent of the net worth of all households consists of equity in their homes - that means for most Americans, their homes are their single largest asset. Homeownership provides families with the means to invest in education, business opportunities, retirement and resources for the next generation.`

export default ({ data, location }) => {
  const title = "Clips"
  // const description = get(data, 'taxonomyTermInterviewsPage.description.processed')
  const clips = get(data, `allNodeClip.edges`).map(edge => edge.node)

  const cards = { clips }

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
  query ClipsQuery {
    allNodeClip {
		  edges {
		    node {
		      ...FullClipFragment
		    }
		  }
		}
  }
`

