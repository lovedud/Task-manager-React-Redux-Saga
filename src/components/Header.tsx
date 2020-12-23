import React from 'react';

interface HeaderProps {
    title: string,
}

const Header = ({ title }: HeaderProps) => (
    <div className="header">
        {title}
    </div>
);

export default Header;