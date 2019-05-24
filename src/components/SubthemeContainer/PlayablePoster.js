import React from "react"
import kebabCase from 'lodash/kebabCase'

import Link from '../Link';
import Poster from './Poster'

class PlayablePoster extends React.Component {
  constructor(props){
    super(props)
    this.state = {}
  }
  render() {
    if (!this.props.clip.relationships.field_poster_image) {
      return (
        <Poster />
      );
    }

    if (this.state.play) {
      return (
        <Poster>
          <iframe title='player' src="https://player.vimeo.com/video/18769983?title=0&byline=0&portrait=0" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
        </Poster>
      )
    }

    if (this.props.linkable) {
      return (
        <Link to={this.props.clip.path.alias}>
          <Poster>
            <img alt='poster image' src={this.props.clip.relationships.field_poster_image.localFile.publicURL} />
          </Poster>
        </Link>
      )
    }
    return (
      <Poster onClick={() => this.setState({ play: true })}>
        <img alt='another image' src={this.props.clip.relationships.field_poster_image.localFile.publicURL} />
      </Poster>
    );
  }
}

export default PlayablePoster;
