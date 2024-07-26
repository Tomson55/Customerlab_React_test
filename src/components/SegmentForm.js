import { useState } from "react";
import "./SegmentForm.css";

const schemaOptions = [
  { value: "first_name", label: "First Name" },
  { value: "last_name", label: "Last Name" },
  { value: "gender", label: "Gender" },
  { value: "age", label: "Age" },
  { value: "account_name", label: "Account Name" },
  { value: "city", label: "City" },
  { value: "state", label: "State" },
];

const SegmentForm = ({ closePopup }) => {
  const [segmentName, setSegmentName] = useState("");
  const [selectedSchemas, setSelectedSchemas] = useState([]);
  const [availableOptions, setAvailableOptions] = useState(schemaOptions);
  const [selectedOption, setSelectedOption] = useState("");

  const handleAddSchema = () => {
    if (selectedOption) {
      const option = availableOptions.find(
        (opt) => opt.value === selectedOption
      );
      setSelectedSchemas([...selectedSchemas, option]);
      setAvailableOptions(
        availableOptions.filter((option) => option.value !== selectedOption)
      );
      setSelectedOption("");
    }
  };

  const handleSaveSegment = () => {
    const data = {
      segment_name: segmentName,
      schema: selectedSchemas.map((schema) => ({
        [schema.value]: schema.label,
      })),
    };
    console.log(data);

    fetch("https://webhook.site/0cf5476b-63cd-4c34-b38e-2660cf3c4d7a", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    closePopup();
  };

  return (
    <div className="form-container">
      <div className="form-header">
        <h2>Save Segment</h2>
      </div>
      <div className="form-group">
        <label>Segment Name</label>
        <input
          type="text"
          value={segmentName}
          onChange={(e) => setSegmentName(e.target.value)}
        />
      </div>
      <div className="selected-schemas">
        {selectedSchemas.map((schema, index) => (
          <div key={index} className="form-group">
            <label>{schema.label}</label>
            <select
              value={schema.value}
              onChange={(e) => {
                const value = e.target.value;
                const newSelectedSchemas = [...selectedSchemas];
                newSelectedSchemas[index] = availableOptions.find(
                  (option) => option.value === value
                );
                setSelectedSchemas(newSelectedSchemas);
              }}
            >
              <option value={schema.value}>{schema.label}</option>
              {availableOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
      <div className="form-group">
        <label>Add schema to segment</label>
        <select
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
        >
          <option value="" disabled>
            Select an option
          </option>
          {availableOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <button onClick={handleAddSchema} className="add-schema-button">
        + Add new schema
      </button>
      <button onClick={handleSaveSegment} className="save-segment-button">
        Save Segment
      </button>
    </div>
  );
};

export default SegmentForm;
