"use-strict";
import { data } from "./hp.js";

const cardsWrapper = document.querySelector(".wrapper");

const selectOptions = document.querySelector(".js__select");

const personName = document.getElementById("name");

let $option = "";

personName.addEventListener("input", () => serchName(data));

selectOptions.addEventListener("change", () => serchName(data));

selectOptions.innerHTML =
  `<option class="option__list" value="All">All</option>` + addSelect(data);

function renderCards(arr) {
  cardsWrapper.innerHTML = "";
  arr.forEach((elem) => {
    let div = document.createElement("div");
    div.className = "card";
    div.innerHTML = ` 
    <div class="card">
    <img src="${elem.image}" width = "334" height = "192" alt="${elem.name}" />
    <div class="info__card">
      <h2>${elem.name}</h2>
      <p class="card__p">Actor: ${
        elem.actor === "" ? "Unknown" : elem.actor
      }</p>
      <p class="card__p">Gender: ${
        elem.gender === "" ? "Unknown" : elem.gender
      }</p>
      <p class="card__p">House: ${
        elem.house === "" ? "Unknown" : elem.house
      }</p>
      <p class="card__p">Wand core: ${
        elem.wand.core === "" ? "Unknown" : elem.wand.core
      }</p>
      <p class="card__p">Alive: ${elem.alive ? "yes" : "no"}</p>
    </div>
    </div>`;
    cardsWrapper.append(div);
  });
}

renderCards(data);

//функция по созданию выпадающего списка (select)

function addSelect(arr) {
  let arrHouses = arr.map((elem) => elem.house).sort();
  let filteredHouses = [...new Set(arrHouses)];
  filteredHouses.map((option) => {
    $option += `<option class="option__list" value="${option}">${
      option || "Unknown"
    }</option>`;
  });
  return $option;
}

addSelect(data);

function serchName(arr) {
  let persona = personName.value.toLowerCase().trim();
  let house = selectOptions.value.toLowerCase().trim();
  let filtered = arr
    .filter((elem) => elem.name.toLowerCase().includes(persona))
    .filter((elem) => elem.house.toLowerCase() === house || house === "All");
  filtered.length !== 0 ? renderCards(filtered) : renderCards(arr);
}
