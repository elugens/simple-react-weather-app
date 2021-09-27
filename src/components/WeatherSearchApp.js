import React from 'react';
import useWeather from '../hooks/useWeather';
import { format } from 'date-fns';

const getDay = (mydate) => {
  const day = new Date(mydate);
  const updateDate = format(day, 'eeee');
  console.log(updateDate);
  return updateDate;
};

const getLongDate = (mydate) => {
  const day = new Date(mydate);
  const updateLongDate = format(day, 'PPP');
  console.log(updateLongDate);
  return updateLongDate;
};

function Weather() {
  const {
    posts,
    forecast,
    searchValue,
    inputRef,
    suggestions,
    handleChange,
    handleClick,
    handleSubmit,
    onSuggestHandler,
    setSuggestions,
  } = useWeather();

  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='w-96'>
        <h1 className='flex-col items-center justify-center py-4 m-1 text-base font-bold text-center text-white'>
          WEATHER SEARCH
        </h1>
        <form
          className='flex flex-row items-center justify-center py-4 m-1'
          onSubmit={handleSubmit}
        >
          <input
            className='h-8 pb-1 pl-2 text-blue-900 bg-blue-100 rounded-lg shadow-md w-52 focus:bg-white focus:border-yellow-200 focus:outline-none focus:ring-2 focus:ring-blue-300'
            ref={inputRef}
            value={searchValue}
            type='text'
            placeholder=' search by city or zip'
            onClick={handleClick}
            onChange={handleChange}
            onBlur={() => {
              setTimeout(() => {
                setSuggestions([]);
              }, 300);
            }}
          />
          <button
            className='
              ml-2
              h-8
              w-20
              bg-yellow-400
              uppercase
              text-xs
              font-semibold
              shadow-md
              rounded-lg
              border-none
              hover:bg-yellow-500
              focus\:ring-1
            '
            type='submit'
          >
            Search
          </button>
        </form>
        {/* suggestions start */}
        <div className='flex flex-col items-center justify-center'>
          <div className='absolute z-40 border-2 border-gray-500 rounded-lg top-32'>
            {suggestions &&
              suggestions.map((suggestion, i) => (
                <div
                  className='py-1 truncate bg-white border-b-2 border-l-2 border-r-2 cursor-pointer w-80 hover:bg-blue-50'
                  key={i}
                  onClick={() => onSuggestHandler(suggestion.name)}
                >
                  {suggestion.name}
                </div>
              ))}
          </div>
        </div>
        {typeof posts.current != 'undefined' ? (
          <div className='relative z-10'>
            <p className='m-1 font-semibold text-center text-white uppercase'>
              currently {posts.current.condition.text} today
            </p>
            <div className='flex flex-row items-center justify-center m-1'>
              <img className='w-44' src={posts.current.condition.icon} alt='' />
              <div className='flex flex-col'>
                <p className='text-2xl font-bold text-yellow-400'>
                  {posts.current.temp_f}&deg; F
                </p>
                <div className='font-semibold text-white'>
                  <p>Wind: {posts.current.wind_mph}</p>
                  <p>Precip: {posts.current.precip_in} in</p>
                  <p>Pressure: {posts.current.pressure_in} in</p>
                </div>
              </div>
            </div>
            <p className='py-2 font-bold text-center text-blue-300 uppercase'>
              3-day weather forecast
            </p>
            {/* listing loop  */}
            {forecast.length
              ? forecast.map((day, index) => (
                  <div
                    key={day.date}
                    className='flex flex-row justify-center pt-2 m-1'
                  >
                    <div className='pl-3'>
                      <p className='pt-1 font-bold text-white uppercase'>
                        {getDay(day.date)}
                      </p>
                      <p className='text-sm font-semibold text-blue-300'>
                        {getLongDate(day.date)}
                      </p>
                    </div>
                    <div className='flex ml-9 flew-row'>
                      <img src={day.day.condition.icon} alt='' />
                      <p className='p-4 font-bold text-yellow-400 align-middle'>
                        {day.day.avgtemp_f}&deg; F
                      </p>
                    </div>
                  </div>
                ))
              : null}
          </div>
        ) : (
          <div className='m-1 font-semibold text-center text-white uppercase'>
            Start Your Search
          </div>
        )}

        <div className='text-sm font-bold text-center text-white p-7'>
          Powered by{' '}
          <a href='https://www.weatherapi.com/' title='Free Weather API'>
            WeatherAPI.com
          </a>
        </div>
      </div>
    </div>
  );
}

export default Weather;
