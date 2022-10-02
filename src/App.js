import './App.css';
import { useState , useEffect } from 'react';
import { CircularProgressbar , buildStyles , CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

// importing all logos used in applications
import Search from './assets/search.svg';
import Location from './assets/location.svg';
import Logo from './assets/logo.png';
import Sunrise from './assets/sunrise.png'
import Sunset from './assets/sunset.png'
import Moonrise from './assets/moonrise.png'
import Moonset from './assets/moonset.png'

// Importing background images for different weather conditions
import Cloudy from './assets/windy.jpg';
import Mist from './assets/mist.jpg';
import Night from './assets/night.jpg';
import NightCloud from './assets/nightcloud.jpg';
import NightRain from './assets/nightrain.jpg';
import Partially from './assets/partially.jpg';
import Snowy from './assets/snow.jpg';
import Sunny from './assets/sunny.jpg';
import Thunderstorm from './assets/thunderstorm.jpg';
import Windy from './assets/windy.jpg';
import Rainy from './assets/rainy.jpg';


function App() {

  const [place , setPlace] = useState('New Delhi');
  const [placeInfo, setPlaceInfo] = useState({});

  useEffect(() => {
    handleFetch();
    handleLocationFetch();
    
    // eslint-disable-next-line
  },[]);
// for fetching location information
  const handleLocationFetch = () => {
    fetch("https://ipinfo.io/json?token=6ea71bc17590d9").then(
  (response) => response.json()
).then(
  (jsonResponse) => {
    setPlace(jsonResponse.city)
    handleFetch();
  })
  }
// For fetching weather and forecast information using api
  const handleFetch = () => {
    fetch(`http://api.weatherapi.com/v1/forecast.json?key=794d31f389a84da6a7251334220210&q=${place}&days=1&aqi=no&alerts=no`)
    .then((response) => response.json())
    .then((data) => {setPlaceInfo({
      name : data.location.name,
      region : data.location.region,
      country : data.location.country,
      time : data.location.localtime,
      current : {
        current_c : data.current.temp_c,
        current_f : data.current.temp_f,
        feelslike_c : data.current.feelslike_c,
        feelslike_f : data.current.feelslike_f,
        wind_kph : data.current.wind_kph,
        wind_mph : data.current.wind_mph,
        vis_km : data.current.vis_km,
        vis_miles : data.current.vis_miles,
        humidity : data.current.humidity,
        last_updated : data.current.last_updated},
        today : {
          sunrise : data.forecast.forecastday[0].astro.sunrise,
          sunset : data.forecast.forecastday[0].astro.sunset,
          moonrise : data.forecast.forecastday[0].astro.moonrise,
          moonset : data.forecast.forecastday[0].astro.moonset,
          maxtemp_c : data.forecast.forecastday[0].day.maxtemp_c,
          maxtemp_f : data.forecast.forecastday[0].day.maxtemp_f,
          mintemp_c : data.forecast.forecastday[0].day.mintemp_c,
          mintemp_f : data.forecast.forecastday[0].day.mintemp_f,
        },
        condition : data.current.condition.text,
        icon : data.current.condition.icon,
        uv : data.forecast.forecastday[0].day.uv,
        precip : data.forecast.forecastday[0].day.totalprecip_mm,
        avgHumidity : data.forecast.forecastday[0].day.avghumidity,
      })


    
      setCurrentTemp(data.current?.temp_c);
      setFeelsLike(data.current?.feelslike_c);
      setWind(data.current?.wind_kph);
      setVis(data.current?.vis_km);
      setMax(data.forecast.forecastday[0].day.maxtemp_c);
      setMin(data.forecast.forecastday[0].day.mintemp_c);
      let uvCond = data.forecast.forecastday[0].day.uv<3 ? "Low" 
      : data.forecast.forecastday[0].day.uv < 6 && data.forecast.forecastday[0].day.uv >2 ? "Moderate"
      : data.forecast.forecastday[0].day.uv < 8 && data.forecast.forecastday[0].day.uv >5 ? "High"
      : data.forecast.forecastday[0].day.uv <11 && data.forecast.forecastday[0].day.uv > 7 ?"Very High"
      : "Extreme"
      setUvCondition(uvCond);
    }
    );
  }
  
  const [currentTemp , setCurrentTemp] = useState(placeInfo.current?.current_c);
  const [feelslike , setFeelsLike] = useState(placeInfo.current?.feelslike_c);
  const [wind , setWind] = useState(placeInfo.current?.wind_kph);
  const [vis , setVis] = useState(placeInfo.current?.vis_km);
  const [max , setMax] = useState(placeInfo.today?.maxtemp_c);
  const [min , setMin] = useState(placeInfo.today?.mintemp_c);
  const [cActive , setCActive] = useState('active');
  const [fActive  , setfActive] = useState('not-active');
  const [unit , setUnit] = useState('km');


  // For changing to C everywhere
  const  changeToC = () => {
    setCurrentTemp(placeInfo.current?.current_c);
    setFeelsLike(placeInfo.current?.feelslike_c);
    setWind(placeInfo.current?.wind_kph);
    setVis(placeInfo.current?.vis_km);
    setMax(placeInfo.today?.maxtemp_c);
    setMin(placeInfo.today?.mintemp_c);
    setCActive('active');
    setfActive('not-active');
    setUnit('km');
    

 
  }
  // For changing C to F everywhere 
  const  changeToF = () => {
    setCurrentTemp(placeInfo.current?.current_f);
    setFeelsLike(placeInfo.current?.feelslike_f);
    setWind(placeInfo.current?.wind_mph);
    setVis(placeInfo.current?.vis_miles);
    setMax(placeInfo.today?.maxtemp_f);
    setMin(placeInfo.today?.mintemp_f);
    setCActive('not-active');
    setfActive('active');
    setUnit('miles')
  }

  const [uvCondition,setUvCondition] = useState('Normal');

  // Getting year for footer
  let date = new Date();
  let year = date.getFullYear()


// Enables Search on pressing enter
  const handleKeyPress = (e) => {
    if(e.key  === "Enter"){
      handleFetch();
    }
  };
  
  return (
    <div
      className="app"
      style={
        placeInfo.condition?.toLowerCase() === "sunny"
        ? { backgroundImage: `url(${Sunny})` }
          :placeInfo.condition?.toLowerCase() === "clear" && (placeInfo.current?.last_updated.slice(11,13) <6 || placeInfo.current?.last_updated.slice(11,13) >18) 
          ? { backgroundImage: `url(${Night})` }
          :placeInfo.condition?.toLowerCase() === "clear"
          ? { backgroundImage: `url(${Sunny})` }
          : (placeInfo.condition?.toLowerCase().includes("cloudy") || placeInfo.condition?.toLowerCase().includes("overcast"))
          ? { backgroundImage: `url(${Cloudy})` }
          : ( placeInfo.condition?.toLowerCase().includes("cloudy") || placeInfo.condition?.toLowerCase().includes("overcast"))  && (placeInfo.current?.last_updated.slice(11,13) <6 || placeInfo.current?.last_updated.slice(11,13) >18)  
          ? { backgroundImage: `url(${NightCloud})` }
          : placeInfo.condition?.toLowerCase().includes("rain") 
          ? { backgroundImage: `url(${Rainy})` }
          : placeInfo.condition?.toLowerCase().includes("rain") && (placeInfo.current?.last_updated.slice(11,13) <6 || placeInfo.current?.last_updated.slice(11,13) >18 ) 
          ? { backgroundImage: `url(${NightRain})` }
          : placeInfo.condition?.toLowerCase().includes("mist") || placeInfo.condition?.toLowerCase().includes("fog")
          ? { backgroundImage: `url(${Mist})` }
          : placeInfo.condition?.toLowerCase().includes("partly") || placeInfo.condition?.toLowerCase().includes("partially")
          ? { backgroundImage: `url(${Partially})` }
          : placeInfo.condition?.toLowerCase().includes("snow") || placeInfo.condition?.toLowerCase().includes("hail")
          ? { backgroundImage: `url(${Snowy})` }
          : placeInfo.condition?.toLowerCase().includes("thunder") || placeInfo.condition?.toLowerCase().includes("lightning")||placeInfo.condition?.toLowerCase().includes("storm")
          ? { backgroundImage: `url(${Thunderstorm})` }
          : placeInfo.condition?.toLowerCase().includes("wind")
          ? { backgroundImage: `url(${Windy})` }
          : placeInfo.current?.last_updated.slice(11,13) <6 || placeInfo.current?.last_updated.slice(11,13) >18
          ? { backgroundImage: `url(${Night})` }
          : { backgroundImage: `url(${Sunny})` }
      }>

     <nav>
      <a href="/">

      <span className="webLogoAndName">
      <img src={Logo} alt="Website Logo Here" className="web-logo "/>
      <p className="web-name ">Weather</p>
      </span>
      </a>
      <div className="search-box">
      <img className="location" src={Location} alt="Search By Location" onClick={handleLocationFetch} />
      <input className="search-input" type="text" value={place} onKeyPress={handleKeyPress} onChange = { (e) => setPlace(e.target.value) }/>
      <img src={Search} alt="Search" width="" height="" className="search-button" onClick={handleFetch}/>
      </div>

     </nav>


      <div className="weather-container">

        <div className='place-details'>
          <h2>{placeInfo.name},</h2><h3>{placeInfo.region}</h3>
        </div>

        <div className="current-temp">

          <div className="logoAndTemp">
          <img src={placeInfo.icon} alt="img here" />
          <h1>{currentTemp} </h1>
          <h1>&deg;</h1>
          </div>

          <div className="cOrF">
            <div className={cActive} onClick={changeToC}>C</div>
            <div className={fActive} onClick={changeToF}>F</div>
          </div>


        </div>
          <div className="condition-container">
            <p>{placeInfo.condition}</p>
          </div>
          <div className="time-cont">
            <p>Last updated on {placeInfo.current?.last_updated.slice(11)}.</p>
          </div>
          <div className="extra-details">
            <div className="forDiv">
            <p>Feels like {feelslike}&deg;</p>
            <p>Wind {wind} {unit}/h</p>
            </div>
            <div className="forDiv">
            <p>Visibility {vis} {unit}</p>
            <p>Humidity {placeInfo.current?.humidity}%</p>
            </div>
          </div>
          <br />
            <h3 className="tittle-day-details">Day Details</h3>
          <div className="day-details">
            <div className="highAndLow">
              <h4>Day</h4>
              <p>There will be mostly sunny skies.The high will be {max}&deg;.</p>
              <h4>Night</h4>
              <p>The skies will be clear. The low will be {min}&deg;.</p>
            </div>
            <div className="sun">
              <h4>SUNRISE</h4>
              <div className="sunrise">
                <img src={Sunrise} alt=""  className="icon"/> {placeInfo.today?.sunrise}
              </div>
              <h4>SUNSET</h4>
              <div className="sunset">
                <img src={Sunset} alt=""  className="icon"/> {placeInfo.today?.sunset}
              </div>
            </div>
            <div className="moon">
            <h4>MOONRISE</h4>
              <div className="moonrise">
                <img src={Moonrise} alt=""  className="icon"/> {placeInfo.today?.moonrise}
              </div>
              <h4>MOONSET</h4>
              <div className="moonset">
                <img src={Moonset} alt=""  className="icon"/> {placeInfo.today?.moonset}
              </div>
              
            </div>
          </div>
            <div className="graphs">

              <div className="precip">
                <h4>Precipitation</h4>
              <div className="newDiv">
              <div className=" circ">
                <CircularProgressbar  value={placeInfo.precip} text={`${placeInfo.precip} mm`} 
                styles={buildStyles({
                  textColor:'white',
                  pathColor :'#69EAFF',
                  textSize:'14px'   
                })}
                />
              </div>
              </div>
              </div>

              <div className="uv">
                <h4>UV Index</h4>
              <div className="newDiv">
              <div className=" circ">
              <CircularProgressbarWithChildren value={placeInfo.uv} maxValue={12} styles={buildStyles({
                  textColor:'white',
                  pathColor :'#69EAFF',
                  textSize:'14px'  
                })}>
                <p className="CircularProgressbar-text uv-index-sizes">{placeInfo.uv}</p>
                <p className="CircularProgressbar-text uv-index-indicator">{uvCondition}</p>
              </CircularProgressbarWithChildren>  
              </div>
              </div>
              </div>

              <div className="humidity">
                <h4>Humidity</h4>
                <div className="newDiv">
              <div className=" circ" >
                <CircularProgressbar value={placeInfo.avgHumidity} text={`${placeInfo.avgHumidity}%`} styles={buildStyles({
                  textColor:'white',
                  pathColor :'#69EAFF',
                  textSize:'14px',   
                })}/>
              </div>
              </div>
              </div>

            </div>

      </div>
      <footer className="footer">
        <p>Copyright &copy; {year} <a href="https://vivekchaprana.netlify.app/" rel="noreferrer"  target="_blank">Vivek Chaprana</a>. All Rights Reserved. </p>
      </footer>



    </div>
  );
}

export default App;
