import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const Spinner: React.FC = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <FontAwesomeIcon icon={faSpinner} spin size="lg" style={{ width: '30px', height: '30px' }} />
        </div>
    );
};

export default Spinner;