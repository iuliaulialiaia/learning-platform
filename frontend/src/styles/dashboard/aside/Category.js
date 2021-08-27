import styled from 'styled-components';

const Category = styled.p`
  &&& span {
    color: ${props => props.checked ? '#FDC500' : '#D8D8D8'};
  }
`;

export default Category;