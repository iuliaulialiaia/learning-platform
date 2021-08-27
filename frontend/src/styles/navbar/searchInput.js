import styled from 'styled-components';

const SearchWrapper = styled.div`

  @media (max-width: 872px) {
    &&& * {
      position: static;
    }
    &&& {
      float: right;
      margin: 0;
    }
    input {
      display: none;
    }
    &&& svg {
      margin: 20px 10px;
      color: #33415c;
      //font-size: 24px;
      //float: right;
    }
    //background-color: red;
  }
  
`;

export default SearchWrapper;