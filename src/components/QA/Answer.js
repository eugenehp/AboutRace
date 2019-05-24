import React from 'react'
import styled from 'styled-components'
import kebabCase from '../../utils/kebabCase'
import get from 'lodash/get'
import { Link } from 'gatsby'

const Container = styled.div`
  display: flex;
  flex-direction: column;
`


const ExpertTitle = styled.div`
  font-family: 'ff-tisa-web-pro';
  font-size: 24px;
  font-weight: 500;
  text-align: center;
  line-height: 100%;
  padding-bottom: 12px;
`

const ExpertJobTitle = styled.div`
  font-family: 'ff-tisa-web-pro';
  font-size: 18px;
  font-weight: 500;
  text-align: center;
  line-height: 100%;
  padding-bottom: 12px;

  p{
    margin:0px;
    padding:0px;
  }
`

const ExpertImage = styled.div`
  position: relative;
  text-align: center;
  margin: 0px auto;
  z-index: 1;

  height: 200px;
  width: 200px;
  display: block;
  margin-bottom:10px;

  border-radius: 100px;


  background: ${ props => props.background ? `url(${props.background}) center no-repeat` : null };
  background-size: cover;
`

const ExpertAnswer = styled.div`
  font-family: 'ff-tisa-web-pro';
  font-weight: 300;
  font-size: 17px;
  line-height: 24px;
  padding-bottom: 18px;
  & p {
    margin-top:0;
    margin-bottom: 1em;
  }
`

const ExpertAnswerToggle = styled.div`
  cursor:pointer;
  position: absolute;
  right: 0px;
  bottom: 0px;
  font-size: 30px;
  font-weight: bold;
  color: white;
  padding: 8px 16px;
  span{
      z-index:10;
      position:relative;
  }
  &:after{
    content: '';
    position: absolute;
    background: orange;
    right: -45px;
    bottom: -100px;
    height: 200px;
    width: 100px;
    transform: rotate(45deg);
  }
`

const ExpertAnswerToggleBackground = styled.div`

`
const ExpertAnswerToggleIcon = styled.div`
  font-size:30px;
  color:white;
`

class Answer extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            expanded: false
        };
        this.expandElement = this.expandElement.bind(this);
    }

    expandElement() {     
        this.setState(state => ({
            expanded: !state.expanded
        }));
    }
    
    render() {
        const expert = get(this, `props.expert`)
        const background = get(this, `props.background`)
        let answer = get(this, `props.answer`)

        const maxlength = 495;

        let toggleable = false;
        let toggleText = (this.state.expanded === false) ? '+' : '-';

        //const expertLink = `/experts/${kebabCase(expert.title)}` 
        const expertLink = expert.path.alias
        if(answer.length > maxlength){
            toggleable = true;
            answer = (this.state.expanded === false) ? answer.substring(0, maxlength)+'...' : answer;
        }
        return (
            <Container>


                  <Link style={{color:'inherit', textDecoration:'none'}} to={expertLink}>
                    <ExpertImage background={background} />
                    <ExpertTitle>{expert.title}</ExpertTitle>
                </Link>
                {expert.field_title ? <ExpertJobTitle dangerouslySetInnerHTML={{ __html: expert.field_title.processed }}/> : null}
                <ExpertAnswer dangerouslySetInnerHTML={{ __html: answer }}/>
                {(toggleable) ? 
                
                    <ExpertAnswerToggle onClick={this.expandElement}>
                        <span>{toggleText}</span>
                    </ExpertAnswerToggle>
                
                 : null }
            </Container>
        )
    }
}

export default Answer