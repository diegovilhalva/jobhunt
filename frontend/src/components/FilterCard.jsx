import React from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";

const filterData = [
  {
    filterType: "Location",
    array: ["London", "New York", "Tokyo", "Madrid", "Buenos Aires"],
  },
  {
    filterType: "Technology",
    array: ["Frontend Developer", "Backend Developer", "FullStack Developer"],
  },
  {
    filterType: "Salary",
    array: ["0-5000", "5000-10000", "Over 10000"],
  },
];

const FilterCard = () => {
  return (
    <div className="w-full bg-white p-4 rounded-md shadow-md border border-gray-200">
      <h1 className="font-bold text-lg mb-3">Filter Jobs</h1>
      <RadioGroup>
        {filterData.map((data, index) => (
          <div key={index} className="mb-5">
            <h2 className="font-semibold text-md mb-2">{data.filterType}</h2>
            {data.array.map((item, idx) => {
              const itemId = `id${index}-${idx}`;
              return (
                <div key={itemId} className="flex items-center space-x-2 my-2">
                  <RadioGroupItem value={item} id={itemId} />
                  <Label htmlFor={itemId}>{item}</Label>
                </div>
              );
            })}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterCard;
