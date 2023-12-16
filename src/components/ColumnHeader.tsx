import styled from "styled-components";

interface ColumnHeaderProps {
  title: string;
  icon?: React.ReactNode;
  backgroundColor?: string;
}

const ColumnHeader = ({ title, icon, backgroundColor }: ColumnHeaderProps) => (
  <Header style={{ backgroundColor }}>
    {icon && <Icon>{icon}</Icon>}
    <Title>{title}</Title>
  </Header>
);

const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
`;

const Icon = styled.span`
  margin-right: 10px;
`;

const Title = styled.h2`
  margin: 0;
`;

export default ColumnHeader;