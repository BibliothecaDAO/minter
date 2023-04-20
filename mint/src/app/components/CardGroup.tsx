import React from 'react';
import Card from './Card';
import { CreationObject } from './useCreation';

// Define the GroupComponent's props
interface GroupComponentProps {
    items: CreationObject[];
    onClick?: () => void;
}

const CardGroup: React.FC<GroupComponentProps> = ({ items, onClick }) => {

    return (
        <div className="grid grid-cols-2 gap-3">
            {items.map((item, index) => (
                <Card
                    onClick={onClick}
                    key={index}
                    {...item}
                />
            ))}
        </div>
    );
};

export default CardGroup;