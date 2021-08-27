import styled from 'styled-components';

const AsideWrapper = styled.div`
  &&& {
    border-right: 1px solid #979797;
    border-right: ${props => props.show ? '1px solid #979797' : 'none'};
  }
`;

export default AsideWrapper;