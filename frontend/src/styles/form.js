import styled from 'styled-components';

const InputWrapper = styled.div`
  ${props => props.error && `
    &&& svg {
      display: inline;
    }
    
    &&& input {
      padding: 20px 20px 20px 50px;
      color: #C40000;
      font-weight: bold;
    }
    
    &&& p {
      display: block;
    }
  `}
  &&& input {
    padding: ${props => props.error ? '20px 20px 20px 50px' : '20px'}
  }
`;

const InfoMessageWrapper = styled.div`
  ${props => props.error ? `    
    &&& h1:nth-child(2) {
      display: block;
    }
  ` : `
    &&& h1:nth-child(1) {
      display: block;
    }
  `}
`;

export {
  InputWrapper,
  InfoMessageWrapper
}