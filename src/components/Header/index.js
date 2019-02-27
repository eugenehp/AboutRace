import React from 'react'
import Link from '../Link'
import styled from 'styled-components'

import Menu from './Menu'

import { Link as GatsbyLink  } from 'gatsby'

import {
  SVGLogo,
} from '../'

import {
  gold,
  white,
  purple,
  smokeblue,
  lavendar,
} from '../../colors'

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;

  z-index: 10;

  display: flex;
  flex-direction: row;
  align-items: center;
  
  background-color: ${purple};

  height: 96px;

  @media (min-width: 1025px) { /* desktop */
    justify-content: center;
  }

  @media (max-width: 812px) { /* mobile */
    flex-direction: column;

    height: ${props => props.open ? '75vh' : '70px'};

    padding-top: ${props => props.open ? 64 : 0}px;
    padding-bottom: ${props => props.open ? 120 : 0}px;
  }

  transition: all 0.3s ease-out;

  // #header-navigation{

  // }
`
const InnerNavigationContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const InnerItemContainer = styled.div`
  // display: flex;
  // align-items: center;

  @media (min-width: 1025px) { /* desktop */
  
  }

  @media (max-width: 812px) { /* mobile */
    display: none;
  }
`

const HomeItemContainer = styled.div`
  // display: flex;
  // align-items: center;

  @media (min-width: 1025px) { /* desktop */
  
  }

  @media (max-width: 812px) { /* mobile */
    display: none;
  }
`

// background-color: ${ props => `#${Math.floor(Math.random()*16777215).toString(16)}`};

const Item = styled(Link)`
  flex: 1;

  text-aligment: center;
  text-decoration: none;

  color: ${props => props.selected ? white : lavendar};
  font-weight: ${props => props.selected ? 500 : 400};

  text-transform: uppercase;

  font-family: 'Quicksand';
  font-size: 10pt;
  letter-spacing: 0.22em;

  margin-left: 1em;

  @media (min-width: 1335px) { 
    margin-left: 3vw;
    font-size: 12px;
    letter-spacing: 0.22em;
  }

  @media (max-width: 1334px) {
    margin-left: 2vw;
    font-size: 9pt;
    display: inline-flex;
    margin-bottom: 0.65em;
  }

  @media (max-width: 812px) { /* mobile */
    display: none;
  }
`

const MobileItem = styled(Item)`
  display: none;

  color: ${props => props.selected ? gold : smokeblue}!important;

  @media (max-width: 812px) { /* mobile */
    display: block;
    font-size: 15pt;
    letter-spacing: 5px;
  }
`

const Logo = styled.div`
  flex: 1;
  padding-left: 60px;
  padding-right: 36px;

  @media (max-width: 812px) { /* mobile */
    display: none;
  }

  @media (max-width: 1224px) {
    svg{
      //max-width: 250px;
    }
  }
`

const pages = [
  { name: 'themes', link: '/themes' },
  { name: 'videos', link: '/clips' },
  { name: 'resources', link: '/resources' },
  { name: 'interviews', link: '/interviews' },
  { name: 'articles', link: '/articles' },
  { name: 'qa', link: '/qa' },
  { name: 'about', link: '/about' },
  { name: 'order video', link: 'http://newsreel.org/video/RACE-THE-POWER-OF-AN-ILLUSION', target: '_BLANK'}
]

class Header extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
      open: false // mobile only
    };
  }

  render() {
    const {open} = this.state;
    //const currentSection = typeof window !== 'undefined' && window.location.pathname.split('/')[1]
    const innerPage = (this.props.pathname == "/") ? false : true;
    const pathPart = this.props.pathname.split('/')[1]

    return (
      <Container open={open} id="header">
        <Menu
          open={open}
          onClick={ e => this.setState({open: !open})}
        />
        {
          (innerPage) ? [
            <InnerNavigationContainer>
              {/* //  <Logo><Link href='/'><SVGLogo /></Link></Logo> */}
              <Logo>
                <GatsbyLink style={{cursor: 'pointer', textDecoration: 'none', color:'inherit'}} to={'/'}>
                  <SVGLogo />
                </GatsbyLink>
              </Logo>
              <InnerItemContainer style={{ paddingRight: 60 + 'px' }}>
                {
                  pages.map(({ name, link, target }, index) => <Item
                    selected={link.indexOf(pathPart) >= 0}
                    href={link}
                    key={index}
                    target={target ? target : ''}
                  >{(name)==='qa'? 'q&a': name}</Item>)
                }
              </InnerItemContainer>
            </InnerNavigationContainer>
          ] :
            <HomeItemContainer >
              {
                pages.map(({ name, link, target }, index) => <Item
                  selected={link.indexOf(pathPart) >= 0}
                  href={link}
                  key={index}
                  target={target ? target : ''}
                >{(name)==='qa'? 'q&a': name}</Item>)
              }
            </HomeItemContainer>
        }
        { open && <Link href='/'><SVGLogo/></Link> }
        {
          open && pages.map( ({name, link}, index) => <MobileItem
            selected={link.indexOf(pathPart) >= 0}
            to={link}
            key={index}
          >{name}</MobileItem>)
        }
      </Container>
    );
  }
}

export default Header
