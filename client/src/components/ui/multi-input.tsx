import { useState, KeyboardEvent } from "react";
import { Input } from "./input";
import { X } from "lucide-react";

interface MultiInputProps {
  name: string;
  id: string;
  setStatuses: (statuses: string[]) => void;
}

export const MultiInput = ({ name, id, setStatuses }: MultiInputProps) => {
  const [values, setValues] = useState<string[]>(["to do", "in progress", "done", ""]);

  const updateValues = (newValues: string[]) => {
    setValues(newValues);
    setStatuses(newValues.filter(value => value.trim() !== ""));  
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const newValues = [...values];
      if (values[index].trim() !== "") {
        newValues.push("");
        updateValues(newValues);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newValues = [...values];
    newValues[index] = e.target.value;
    updateValues(newValues);
  };

  const handleDelete = (index: number) => {
    const newValues = values.filter((_, i) => i !== index);
    updateValues(newValues);
  };

  return (
    <div className="flex flex-wrap items-center">
      {values.slice(0, -1).map((value, index) => (
        <Badge key={index} value={value} onDelete={() => handleDelete(index)} />
      ))}
      <Input
        placeholder="Status"
        name={name}
        id={id}
        value={values[values.length - 1]}
        onChange={(e) => handleChange(e, values.length - 1)}
        onKeyPress={(e) => handleKeyPress(e, values.length - 1)}
      />
    </div>
  );
};

const Badge = ({ value, onDelete }: { value: string; onDelete: () => void }) => {
  return (
    <div className="flex items-center m-1 p-1 bg-gray-200 rounded">
      <div className="mr-2">{value}</div>
      <button onClick={onDelete} className="text-red-500" type="button"><X className="text-black" /></button>
    </div>
  );
};
