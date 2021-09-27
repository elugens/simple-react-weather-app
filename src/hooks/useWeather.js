import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

function useWeather() {
  const [searchValue, setSearchValue] = useState('');
  const [updatedValue, setUpdatedValue] = useState('');

  const [cityLocation, setCityLocation] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  const { REACT_APP_WEATHER_KEY, REACT_APP_FORECAST_URL } = process.env;

  useEffect(() => {
    const loadCityLocation = async () => {
      await axios
        .get(
          `https://api.weatherapi.com/v1/search.json?key=${REACT_APP_WEATHER_KEY}&q=${searchValue}
`
        )
        .then((response) => {
          //   console.log(response.data);
          setCityLocation(response.data);
        })
        .catch((error) => {
          if (error.response) {
            console.log('Error: ' + error.message);
          }
        });
    };
    loadCityLocation();
  }, [REACT_APP_WEATHER_KEY, searchValue]);

  const [posts, setPosts] = useState({});
  const inputRef = useRef(null);

  const forecast = posts?.forecast?.forecastday;

  const handleChange = (e) => {
    let matches = [];
    const { value } = e.target;
    if (cityLocation.length > 0) {
      matches = cityLocation.filter((city) => {
        const regex = new RegExp(`${value}`, 'gi');
        return city.name.match(regex);
      });
    }
    // console.log('matches', matches);
    setSuggestions(matches);
    setSearchValue(value);
  };

  const onSuggestHandler = (searchValue) => {
    // console.log(searchValue);
    setSearchValue(searchValue);
    setSuggestions([]);
  };

  const handleClick = () => {
    setUpdatedValue(searchValue);
    setSearchValue('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const getWeather = () => {
      axios
        .get(
          `${REACT_APP_FORECAST_URL}key=${REACT_APP_WEATHER_KEY}&q=${searchValue}&days=5&aqi=no&alerts=no`
        )
        .then((res) => {
          console.log(res);

          setPosts(res.data);
        })
        .catch((error) => {
          if (error.response) {
            console.log('Error: ' + error.message);
          }
        });
    };
    getWeather();
  };

  useEffect(() => {
    // focus the input element
    inputRef.current.focus();
  }, []);

  return {
    posts,
    forecast,
    searchValue,
    updatedValue,
    inputRef,
    suggestions,
    handleChange,
    handleClick,
    handleSubmit,
    onSuggestHandler,
    setSuggestions,
  };
}

export default useWeather;
