import Select from 'react-select';
import './PlaceTypesPicker.css'; // Asegúrate de tener estilos adecuados para el componente

const MultiSelect = ({ options, selectedValues, onChange }) => {
  const handleChange = (selectedOptions) => {
    const values = selectedOptions.map(option => option.value);
    console.log(values);
    onChange(values);
  };

  return (
    <Select
      isMulti
      options={options}
      value={options.filter(option => selectedValues.includes(option.value))}
      onChange={handleChange}
      className="multi-select"
      classNamePrefix="select"
    />
  );
};

const PlaceTypesPicker = ({ placeDetailsInfo, handlePlaceDetailsChange }) => {
  const types = ["Restaurante", "Bar", "Cafetería", "Panadería"]; // Ejemplo de tipos

  const typeOptions = types.map(type => ({ value: type, label: type }));

  return (
    <div className="form-group">
      <label htmlFor="type">Tipo de lugar</label>
      <MultiSelect
        options={typeOptions}
        selectedValues={placeDetailsInfo.type}
        onChange={(selected) => handlePlaceDetailsChange({ target: { name: 'type', value: selected.map(option => option) } })}
      />
    </div>
  );
};

export default PlaceTypesPicker;
