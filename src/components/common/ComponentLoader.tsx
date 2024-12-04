import React from 'react';

interface ComponentLoaderProps {
    size: number;
    text: string;
}

const ComponentLoader: React.FC<ComponentLoaderProps> = ({ size, text }) => {
    return (
        <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: size }}>Loading...</div>
            <p>{text}</p>
        </div>
    );
};

export default ComponentLoader; 