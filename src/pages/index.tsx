import styled, { createGlobalStyle } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotate } from '@fortawesome/free-solid-svg-icons';

import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import ColumnHeader from '../components/ColumnHeader';

const LandingPage = () => {
  return (
    <>
      <GlobalStyle />
      <Container>
        <PageHeader />
        <Main>
          <Column>
            <ColumnHeader title="Sync Center" icon={<FontAwesomeIcon icon={faRotate} />} backgroundColor="#f0f0f0" />
            <ColumnItem title="Farmer Brands" url="/sync/brand/sm" />
            <ColumnItem title="Tray Brands" url="/sync/brand/tray" />
            <ColumnItem title="Brand Map" url="/sync/brand" />
            <ColumnItem title="Farmer Categories" url="/sync/category/sm" />
            <ColumnItem title="Tray Categories" url="/sync/category/tray" />
            <ColumnItem title="Categories Map" url="/sync/category" />
          </Column>
          <Column>
            <ColumnHeader title="Integration Center" icon="📁" backgroundColor="#f0f0f0" />
            <ColumnItem title="Integration Management" url="https://example.com" />
            <ColumnItem title="Notification Management" url="https://example.com" />
          </Column>
          <Column>
            <ColumnHeader title="Technical Center" icon="📁" backgroundColor="#f0f0f0" />
            <ColumnItem title="Logs" url="https://example.com" />
          </Column>
        </Main>
      </Container>
    </>
  );
};

interface ColumnItemProps {
  icon?: React.ReactNode;
  title: string;
  url: string;
}

const ColumnItem = ({ icon, title, url }: ColumnItemProps) => (
  <Item>
    {icon && <Icon>{icon}</Icon>}
    <Link to={url}>{title}</Link>
  </Item>
);

const GlobalStyle = createGlobalStyle`
  a {
    color: inherit;       /* The color of the link will be the same as the text around it */
    text-decoration: none; /* Removes the underline */
  }
  a:hover {
    text-decoration: underline;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #ffffff;
  font-family: 'Montserrat', sans-serif;
`;

const Main = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  height: 80%;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  padding: 20px;
`;

const Item = styled.div`
  padding-top: 10px;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const Icon = styled.span`
  margin-right: 10px;
`;

export default LandingPage;
