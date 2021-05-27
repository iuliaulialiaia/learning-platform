import styled from 'styled-components';
import React from 'react';
const DropdownWrapper = styled.div`
  display: ${props => props.show ? 'block' : 'none'};
`;

export default DropdownWrapper;