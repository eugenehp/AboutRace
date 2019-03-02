import React from 'react'
import styled from 'styled-components'
import get from 'lodash/get'

import {
  Layout,
  CollectionPage
} from '../components'

import { graphql } from 'gatsby'

import {
  white,
  black,
  fogwhite
} from '../colors'

const Container = styled.div`
  background-color: ${white};

  @media (max-width: 812px) { /* mobile */

  }
`

const FiltersContainer = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 12px;
  line-height: 24px;
  letter-spacing: 0.12em;
  font-family: 'Quicksand';
  color: ${props => props.color ? props.color : black};
  color: ${fogwhite};
  margin: 0 auto;
  opacity: 0.8;
`

const FilterButton = styled.div`
  cursor: pointer;

  text-transform: uppercase;
  margin-left: 25px;

  font-weight: ${props => props.selected ? 'bold' : 'none'};
`

const filterItems = ['all', 'episode one', 'episode two', 'episode three', 'Expert Connections']

const Filters = ({selected, select}) => <FiltersContainer>
  View:
  {
    filterItems.map( (name, key) => <FilterButton 
        selected={selected === key}
        key={"filter-"+key}
        onClick={ () => select(key)}
      >
      {name}
      </FilterButton>
    )
  }
</FiltersContainer>

// const description = `In the United States, buying a home is the key to achieving the American Dream. Forty-two percent of the net worth of all households consists of equity in their homes - that means for most Americans, their homes are their single largest asset. Homeownership provides families with the means to invest in education, business opportunities, retirement and resources for the next generation.`

class Clips extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filter: 0
    };
  }

  componentWillUnmount() {
    if(!typeof localStorage === "undefined"){
      localStorage.setItem('clipFilter', JSON.stringify(this.state))
    }
  }
  componentWillMount() {
    if(!typeof localStorage === "undefined"){
      const filter = JSON.parse(localStorage.getItem('clipFilter'))
      this.setState(filter)
    }
  }

  render() {
    const title = "Clips"
    const clips = get(this, `props.data.allNodeClip.edges`).map(edge => edge.node)
    const description = get(this, `props.data.allTaxonomyTermClipsPage.edges[0].node.description.processed`)
    
    let that = this
    let filteredClips = []
    clips.forEach(function (item, index) {
      //console.log(clips[index]);
      // iterate through each item to determine whether it is popular or not
      switch(that.state.filter){
        case 0:
          filteredClips.push(item)
        break;
        case 1:
        case 2:
        case 3:
          if(clips[index].field_episode == that.state.filter){
            filteredClips.push(item)
          }
        break;
        case 4:
          if(clips[index].field_is_expert_connection == true){
            filteredClips.push(item)
          }
        break;
      }
    });

    const props = {
      title,
      description,
      cards: {
        clips: filteredClips 
        //clips: clips.filter( ({field_episode}) => this.state.filter === 0 ? true : field_episode === this.state.filter )
      }
    }

    return (
      <Layout location={this.props.location}>
        <Container>
          <CollectionPage {...props}>
            <Filters
              selected={this.state.filter}
              select={ filter => {
                localStorage.setItem('clipFilter', JSON.stringify(this.state))
                this.setState({filter})
              }}
            />
          </CollectionPage>
        </Container>
      </Layout>
    )
  }
}

export default Clips

export const query = graphql`
  query ClipsQuery {
    allNodeClip(sort: {fields: field_weight}, filter: { title: { ne: "EMPTY" }}) {
		  edges {
		    node {
		      ...FullClipFragment
		    }
		  }
    }
    allTaxonomyTermClipsPage {
      edges {
        node {
          description {
            processed
          }
        }
      }
    }
  }
`

