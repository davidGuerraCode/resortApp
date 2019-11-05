import styled from 'styled-components';
import defaultImg from '../images/room-2.jpeg';

const StyledHero = styled.header`
  min-height: 60vh;
  background: url(${props => (props.img ? props.img : defaultImg)}) center/cover
    no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default StyledHero;
