import React, { useState } from 'react';
import { FaCaretDown } from 'react-icons/fa';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Input } from 'reactstrap';

const MultiSelectDropdown = ({ options, selectedOptions, onChange }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => setDropdownOpen(prevState => !prevState);

    const handleCheckboxChange = (event) => {
        const value = event.target.value;
        const isChecked = event.target.checked;
        onChange(value, isChecked);
    };

    return (
        <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
            <DropdownToggle style={{
                width: "100%",
                borderRadius: "4px",
                backgroundColor: "#ffffff",
                border: "1px solid #ced4da",
                boxShadow: "none",
                textAlign: 'right',
            }}>
                <FaCaretDown color="#54606C" size={18} />
            </DropdownToggle>
            <DropdownMenu style={{ width: "100%" }}>
                {options.map(option => (
                    <DropdownItem key={option} toggle={false}>
                        <Input
                            type="checkbox"
                            value={option}
                            checked={selectedOptions.includes(option)}
                            onChange={handleCheckboxChange}
                            style={{ cursor: 'pointer' }}
                        />{' '}
                        <span className="fw-semibold ps-2">{option}</span>
                    </DropdownItem>
                ))}
            </DropdownMenu>
        </Dropdown>
    );
};

export default MultiSelectDropdown;
