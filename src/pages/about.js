import React from 'react'
import styled from 'styled-components'
import get from 'lodash/get'
import kebabCase from 'lodash/kebabCase'

import episodes from '../utils/episodes-data'

import {
  Layout,
  FiledUnderLink,
  Link
} from '../components'

import { graphql } from 'gatsby'

import {
  white,
  black,
  smokegrey,
  softblack,
  fogwhite,
  episodeColors
} from '../colors'

const Container = styled.div`
  background-color: ${fogwhite};

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

const AboutImage = styled.div`
  height: 365px;

  background-size: cover !important;
  background-attachment: fixed;
  background: ${ props => props.background ? `url(${props.background}) center no-repeat` : null };

  @media (max-width: 812px) { /* mobile */
    width: 100%;
    max-width: 100%;
    margin-left: 0px;
  }
`

const TopContainer = styled(Column)`
  background-color: ${smokegrey};
  justify-content: center;
  align-items: center;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const Quote = styled.div`
  font-family: ff-tisa-web-pro;
  font-style: italic;
  font-weight: normal;
  line-height: 48px;
  font-size: 36px;
  text-align: center;

  color: #F5F5F5;

  max-width: 683px;

  & p {
    margin: 0;
  }
`

const Author = styled(Quote)`
  font-size: 20px;
  font-family: 'Quicksand';
  font-weight: 500;
  font-style: normal;
  letter-spacing: 0.012em;
  opacity: .50;
`

const SubTitle = styled.div`
  font-family: Quicksand;
  font-style: normal;
  font-weight: 500;
  line-height: 42px;
  font-size: 14px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${softblack};
`

const InnerContainer = styled.div`
  max-width: 1200px;
  padding-top: 60px;
  display:flex;

  @media (max-width: 812px) { /* mobile */
    flex-direction:column;
  }


  .order-link{
    display: block;
    font-size: 22px;
    color: white;
    background: #475158;
    margin: 0px auto 25px;
    font-weight: bold;
    padding: 20px;
    text-align: center;
    &:hover{
      //color: #475158;
      //background: #fff;
      opacity: .9;
      box-shadow: 0px 0px 5px 0px #475158;
    }
  }
`

const SubColumn = styled.div`
  flex: ${ props => props.flex ? props.flex : '50%' };
  //max-width:50%;
  margin-right: 20px;

  @media (max-width: 812px) { /* mobile */
    margin-right: 0px;
  }
`

const Text = styled.div`
  margin-bottom: 90px;

  font-family: 'ff-tisa-web-pro';
  font-style: normal;
  font-weight:  ${ props => props.fontWeight ? props.fontWeight : 'normal'};
  line-height: 24px;
  font-size: 17px;

  color: ${softblack};
`

const CardContainer = styled(Column)`
  width: 730px;
  max-width:100%;
  margin-bottom: 30px;

  background-color: ${props => props.color ? props.color : '#FFDDAA'};

  padding-top: 36px;
  padding-bottom: 60px;
  padding-left: 60px;
  padding-right: 60px;
`

const EpisodeNumber = styled.div`
  font-family: Quicksand;
  font-style: normal;
  font-weight: 500;
  line-height: 42px;
  font-size: 14px;
  letter-spacing: 0.12em;

  text-transform: uppercase;

  color: ${black};
`

const EpisodeTitle = styled.div`
  font-family: Quicksand;
  font-style: normal;
  font-weight: 500;
  line-height: 42px;
  font-size: 36px;

  color: ${black};

  margin-top: 15px;
  margin-bottom: 15px;
`

const EpisodeDescription = styled.div`
  font-family: 'ff-tisa-web-pro';
  font-style: normal;
  font-weight: normal;
  line-height: 24px;
  font-size: 17px;

  color: ${black};

  margin-bottom: 20px;
`

const Card = props => {
  const {
    // title,
    episodeNumber,
    // field_episode,
    description,    
  } = props.data
  
  const color = episodeColors[props.episodeKey];

  const {
    title,
    field_episode_synopsis,
    field_synopsis_copyright
  } = props.synopsis

  const to = `/episodes/${kebabCase(props.number)}`
  const brief = description.split('</p>')[0].replace('<p>','')
  // const brief = field_episode_synopsis.processed

  return (
    <CardContainer color={color}>
      <EpisodeNumber>Episode {episodeNumber}</EpisodeNumber>
      <EpisodeTitle>{title.trim()}</EpisodeTitle>
      <EpisodeDescription dangerouslySetInnerHTML={{ __html: brief}}/>
      <FiledUnderLink
        style={{paddingLeft: 0}}
        color={black} 
        to={to}
      >
        Explore
      </FiledUnderLink>
    </CardContainer>
  )
}

