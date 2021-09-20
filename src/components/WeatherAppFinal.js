import React from 'react';
import useWeather from '../hooks/useWeather';
import { format } from 'date-fns';

const getDay = (mydate) => {
  // const newDate = mydate.split('-').join(', ');
  const day = new Date(mydate);
  const updateDate = format(day, 'eeee');
  console.log(updateDate);
  return updateDate;
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
    <div className='flex flex-col items-center justify-center '>
      <div className='w-96'>
        <h1
          className='
            flex-col
            items-center
            justify-center
            text-base text-center text-white
            font-bold
            py-4
            m-1           
          '
        >
          WEATHER SEARCH
        </h1>
        <form
          className='
            flex flex-row
            items-center
            justify-center
            py-4
            m-1
          '
          onSubmit={handleSubmit}
        >
          <input
            class='
              h-8
              w-52
              pl-2
              pb-1
              rounded-lg
              text-blue-900
              bg-blue-100
              focus:bg-white
              focus:border-yellow-200
              focus:outline-none
              focus:ring-2
              focus:ring-blue-300
              shadow-md
            '
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
          <div className='border-2 rounded-lg border-gray-500 absolute top-32 z-40'>
            {suggestions &&
              suggestions.map((suggestion, i) => (
                <div
                  className='border-b-2 border-l-2 border-r-2 py-1 w-80 bg-white hover:bg-blue-50 cursor-pointer truncate'
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
            <p
              className='
            text-center text-white
            font-semibold
            uppercase
            m-1
          '
            >
              currently {posts.current.condition.text} today
            </p>
            <div
              className='
            m-1
            flex flex-row
            items-center
            justify-center
          '
            >
              <img className='w-56' src={posts.current.condition.icon} alt='' />
              <div className='flex flex-col'>
                <p className='text-2xl text-yellow-400 font-bold'>
                  {posts.current.temp_f}&deg; F
                </p>
                <div className='text-white font-semibold'>
                  <p>Wind: {posts.current.wind_mph}</p>
                  <p>Precip: {posts.current.precip_in} in</p>
                  <p>Pressure: {posts.current.pressure_in} in</p>
                </div>
              </div>
            </div>
            <p className='py-2 text-center text-blue-300 uppercase font-bold'>
              3-day weather forecast
            </p>
            {/* listing loop  */}
            {forecast.length
              ? forecast.map((day, index) => (
                  <div
                    key={day.date}
                    className='m-1 pt-2 justify-center flex flex-row'
                  >
                    <div className=' mt-2 pt-1'>
                      <p className='pt-1 text-white font-bold uppercase'>
                        {getDay(day.date)}
                      </p>
                      <p className='text-blue-300 font-semibold'>{day.date}</p>
                    </div>
                    <div className='ml-28 flex flew-row'>
                      <img src={day.day.condition.icon} alt='' />
                      <p
                        className='
                        p-4
                text-yellow-400
                font-bold
                align-middle
              '
                      >
                        {day.day.avgtemp_f}&deg; F
                      </p>
                    </div>
                  </div>
                ))
              : null}
          </div>
        ) : (
          <div
            className='m-1 text-center text-white
            font-semibold
            uppercase'
          >
            Start Your Search
          </div>
        )}

        <div className='p-7 text-sm text-center text-white font-bold'>
          Powered by
          <a
            target='_blank'
            rel='noreferrer'
            href='https://www.weatherapi.com/'
            title='Free Weather API'
          >
            - WeatherAPI.com
          </a>
        </div>
      </div>
    </div>
  );
}

export default Weather;
