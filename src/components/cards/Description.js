import React from 'react'
import styled from 'styled-components'
import { smokegrey } from '../../colors';

const Description = styled.div`
  font-family: 'Quicksand';
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  color: ${smokegrey};
  margin-top:5px;
`;

export default props => <Description  className="hoverExpand" dangerouslySetInnerHTML={{ __html: props.children ? props.children.replace(new RegExp('p>', 'g'), 'span>'): null }} />;
