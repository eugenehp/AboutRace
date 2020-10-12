import React from "react"
import kebabCase from '../utils/kebabCase'
import styled from 'styled-components'
import get from 'lodash/get'
import { graphql } from 'gatsby'

import {
  Layout,
  Link,
  SubthemeContainer,
  SVGChevron,
} from '../components'

import {
  red,
  white,
  getGradient,
  softblack,
  smokeblue,
  wetpaint
} from '../colors'

const queryString = require('query-string');

const Container = styled.div`
  min-height: 100vh;

  position: relative;

  background-color: ${smokeblue};

  z-index: 0;
`

const Header = styled.div`
  padding: 60px;

  background-color: ${wetpaint};

  height: auto;
  
  transition: all .5s ease;

  @media (max-width: 812px) { /* mobile */
    padding-left: 36px;
    padding-right: 36px;
  }

  &::before {
    content: '';
    position: absolute;
    z-index: -2;

    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    width: 100%;
    height: 100%;

  }
`

const ChevronContainer = styled.div`
  cursor: pointer;

  position: absolute;
  display: none;
  left: -25px;
  
  width: 16px;
  height: 30px;

  transform: rotate(180deg);

  transition: all 0.3s ease-out;

  @media (max-width: 812px) { /* mobile */
    left: 0;
    top: -30px;
  }
`

const Chevron = () => <ChevronContainer>
  <SVGChevron color={red} />
</ChevronContainer>
///

const Row = styled.div`
  position: relative;
`

const Title = styled.div`
  color: ${softblack};
  font-family: 'ff-tisa-web-pro';
  font-size: 48px;
  line-height: 48px;

  padding-bottom: 18px;
`

const TopLink = styled(Link)`
  font-family: 'Quicksand';
  font-size: 14px;
  font-weight: 500;
  line-height: 42px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  
  color: ${softblack};
`

const Description = styled.div`
  font-family: 'ff-tisa-web-pro';
  font-size: 17px;
  font-weight: 400;
  line-height: 24px;
  color: ${softblack};

  max-width: 600px;
  & p {
    margin: 0;
  }
`

const Subthemes = styled.div`
`

class SubThemePage extends React.Component {

 

  render() {
    const {
      data, 
      pageContext,
      location
    } = this.props;

    const {
      theme,
      color
    } = pageContext;
    const {taxonomyTermSubthemes} = data;
    const subtheme = taxonomyTermSubthemes;

    const queryParams = queryString.parse(this.props.location.search);

    const getShortname = subtheme => {
      const parts = subtheme.name ? subtheme.name.split('-') : [];
      return encodeURIComponent(kebabCase(parts[parts.length - 1]))
    }

    const background = get(this, 'props.pageContext.field_theme_image.localFile.publicURL');
    const title = subtheme.name.indexOf(':') >=0 ? subtheme.name.split(':')[1] : subtheme.name;
    const description = taxonomyTermSubthemes.description ? taxonomyTermSubthemes.description.processed : `<br/>`;

    const gradient = getGradient(color)

    const themeLink = `/themes/#${kebabCase(theme.name)}`

    return (
      <Layout location={location}>
        <Container>

          <Header>
            <Row>
              <Chevron />
              <TopLink href={themeLink}>{theme.name}</TopLink>
            </Row>
            <Title>{title}</Title>
            <Description dangerouslySetInnerHTML={{ __html: description }} />
          </Header>

          <Subthemes>
            <SubthemeContainer
              data={subtheme}
              key={getShortname(subtheme)}
              name={getShortname(subtheme)}
              filter={queryParams[getShortname(subtheme)]}
              queryParams={queryParams}
            />
          </Subthemes>

        </Container>
      </Layout>
    )
  }
}

export default SubThemePage

export const pageQuery = graphql`
  query subThemeQuery($id: String) {

    taxonomyTermSubthemes(id: {eq: $id}) {
      name
      id
      description {
        processed
      }
      relationships {
        articles: backref_field_belongs_to_subtheme_node_article {
          ...FullArticleFragment
        }
        clips: backref_field_belongs_to_subtheme_node_clip {
          ...FullClipFragment
        }
        interviews: backref_field_which_subtheme_does_this_b_node_interview {
          ...FullInterviewFragment
        }
        faqs: backref_field_belongs_to_subtheme_node_faq {
          ...FullQAFragment
        }
        externalresources: backref_field_belongs_to_subtheme_node_external_resource {
          ...FullExternalResourceFragment
        }
      }
    }
  }

`