const Footer = styled(Column)`
  align-items: center;

  padding-top: 114px;
  padding-bottom: 200px;
`

///

class About extends React.Component {
  
  constructor(props) {
    super(props);

    const quotes = get(this, `props.data.quotes.edges`).map(edge => {
      const{
        title,
        field_critic_quote: {
          processed
        }
      } = edge.node

      return {
        title,
        quote: processed
      }
    })

    this.quoteIndex = 0
  
    this.state = {
      quotes
    };

    const self = this

    setInterval(() => {
  
      if(quotes.length == self.quoteIndex) self.quoteIndex = 0
      
      self.quoteIndex++

      self.forceUpdate()

    }, 6000)
  }

  componentDidMount() {
    setTimeout(()=>window.scrollTo(0,0),1)
  }

  render() {
    const {
      quotes
    } = this.state

    const credits = get(this, `props.data.credits.edges`).map(edge => edge.node)
    const synopsis = get(this, `props.data.synopsis.edges`).map(edge => edge.node)
    const taxonomy = get(this, `props.data.taxonomy.edges`).map(edge => edge.node)
    const transcript = get(this, `props.data.transcript.edges`).map(edge => edge.node)

     const aboutImage = get(this, `props.data.taxonomy.edges[0].node.relationships.field_about_image.localFile.childImageSharp.original.src`)

    const numbers = ['one', 'two', 'three']

    return (
      <Layout location={this.props.location}>
        <Container>
          <TopContainer>
            <Quote dangerouslySetInnerHTML={{ __html: quotes[this.quoteIndex].quote }}/>
            <Author> {quotes[this.quoteIndex].title} </Author>
          </TopContainer>

          <Column style={{alignItems: 'center'}}>
            <InnerContainer>

                <SubColumn flex="30%">
                  <AboutImage background={aboutImage}/>
                  <Text fontWeight="bold" dangerouslySetInnerHTML={{ __html: [taxonomy[0].field_about_image_description.processed] }}>
                  </Text>
                </SubColumn>
                <SubColumn flex="45%">
                  <SubTitle dangerouslySetInnerHTML={{ __html: [taxonomy[0].field_updated_ep_statement_title.processed] }}>
                  </SubTitle>
                  <Text dangerouslySetInnerHTML={{ __html: [taxonomy[0].field_updated_ep_statement.processed] }}>
                  </Text>
                </SubColumn>

               <SubColumn flex="25%">
              
               {/* <Link
                    to='http://newsreel.org/video/RACE-THE-POWER-OF-AN-ILLUSION'
                  >
                    Order Film
                  </Link> */}

                  <a class="order-link" style={{cursor: 'pointer', textDecoration: 'none'}} href={'http://newsreel.org/video/RACE-THE-POWER-OF-AN-ILLUSION'}>
                  Order the video from California Newsreel
                  </a>

              
                  <FiledUnderLink
                    color={black}
                    to='/credits'
                  >
                    Series Credits
                  </FiledUnderLink>

              </SubColumn>
          
            </InnerContainer>
          </Column>

          <Column style={{alignItems: 'center'}}>
            {
              episodes.map( (episode, key) => <Card key={key} data={episode} number={numbers[key]} synopsis={synopsis[key]} episodeKey={key}/>)
            }
          </Column>

          <Footer>

          </Footer>

        </Container>
      </Layout>
    )
  }
}

export default About

export const query = graphql`
  query AboutQuery {

    quotes: allNodeCriticQuote {
      edges {
        node {
          id
          title
          field_critic_quote {
            processed
          }
        }
      }
    }

    taxonomy: allTaxonomyTermAboutTheFilmPage {
      edges {
        node {
          id
          field_updated_ep_statement_title {
            processed
          }
          field_updated_ep_statement {
            processed
          }
          field_series_production_credits {
            processed
          }
          field_about_image_description {
            processed
          }
          relationships {
            field_about_image {
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
      }
    }
    
    synopsis: allNodeSynopsis {
      edges {
        node {
          title
          field_episode_synopsis {
            processed
          }
          field_synopsis_copyright {
            processed
          }
        }
      }
    }
    
    credits: allNodeEpisodeCredits {
      edges {
        node {
          title
          field_episode_credits {
            processed
          }
          field_episode_copy {
            processed
          }
        }
      }
    }
    
    transcript: allNodeTranscript {
      edges {
        node {
          title
          body {
            processed
          }
          field_cop {
            processed
          }
        }
      }
    }
}
`

