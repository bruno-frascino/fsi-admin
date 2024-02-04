import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

interface BackLinkProps {
  link: string;
  text: string;
}

const BackLink: React.FC<BackLinkProps> = ({ link, text }) => (
  <div style={{ marginTop: '10px', marginBottom: '5px' }}>
    <Link to={link}>
      {' '}
      <FontAwesomeIcon icon={faArrowLeft} /> {text}
    </Link>
  </div>
);

export default BackLink;
