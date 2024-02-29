import BackLink from '../../components/BackLink';
import React from 'react';


export interface ErrorPageProps {
  message?: string;
}

const ErrorPage: React.FC<ErrorPageProps> = ({ message = 'An error occurred.' }) => (
  <div>
    <BackLink link="/" text="Back to Home Page" />
    <h1>Error</h1>
    <p>{message}</p>
  </div>
);

export default ErrorPage;
