import React from 'react';
import './InnerNavLink.css';

interface InnerNavLinkProps {
    children: React.ReactNode;
}

const InnerNavLink: React.FC<InnerNavLinkProps> = ({ children }) => {
    return (
        <div className='InnerNav__Box'>
            <div className="InnerNavLink">{children}</div>
        </div>
    );
};

export default InnerNavLink;