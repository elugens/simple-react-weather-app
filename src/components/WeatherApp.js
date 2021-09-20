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

  return (
    <div>
      <nav className=' bg-blue-600 px-4 p-4 mb-6 '>
        <p className='subpixel-antialiased text-white text-center flex items-center justify-center font-bold text-xl'>
          Weather Search
        </p>
      </nav>
      <div className='flex flex-col items-center justify-center'>
        <form
          className='container flex items-center justify-center'
          onSubmit={handleSubmit}
        >
          <input
            className='bg-white border-2 rounded-lg py-2 px-4 w-60 '
            ref={inputRef}
            value={searchValue}
            type='text'
            placeholder=' search by city or zip'
            onChange={handleChange}
            onBlur={() => {
              setTimeout(() => {
                setSuggestions([]);
              }, 300);
            }}
          />
          <button
            className='py-2.5 px-7 ml-2 text-white rounded-lg bg-blue-600 font-bold hover:bg-yellow-500'
            type='submit'
          >
            Search
          </button>
        </form>
        <div class='flex flex-col items-center justify-center absolute top-32 z-40'>
          {suggestions &&
            suggestions.map((suggestion, i) => (
              <div
                class='border-b-2 border-l-2 border-r-2 py-1 w-80 bg-white hover:bg-blue-50 cursor-pointer truncate'
                key={i}
                onClick={() => onSuggestHandler(suggestion.name)}
              >
                {suggestion.name}
              </div>
            ))}
        </div>

        {/* <div>{updatedValue}</div> */}
        <div class='p-5 relative z-10 w-80'>
          {/* Weather Listing */}
          {typeof posts.current != 'undefined' ? (
            <>
              <div className='flex flex-row justify-center'>
                <div className=' w-28 justify-center'>
                  <img
                    className='items-center justify-center object-fill h-28'
                    src={posts.current.condition.icon}
                    alt=''
                  />
                </div>
                <div className='flex flex-col p-4'>
                  <div>
                    <strong>City:</strong> {posts.location.name}
                  </div>
                  <div>
                    <strong>Temp:</strong> {posts.current.temp_f}&deg;F
                  </div>
                  <div>
                    <strong></strong> {posts.current.condition.text}
                  </div>
                </div>
              </div>

              <div>
                {forecast.length
                  ? forecast.map((day, index) => (
                      <div key={day.date}>
                        <div className='flex flex-row border-2'>
                          <div>
                            <img src={day.day.condition.icon} alt='' />
                          </div>
                          <div className='flex flex-col border-2 w-full'>
                            <strong>Date:</strong> {day.date}{' '}
                            <strong>Temp: </strong> {day.day.avgtemp_f}&deg;F
                          </div>
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
        <div className='pt-8'>
          <a
            target='_blank'
            rel='noreferrer'
            href='https://www.weatherapi.com/'
            title='Free Weather API'
          >
            <img
              src='//cdn.weatherapi.com/v4/images/weatherapi_logo.png'
              alt='Weather data by WeatherAPI.com'
              border='0'
            />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Weather;
