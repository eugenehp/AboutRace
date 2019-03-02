import React from "react"
import styled from 'styled-components'
import get from 'lodash/get'

import {
  Layout,
  CollectionPage,
  Teaching
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

const filterItems = ['all', 'lesson plans', 'additional resources', 'external resources', 'popular', 'handouts']

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

class ResourcesContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filter: 0
    };
  }

  componentWillUnmount() {
    if(!typeof localStorage === "undefined"){
      localStorage.setItem('resourceFilter', JSON.stringify(this.state))
    }
  }
  componentWillMount() {
    if(!typeof localStorage === "undefined"){
      const filter = JSON.parse(localStorage.getItem('resourceFilter'))
      this.setState(filter)
    }
  }
  
  componentDidMount() {
    setTimeout(()=>window.scrollTo(0,0),1)
  }

  render() {

    const articleQuery = get(this, `props.data.allNodeArticle.edges`);
    let articles = []
    if(articleQuery != undefined){
      articles = articleQuery.map(edge => edge.node)
    }

    const interviewQuery = get(this, `props.data.allNodeInterview.edges`);
    let interviews = []
    if(interviewQuery != undefined){
      interviews = interviewQuery.map(edge => edge.node)
    }

    const lessonPlanQuery = get(this, `props.data.allNodeLessonPlan.edges`);
    let lessonplans = []
    if(lessonPlanQuery != undefined){
      lessonplans = lessonPlanQuery.map(edge => edge.node)
    }
    
    const externalResourcesQuery = get(this, `props.data.allNodeExternalResource.edges`);
    let externalresources = []
    if(externalResourcesQuery != undefined){
      externalresources = externalResourcesQuery.map(edge => edge.node)
    }

    const handoutQuery = get(this, `props.data.allNodeHandout.edges`);
    let handouts = []
    if(handoutQuery != undefined){
      handouts = handoutQuery.map(edge => edge.node)
    }

    const AdditionalResourceQuery = get(this, `props.data.allNodeAdditionalResource.edges`);
    let additionalresources = []
    if(AdditionalResourceQuery != undefined){
      additionalresources = AdditionalResourceQuery.map(edge => edge.node)
    }

    //const articles = get(this, `props.data.allNodeArticle.edges`).map(edge => edge.node)
    //const interviews = []//get(this, `props.data.allNodeInterview.edges`).map(edge => edge.node)
    //const lessonplans = []//get(this, `props.data.allNodeLessonPlan.edges`).map(edge => edge.node)
    //const externalresources = []//get(this, `props.data.allNodeExternalResource.edges`).map(edge => edge.node)

    const title = "Resources"

    const description = get(this, `props.data.taxonomyTermForTeachers.field_intro_text.processed`)

    //filter logic

    let cards = {articles, interviews, lessonplans, externalresources, handouts, additionalresources}    

    let that = this

    //['all', 'lesson plans', 'additional resources', 'external resources', 'popular']
    Object.keys(cards).forEach(key => {

        switch(that.state.filter){
          case 1:
            if(key != 'lessonplans'){
              cards[key] = []
            }
          break;
          case 2:
            if(key == 'articles' || key == 'interviews' || key == 'additionalresources'){
              
            }else{
              cards[key] = []
            }
          break;
          case 3:
            if(key != 'externalresources'){
              cards[key] = []
            }
          break;
          case 5:
            if(key != 'handouts'){
              cards[key] = []
            }
          break;
        }
        cards[key].forEach(function (item, index) {
          // iterate through each item to determine whether it is popular or not
          switch(that.state.filter){
            case 4:
              if(cards[key][index].field_is_popular_resource != true){
                cards[key].splice(index, 1);
              }
            break;
          }
        });
    });

    const props = {
      title,
      description,
      cards: cards,
      sort: 'field_resource_weight'
    }

    return (
      // <Layout location={this.props.location}>
      //   <Container>
      //     <Teaching data={this.props.data} />
      //   </Container>
      // </Layout>
      <Layout location={this.props.location}>
        <Container>
          <CollectionPage {...props}>
            <Filters
              selected={this.state.filter}
              select={ filter => {
                localStorage.setItem('resourceFilter', JSON.stringify(this.state))
                this.setState({filter})
              }}
              //select={ filter => this.setState({filter}) }
            />
          </CollectionPage>
        </Container>
      </Layout>
    )
  }
}

export default ResourcesContainer

export const query = graphql`
  query ResourcesQuery {
    taxonomyTermForTeachers {
      field_intro_text {
        processed
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
    
    allNodeLessonPlan(filter: { title: { ne: "EMPTY" }}) {
      edges {
        node {
          ...LessonPlanFragment
        }
      }
    }
    allNodeArticle(filter: { title: { ne: "EMPTY" }, field_is_additional_resource: { eq: true }}) {
      edges {
        node {
          ... ArticleFragment
        }
      }
    }
    allNodeInterview(filter: { title: { ne: "EMPTY" }, field_is_additional_resource: { eq: true }}) {
      edges {
        node {
          ... InterviewFragment
        }
      }
    }
    allNodeExternalResource(filter: { title: { ne: "EMPTY" }}) {
      edges {
        node {
          ... ExternalResourceFragment
        }
      }
    }
    allNodeAdditionalResource(filter: { title: { ne: "EMPTY" }}) {
      edges {
        node {
          ... AdditionalResourceFragment
        }
      }
    }
    allNodeHandout(filter: { title: { ne: "EMPTY" }, field_show_in_resources: { eq: true }}) {
      edges {
        node {
          ... HandoutFragment
        }
      }
    }
  }
`
