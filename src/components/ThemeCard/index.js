import React from 'react'
import styled from 'styled-components'

import SVGChevron from '../SVGChevron'
import SubThemeCard from './SubThemeCard'

import {
  getGradient,
  smokeblue,
  fogwhite,
  wetpaint
} from '../../colors'

const Container = styled.div`
  position: relative;

  padding-top: 15px;

  background-color: ${smokeblue};

  @media (max-width: 812px) { /* mobile */
    padding-top: 0;
  }
`;

const MainImage = styled.div`
  position: relative;

  height: 100%;

  background-size: cover !important;
  background-attachment: fixed;
  transition: all .5s ease;

  background: ${ props => props.background ? `url(${props.background}) center no-repeat` : `none`};

  @media (min-width: 1025px) { /* desktop */
    
  }

  @media (max-width: 812px) { /* mobile */
    width: 100vw;
    height: 50vh;
    max-width:100%;
  }
`

const Info = styled.div`
  padding: 30px 60px 0px 60px;

  max-width: 1320px;
  margin: 0 auto;

  @media (min-width: 1025px) { /* desktop */
    
  }

  @media (max-width: 812px) { /* mobile */
    width:100%;
    padding:30px 0px;
  }
`

const Explore = styled.div`
  font-family: 'Quicksand';
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-size: 14px;
`

const Title = styled.div`
  font-family: 'ff-tisa-web-pro';
  line-height: 48px;
  font-size: 48px;
  padding-bottom: 18px;
`;

const Description = styled.div`
  font-family: 'ff-tisa-web-pro';
  font-size: 17px;
  line-height: 24px;
  padding-bottom: 15px;
  & > p {
    margin: 0;
  }

`;


const SubThemes = styled.div`
  @media (min-width: 1025px) { /* desktop */
  }

  @media (max-width: 812px) { /* mobile */

  }
`

const DetailContainer = styled.div`
  display: flex;
  border-radius: 3px;
  background-color: ${wetpaint};
  padding: 15px;
  padding-left: 30px;
  @media (max-width: 812px) { /* mobile */
    flex-direction:column-reverse;
    padding-left:15px;
  }
`

const LeftCol = styled.div`
  flex: 1;
  padding-bottom: 30px;
  @media (min-width: 1025px) { /* desktop */
    
  }

  @media (max-width: 812px) { /* mobile */

  }
`
const RightCol = styled.div`
  flex: 1;
  padding-left: 30px;
  @media (min-width: 1025px) { /* desktop */
    
  }

  @media (max-width: 812px) { /* mobile */
    padding-left: 0px;
  }
`

class ThemeCard extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
      open: false
    };
  }

  render() {
    const { open } = this.state;

    const { 
      data,
      color
    } = this.props

    const {
      src
    } = data.relationships.field_theme_image.localFile.childImageSharp.original

    const background = src
    const title = data.name
    const description = data.description && data.description.processed
    const { subthemes } = data.relationships

    const gradient = getGradient(color)

    return (
      <Container>
        <Info>
          <DetailContainer>
            <LeftCol> 
              <Title>{title}</Title>
                <Description dangerouslySetInnerHTML={{ __html: description }} />
                <Explore style={{paddingTop:6, paddingBottom:15}}>Explore:</Explore>
                {
                  <SubThemes gradient={gradient}>
                      {
                        subthemes.map( (data, key) => <SubThemeCard key={key} data={data}/>)
                      }
                  </SubThemes>
                }
            </LeftCol>
            <RightCol>
              <MainImage background={background} />             
            </RightCol>
          </DetailContainer>
        </Info>
      </Container>
    )
  }
}

export default ThemeCard
