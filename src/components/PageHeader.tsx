import { useMediaQuery } from 'react-responsive';
import styled from 'styled-components';

const PageHeader = () => {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });

  return (
    <Header>
      <Logo src="https://s3.us-east-1.amazonaws.com/farmershop.smserver.com.br/logo.jpg" alt="Farmer Shop Logo" />
      {isTabletOrMobile ? (
        <TitleMobile>Farmer Shop Integrator Manager</TitleMobile>
      ) : (
        <Title>Farmer Shop Integrator Manager</Title>
      )}
    </Header>
  );
};

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20%;
  background-color: #ffffff;
  flex-wrap: wrap;
  color: #e4bc01;
`;

const Logo = styled.img`
  max-width: 263px;
  max-height: 51px;
`;

const Title = styled.h1`
  margin-left: 20px;
`;

const TitleMobile = styled(Title)`
  margin-left: 0;
  margin-top: 20px;
`;

export default PageHeader;
