import './CharacteristicsPicker.css';

const CharacteristicsPicker = ({placeDetailsInfo, handleCharacteristicChange }) => {
    const characteristics = ["Parking", "Free Wifi", "Cover"];
 
    return (
    <div className="form-group characteristics-picker">
      {characteristics.map((characteristic, index) => (
        <div key={index} className="characteristic-item">
          <label className="checkbox-container">
            <input
              type="checkbox"
              name="characteristics"
              value={characteristic}
              checked={placeDetailsInfo.characteristics.includes(characteristic)}
              onChange={handleCharacteristicChange}
            />
            <span className="checkmark"></span>
            {characteristic}
          </label>
        </div>
      ))}
    </div>
  );
};

export default CharacteristicsPicker;
