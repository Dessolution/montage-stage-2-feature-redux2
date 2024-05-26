import React from 'react';
import './InnerNavLink.css';

interface InnerNavLinkProps {
    children: React.ReactNode;
}

const InnerNavLinkNav: React.FC<InnerNavLinkProps> = ({ children }) => {
    return (
        <div>
            <div className="InnerNavLink">{children}</div>
        </div>
    );
};

export default InnerNavLinkNav;