import styled from 'styled-components';

const DropdownWrapper = styled.div`
  display: ${props => props.show ? 'block' : 'none'};
`;

export default DropdownWrapper;