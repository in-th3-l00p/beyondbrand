'use client'
import {useState} from 'react';
import * as Icon from 'react-feather';

const Dropdown = () => {
    const [selected, setSelected] = useState('Tom Cook');
    const [isOpen, setIsOpen] = useState(false);

    const options = [
        'Small Business',
        'Large Company',
        'Other',
    ];

    return (
        <div className="relative md:w-1/3">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-md w-full text-left flex items-center justify-between"
            >
                {selected}
                <span className="float-right">
                    <Icon.ChevronDown className="w-4 h-4"/>
                </span>
            </button>
            {isOpen && (
                <ul className="absolute mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 w-full overflow-auto">
                    {options.map(option => (
                        <li
                            key={option}
                            onClick={() => {
                                setSelected(option);
                                setIsOpen(false);
                            }}
                            className={`cursor-pointer flex justify-between items-center py-2 px-4 hover:bg-dark-cyan hover:text-white ${selected === option ? 'bg-dark-cyan text-white' : 'text-gray-700'}`}
                        >
                            {option}
                            {selected === option && (
                                <span className="float-right">
                                   <Icon.Check className="w-4 h-4"/>
                                 </span>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Dropdown;
