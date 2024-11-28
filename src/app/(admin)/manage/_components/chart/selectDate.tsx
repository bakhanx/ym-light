import React from "react";

type SelectDateProps = {
  year: number;
  month: number;
  onDateChange: (year: number, month: number) => void;
};

const SelectDate = ({ year, month, onDateChange }: SelectDateProps) => {
  const handleDateChange = (newYear: number, newMonth: number) => {
    onDateChange(newYear, newMonth);
  };

  return (
    <div>
      <label>Year: </label>
      <select
        value={year}
        onChange={(e) => handleDateChange(parseInt(e.target.value), month)}
      >
        {[2023, 2024].map((_year) => (
          <option key={_year} value={_year}>
            {_year}
          </option>
        ))}
      </select>
      <label>Month: </label>
      <select
        value={month}
        onChange={(e) => handleDateChange(year, parseInt(e.target.value))}
      >
        {Array.from({ length: 12 }, (_, i) => i + 1).map((_month) => (
          <option key={_month} value={_month}>
            {_month}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectDate;
