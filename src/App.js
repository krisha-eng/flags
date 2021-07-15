// import logo from './logo.svg';
import { useEffect, useState } from 'react';
import React from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional
import 'tippy.js/animations/scale-subtle.css';
import 'tippy.js/themes/translucent.css';
import './App.css';

// var filterList = [];

function App() {

  const [Items, setItems] = useState([]);
  const [filterList, setfilterList] = useState([]);
  const [Country, setCountry] = useState("");
  const [Capital, setCapital] = useState("");
  const [Currency, setCurrency] = useState("");
  const [Language, setLanguage] = useState("");
  const [SearchString, setSearchString] = useState("");


  useEffect(() => {
    console.log("INSIDE USEEFFECT");
    fetch("https://restcountries.eu/rest/v2/all")
      .then(response => response.json())
      .then(data =>
        setItems(data) //Changes state
        // console.log(data)
      );
  }, []);

  function onMouseOverHandler(item) {
    console.log(item);
    setCountry(item.name);
    setCapital(item.capital);
    setCurrency(item.currencies[0].name);
    setLanguage(item.languages[0].name);
  }

  useEffect(() => {
    setfilterList(Items.filter(checkSubStringMatch));
  }, [SearchString, Items]);

  // If I dont add Items, initially it gives No Data. Data appears only on Search. After adding Items we get data initially as well. Weird.
  // Found a possible explanation to this. 
  // Initially on first render, Items is empty. Both UseEffects on first render are called. But the filterList useEffect doesn't have Item data on the first time, so the filterList array stays empty and only pops up data when we fill the Search String. This is when Items is not added as 2nd parameter to this useEffect. Now we add Items to it. So now on 1st render Items fills with data and as soon as that happens, the Filter useEffect again causes Re-render - now with full Items data and SearchString as "". Note that str.includes("") returns true and hence we get full data.

  function checkSubStringMatch(item) {
    return item.name.toLowerCase().includes(SearchString.toLowerCase());
  }



  return (
    <div className="App">
      <h1>Flags and Countries</h1>
      <p><mark>&nbsp;Hover over icons or search for a country.&nbsp;</mark></p>

      <div id="searchWrapper">
        <input
          type="text"
          name="searchBar"
          onChange={(event) => setSearchString(event.target.value)}
          id="searchBar"
          placeholder="Search for a country"
        />
      </div>

      <div id="flag-container">
        {(filterList.map((item) =>
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



// We can't add Event Listener like below in React, Also getElementbyId wont work correctly
//   this.searchBar.addEventListener('keyup', (e) => {
//     const searchString = e.target.value.toLowerCase();
//     const filteredCharacters = Items.filter((character) => {
//         return (""
//             // character.name.toLowerCase().includes(searchString) ||
//             // character.house.toLowerCase().includes(searchString)
//         );
//     });
//     // displayCharacters(filteredCharacters);
// });


// This way str is not accessible in filter, so we store it in a state var
// function onSearchChangeHandler(evt) {
//   var str = evt.target.value;
//   console.log(str);
//   Items.filter(checkSubStringMatch);
// }


// Need to store it in a variable, otherwise won't evaluate, filter method returns a new Filtered array
  // This snippet runs on every render
  // const filterList = Items.filter(checkSubStringMatch);

  // const searchBar = document.getElementById('searchBar');
  // this.searchBar = React.createRef();