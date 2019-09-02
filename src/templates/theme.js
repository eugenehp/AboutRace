import React from "react"
import { Link } from 'gatsby'
import kebabCase from 'lodash/kebabCase'
import styled from 'styled-components'
import { graphql } from 'gatsby'

const ThemeTitle = styled.div`
  margin-top: 15px;
  margin-bottom:15px;
  color: inherit;
  font-family: "lato";
  font-weight: 800;
  text-rendering: optimizeLegibility;
  font-size: 54px;
  line-height: 1
  letter-spacing: 0.04em;
`
const ThemeDescription = styled.div`
  font-weight: 400;
  font-size: 18px;
  line-height: 1.5;
  letter-spacing: 0.02em;
  position:relative;
  max-width: 800px;
  margin: 0 auto;
  font-family: 'Lato';
`
const ThemeHeader = styled.div`
  height: 100vh;
  // opacity: 0.8;
  background-image: ${props => props.background ?  `url(${props.background})` : `none`};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-color: lightgrey;
  position: fixed;
  top: 0;
  left: 00px;
  right: 0;
  z-index: -999;
`

const ThemeIntro = styled.div`
  background-color: rgba(255,255,255,0.92);
  padding: 45px 75px;
  margin-left: 60px;
  min-height: 100vh;
  width: 800px;
`
const ThemeMain = styled.div`
  position: absolute;
  width:100%;
`

const ThemesMenu = styled.div`
  position: fixed;
  top: 0px;
  left: 15px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const MenuItem = styled(Link)`
  cursor: pointer;
  textDecoration: none;
  color:inherit;
  height: 18px;
  width: 18px;
  background-color: ${props => props.selected ? `#4b5256` : `#adc6d2`};
  border-radius: 50%;
  display: inline-block;
  margin-bottom: 15px;
  margin-left: 2.5px;
`

const AllThemesLink = styled(Link)`
  cursor: pointer;
  text-decoration: none !important;
  color:inherit;
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
`

const Col = styled.div`
  display: flex;
  flex-direction: column;
`
const CardLink = styled(Link)`
  cursor: pointer;
  text-decoration: none !important;
  color:inherit;
  width: 100%;
`

const Card = styled.div`
  border-radius: 12px;
  background-color: white;
  padding: 30px;
  margin-bottom: 30px;
`

const CardTitle = styled.div`
  font-family: 'Lato';
  font-size: 24px;
  margin-bottom: 15px;
  text-transform: capitalize;
  line-height: 1.25;
`

const ChevronButton = styled.div`
  height: 100%;
  margin-left: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

class ThemePage extends React.Component {
  render() {
    const {data, location} = this.props;
    const {taxonomyTermThemes, allTaxonomyTermThemes} = data;
    const theme = taxonomyTermThemes;

    const themeLinks = allTaxonomyTermThemes.edges.map( edge => `/themes/${kebabCase(edge.node.name)}`);

    const getShortname = subtheme => {
      const parts = subtheme.name.split('-');
      return encodeURIComponent(kebabCase(parts[parts.length - 1]))
    }

    const getDescription = subtheme => {
      let result = '<br/>';
      if(subtheme.description)
        if(subtheme.description.processed)
          result = subtheme.description.processed;

      return result;
    }

    const getLink = subtheme => {
      let result = `/subthemes/${kebabCase(subtheme.name)}`
      
      if(subtheme.path != undefined){
        result = subtheme.path.alias
      }

      return result;
    }

    const sorted = theme.relationships.subthemes.sort((a, b) => {
      var nameA = getShortname(a);
      var nameB = getShortname(b);
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    });

    return (
      <div>
       
        <ThemeHeader background={theme.relationships.field_theme_image && theme.relationships.field_theme_image.localFile.publicURL}>
           &nbsp;
        </ThemeHeader>
        <ThemeMain>

          <ThemesMenu>
            {
              themeLinks.map((link, i) => 
                <MenuItem key={`menuitem-${i}`} to={link} selected={link === location.pathname}/>
              )
            }
          </ThemesMenu>

          <ThemeIntro>
            <AllThemesLink to='/themes'>
              {/* <Huge>‹</Huge> */}
              <img alt="img1" style={{height: 24, opacity:0.8, display:'inline-block', marginBottom:0, marginRight:15, verticalAlign:'middle'}} src={require('../assets/images/back.svg')} />
              <h4 style={{marginBottom:0, display:'inline-block', verticalAlign:'middle'}}>All Themes</h4>
            </AllThemesLink>
            <ThemeTitle>{theme.name}</ThemeTitle>
            {
              theme.description
              ?
              <ThemeDescription
                dangerouslySetInnerHTML={{ __html: theme.description.processed }}
              />
              :
              null
            }

            {
              sorted.map((subtheme, i) => 
                <CardLink key={`subtheme-${i}`} to={getLink(subtheme)}>
                  <Card>
                    <Row>
                      <Col style={{flex:1}}>
                        <CardTitle>{getShortname(subtheme)}</CardTitle>
                        <div
                          dangerouslySetInnerHTML={{ __html: getDescription(subtheme) }}
                        />
                      </Col>
                      <Col>
                        <ChevronButton><img alt="img2" style={{height: 24, opacity:0.8, display:'inline-block', marginBottom:0, marginRight:15, transform: 'rotate(180deg)', verticalAlign:'middle'}} src={require('../assets/images/back.svg')} /></ChevronButton>
                      </Col>
                    </Row>
                  </Card>
                </CardLink>
              )
            }
          </ThemeIntro>
        </ThemeMain>

        <br />
      </div>
    )
  }
}

export default ThemePage

export const pageQuery = graphql`
  query themeQuery($id: String) {
    allTaxonomyTermThemes {
      edges {
        node {
          id
          name
        }
      }
    }
    taxonomyTermThemes(id: { eq: $id }) {
      id
      name
      description {
        processed
      }
      relationships {
        field_theme_image {
          localFile {
            publicURL
            childImageSharp {
              sizes(maxWidth: 960, quality: 90) {
                ...GatsbyImageSharpSizes
              }
            }
          }
        }

        subthemes: backref_field_belongs_to_theme {
          name
          id
          description {
            processed
          }
          relationships {
            articles: backref_field_belongs_to_subtheme_node_article {
              ...ArticleFragment
            }
            clips: backref_field_belongs_to_subtheme_node_clip {
              ...PosterImageClipFragment
            }
            interviews: backref_field_which_subtheme_does_this_b_node_interview {
              ...InterviewFragment
            }
            faqs: backref_field_belongs_to_subtheme_node_faq {
              ...QAFragment
            }
          }
        }
      }
    }
  }
`
