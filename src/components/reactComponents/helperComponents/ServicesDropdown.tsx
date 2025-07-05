import React, { useState, useEffect } from 'react';
import { Select, Input } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';

interface ServiceOption {
    value: string;
    label: string;
}

interface ServicesDropdownProps {
    selectedServices: string[];
    onServicesChange: (services: string[]) => void;
    otherService: string;
    onOtherServiceChange: (value: string) => void;
    placeholder?: string;
    className?: string;
}

const ServicesDropdown: React.FC<ServicesDropdownProps> = ({
                                                               selectedServices,
                                                               onServicesChange,
                                                               otherService,
                                                               onOtherServiceChange,
                                                               placeholder = "Select services",
                                                               className = ""
                                                           }) => {
    const [isOtherSelected, setIsOtherSelected] = useState(false);

    const baseServices: ServiceOption[] = [
        { value: 'consulting', label: 'Consulting' },
        { value: 'development', label: 'Development' },
        { value: 'design', label: 'Design' },
        { value: 'marketing', label: 'Marketing' },
    ];

    useEffect(() => {
        setIsOtherSelected(selectedServices.includes('other'));
    }, [selectedServices]);

    const getSelectOptions = () => {
        const options = [...baseServices];

        options.push({ value: 'other', label: 'Other' });

        if (otherService && otherService.trim() && selectedServices.includes('other')) {
            options.push({ value: `other_custom_${otherService}`, label: otherService });
        }

        return options;
    };

    const handleServiceChange = (values: string[]) => {
        const hasOtherSelected = values.includes('other');

        const cleanValues = values.filter(val =>
            !val.startsWith('other_custom_') &&
            (val !== 'other' || hasOtherSelected)
        );

        onServicesChange(cleanValues);
        if (!hasOtherSelected && otherService) {
            onOtherServiceChange('');
        }
    };

    const handleOtherInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onOtherServiceChange(e.target.value);
    };

    const handleOtherInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        e.stopPropagation();
    };

    const dropdownRender = (menu: React.ReactElement) => (
        <div>
            {menu}
            {isOtherSelected && (
                <div style={{
                    padding: '8px 12px',
                    borderTop: '1px solid #f0f0f0',
                    backgroundColor: '#fafafa'
                }}>
                    <Input
                        placeholder="Please specify other service"
                        value={otherService}
                        onChange={handleOtherInputChange}
                        onKeyDown={handleOtherInputKeyDown}
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            fontSize: '16px',
                            border: '1px solid #d9d9d9',
                            borderRadius: '8px',
                        }}
                        autoFocus
                    />
                </div>
            )}
        </div>
    );

    return (
        <div className={`services-dropdown h-full ${className}`}>
            <Select
                showSearch={false}
                mode="multiple"
                placeholder={placeholder}
                value={selectedServices}
                onChange={handleServiceChange}
                style={{ width: '100%' }}
                suffixIcon={<CaretDownOutlined />}
                maxTagCount="responsive"
                className="custom-select text-[14px] md:text-[16px] h-full"
                options={getSelectOptions()}
                popupRender={dropdownRender}
                tagRender={({ label, value, onClose }) => {
                    const displayLabel = value === 'other' && otherService && otherService.trim()
                        ? otherService
                        : label;

                    return (
                        <span
                            style={{
                                display: 'inline-block',
                                padding: '2px 8px',
                                margin: '2px',
                                backgroundColor: '#f0f0f0',
                                borderRadius: '4px',
                                fontSize: '14px',
                                fontFamily:'inherit',
                                color: '#666',
                                border: '1px solid #d9d9d9'
                            }}
                        >
                            {displayLabel}
                            <span
                                onClick={onClose}
                                style={{
                                    marginLeft: '4px',
                                    cursor: 'pointer',
                                    color: '#999'
                                }}
                            >
                                ×
                            </span>
                        </span>
                    );
                }}
            />
        </div>
    );
};

export default ServicesDropdown;