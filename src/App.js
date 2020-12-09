// import logo from './logo.svg';
import { useEffect, useState } from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional
import 'tippy.js/animations/scale-subtle.css';
import 'tippy.js/themes/translucent.css';
import './App.css';

function App() {

  const [Items, setItems] = useState([]);
  const [Country, setCountry] = useState("");
  const [Capital, setCapital] = useState("");
  const [Currency, setCurrency] = useState("");
  const [Language, setLanguage] = useState("");

  useEffect(() => {
    fetch("https://restcountries.eu/rest/v2/all")
      .then(response => response.json())
      .then(data => setItems(data));
  }, []);

  function onMouseOverHandler(item) {
    console.log(item);
    setCountry(item.name);
    setCapital(item.capital);
    setCurrency(item.currencies[0].name);
    setLanguage(item.languages[0].name);
  }

  return (
    <div className="App">
      <h1>Flags and Countries</h1>
      <p><mark>&nbsp;Hover over icons to see details like Country name, Capital etc.&nbsp;</mark></p>

      
        <div id="flag-container">
          {(Items.map((item) =>
            <Tippy 
            animation="scale-subtle" 
            theme="translucent" 
            content={<span>
                <strong>Country</strong>: {Country}<br />
                <strong>Capital</strong>: {Capital}<br />
                <strong>Currency</strong>: {Currency}<br />
                <strong>Language</strong>: {Language}
            </span>}>
            <img
              className="grow"
              src={item.flag}
              onMouseOver={() => onMouseOverHandler(item)}
            />
            </Tippy>
          ))}
        </div>
      
    </div>
  );
}

export default App;
