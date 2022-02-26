import DatePicker from "react-datepicker";

function Datepicker({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  roomBanDate,
  momentToday,
}) {
  return (
    <div className="form-field">
      <label className="form-label">Dates</label>
      <div className="form-dates-wrapper">
        <div className="form-dates-input-left">
          <DatePicker
            selected={startDate}
            onChange={(date) => {
              if (endDate < startDate) {
                setStartDate(date);
                setEndDate(null);
              }
              if (endDate >= startDate) {
                setStartDate(date);
                setEndDate(null);
              } else {
                setStartDate(date);
              }
            }}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            minDate={new Date(momentToday)}
            excludeDates={roomBanDate}
            dateFormat="yyyy-MM-dd"
            placeholderText="Check in"
            className="form-dates-input"
          />
        </div>
        →
        <div className="form-dates-input-right">
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            excludeDates={roomBanDate}
            dateFormat="yyyy-MM-dd"
            placeholderText="Check out"
            className="form-dates-input"
          />
        </div>
      </div>
    </div>
  );
}

export default Datepicker;
