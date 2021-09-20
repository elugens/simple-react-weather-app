import React from 'react';
import useWeather from '../hooks/useWeather';

function Weather() {
  const {
    posts,
    forecast,
    searchValue,
    inputRef,
    suggestions,
    handleChange,
    handleSubmit,
    onSuggestHandler,
    setSuggestions,
  } = useWeather();

  const styles = {
    cursor: 'pointer',
    fontSize: '12px',
    padding: '10px',
    backgroundColor: 'white',
    width: 250,
    borderRight: '1px',
    borderLeft: '1px',
    borderBottom: '1px',
    borderStyle: 'solid',
  };

  return (
    <div style={{ height: 815 }}>
      <h2>Weather Search</h2>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            value={searchValue}
            type='text'
            placeholder=' search by city or zip'
            onChange={handleChange}
            onBlur={() => {
              setTimeout(() => {
                setSuggestions([]);
              }, 3000);
            }}
          />
          <button
            style={{
              marginLeft: '3px',
              backgroundColor: 'orange',
              borderRadius: '5px',
              border: '1px',
              borderStyle: 'solid',
            }}
            type='submit'
          >
            Search
          </button>
          <div>
            {suggestions &&
              suggestions.map((suggestion, i) => (
                <div
                  style={styles}
                  key={i}
                  onClick={() => onSuggestHandler(suggestion.name)}
                >
                  {suggestion.name}
                </div>
              ))}
          </div>

          {/* <div>{updatedValue}</div> */}
          <div style={{ marginTop: '10px' }}>
            {/* Weather Listing */}
            {typeof posts.current != 'undefined' ? (
              <>
                <div>
                  <img
                    style={{ width: 100, height: 100 }}
                    src={posts.current.condition.icon}
                    alt=''
                  />
                </div>
                <div>
                  <div>
                    <strong>City:</strong> {posts.location.name}
                  </div>
                  <div>
                    <strong>Temp:</strong> {posts.current.temp_f}&deg;F
                  </div>
                  <div>
                    <strong>Condition:</strong> {posts.current.condition.text}
                  </div>
                </div>
                <div>
                  {forecast.length
                    ? forecast.map((day, index) => (
                        <div key={day.date}>
                          <div>
                            <div>
                              <img src={day.day.condition.icon} alt='' />
                            </div>
                            <strong>Date:</strong> {day.date}{' '}
                            <strong>Temp: </strong> {day.day.avgtemp_f}&deg;F
                          </div>
                        </div>
                      ))
                    : null}
                </div>
              </>
            ) : (
              <div>Start Your Search</div>
            )}
          </div>
          <div style={{ margin: '80px' }}>
            <a href='https://www.weatherapi.com/' title='Free Weather API'>
              <img
                src='//cdn.weatherapi.com/v4/images/weatherapi_logo.png'
                alt='Weather data by WeatherAPI.com'
                border='0'
              />
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Weather;
