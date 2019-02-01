import React from 'react'
import styled, { css } from 'styled-components'
import kebabCase from 'lodash/kebabCase'
import get from 'lodash/get'

import {
  FiledUnderLink
} from '../'

import getCards from '../../utils/getCards'

import {
  black,
  white,
  darkWhite,
  whiteShadowTrans,
  red,
  softblack,
  lessonplan,
} from '../../colors'
import { SIGCHLD } from 'constants';

const Row = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom:10px;
  label{
    font-weight:bold;
  }
`

const Column = styled.div`
  display: flex;
  flex-direction: column;
`

const Content = styled(Row)`
  width: 100%;
  max-width: 1360px;
  margin: 0 auto;
  padding: 18px 0 72px 0;
  align-items: flex-start;
`

const SideBar = styled(Column)`
  display: none;

  flex: 1;

  padding-left: 60px;
  padding-right: 30px;

  @media (min-width: 1025px) { /* desktop */
    display: flex;
    flex-direction: column;
    justify-content: top;
  }

  @media (max-width: 812px) { /* mobile */
    display: none;
  }

  font-size: 20px;
  padding: 35px;
  background: white;
  border-radius: 0px;
  height: auto;
  border:1px solid ${softblack};
`

const ContentBar = styled(Column)`
  align-items: center;
  padding-right: 60px;
  flex:3;
  @media (max-width: 812px) { /* mobile */
   padding:0px;  
  }
`

const MainText = styled.div`
  font-family: 'ff-tisa-web-pro';
  font-weight: 300;
  font-size: 17px;
  line-height: 24px;
  
  color: ${softblack};
 `

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  background-color: ${lessonplan};

  @media (min-width: 1025px) { /* desktop */

  }

  @media (max-width: 812px) { /* mobile */
     
  }
`

const MobileRow = styled.div`
  display: flex;
  flex-direction: row;

  padding-top: 64px;

  @media (min-width: 1025px) { /* desktop */

  }

  @media (max-width: 812px) { /* mobile */
     flex-direction: column;
  }
`

const ContentBox = styled.div`
  background:${white};
  border:1px solid ${softblack};
  border-radius:0px;
  padding: 25px;
  margin-bottom: 20px;
  width:100%;
`

const Title = styled.div`
  font-family: 'Quicksand';
  font-weight: 500;
  font-size: 36px;
  line-height: 42px;
  color: ${softblack};
`

const SectionTitle = styled.div`
font-family: 'Quicksand';
font-weight: 500;
font-size: 24px;
line-height: 115%;
color: ${softblack};
text-align:center;
`

const SubTitle = styled.div`
  font-family: Quicksand;
  font-weight: 500;
  font-size: 12px;
  line-height: 28px;
  letter-spacing: 0.22em;

  text-transform: uppercase;

  padding-left: 0;

  @media (min-width: 1025px) { /* desktop */
    padding-left: 15px;
  }

  @media (max-width: 812px) { /* mobile */
    padding-left: 0;
  }
`
const Episode = styled.div`
font-size: 20px;
margin: 5px 0px 10px;
border: 1px solid;
padding: 6px;
border-radius: 5px;
background: orange;
display: inline-block;

`

class LessonPlan extends React.Component {
  componentDidMount() {
    setTimeout(()=>window.scrollTo(0,0),1)
  }
  
  render() {
    const {overlay} = this.props

    const nodeName = 'nodeLessonPlan'

    const title = get(this, `props.data.${nodeName}.title`)
    const description = get(this, `props.data.${nodeName}.field_description.processed`)
    const lessonPlan = get(this, `props.data.${nodeName}.field_lesson_plan.processed`)

    const author = get(this, `props.data.${nodeName}.field_lesson_plan_author.processed`)
    const authorBio = get(this, `props.data.${nodeName}.field_less_plan_author_bio.processed`)
    const authorCopyright = get(this, `props.data.${nodeName}.field_copyright_a.processed`)
    

    const episode = get(this, `props.data.${nodeName}.field_episode`)
    const subjects = get(this, `props.data.${nodeName}.field_subjects.processed`)
    const grade_levels = get(this, `props.data.${nodeName}.field_grade_levels.processed`)
    const time_allotment = get(this, `props.data.${nodeName}.field_time_allotment.processed`)

    const assessment = get(this, `props.data.${nodeName}.field_assessment.processed`)
    const materials = get(this, `props.data.${nodeName}.field_mat.processed`)
    const overview = get(this, `props.data.${nodeName}.field_overview.processed`)
    const activities = get(this, `props.data.${nodeName}.field_activity`)

    let activitiesBlocks = []

    if(activities != null){
      activities.forEach(activity => {
        activitiesBlocks.push(<ContentBox><MainText dangerouslySetInnerHTML={{ __html: activity.processed }}/></ContentBox>)
      })
    }

    let episodeElement = '';
    if(episode != null){
      episodeElement = <Episode>Episode {episode}</Episode>
    }else{
      episodeElement = '';
    }

    return (
      <Container>
        <MobileRow>
          <Content>
            <ContentBar>
              <ContentBox>
                <Title>{title}</Title>
              </ContentBox>

              {overview &&
                <ContentBox>
                  <SectionTitle>Objective</SectionTitle>
                  <MainText dangerouslySetInnerHTML={{ __html: overview }}/>
                </ContentBox>
              }
              {lessonPlan &&
                <ContentBox>
                  <SectionTitle>Lesson Plan</SectionTitle>
                  <MainText dangerouslySetInnerHTML={{ __html: lessonPlan }}/>
                </ContentBox>
              }
              {materials &&
                <ContentBox>
                  <SectionTitle>Materials</SectionTitle>
                  <MainText dangerouslySetInnerHTML={{ __html: materials }}/>
                </ContentBox>
              }
              {assessment &&
                <ContentBox>
                  <SectionTitle>Assessment</SectionTitle>
                  <MainText dangerouslySetInnerHTML={{ __html: assessment }}/>
                </ContentBox>
              }
              {activitiesBlocks.length > 0 &&
                <ContentBox>
                  <SectionTitle>Activities</SectionTitle>
                </ContentBox>
              }
              {activitiesBlocks}
              

            </ContentBar>
            <SideBar>
              <div>
                {episodeElement}

                <Row><label>Grade Levels:</label> {grade_levels}</Row>
                <Row><label>Subjects:</label><br />{subjects}</Row>
                <Row><label>Time Allotment:</label> {time_allotment}</Row>
                <hr />
                <Row>Lesson Plan by {author}</Row>
                <Row>{authorBio}</Row>
                <Row>{authorCopyright}</Row>
              </div>
            </SideBar>
          </Content>
        </MobileRow>
      </Container>
    )
  }
}

export default LessonPlan
