import React, { useState } from 'react';

interface Option {
  value: string;
  label: string;
}

const TypeScriptAIMenu: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const options: Option[] = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  const handleOptionChange = (option: Option) => {
    setSelectedOption(option);
  };

  return (
    <div>
      <select value={selectedOption?.value} onChange={(e) => {
        const selectedValue = e.target.value;
        const option = options.find(o => o.value === selectedValue);
        if (option) {
          handleOptionChange(option);
        }
      }}>
        <option value="">Select an option</option>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {selectedOption && (
        <p>Selected option: {selectedOption.label}</p>
      )}
    </div>
  );
};

export default TypeScriptAIMenu;