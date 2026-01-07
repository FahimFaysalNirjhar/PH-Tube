const nav = document.getElementById("nav");

function loadButtons() {
  const URL = "https://openapi.programming-hero.com/api/phero-tube/categories";
  fetch(URL)
    .then((response) => response.json())
    .then((data) => displayCatagory(data.categories));
  //categories
}
/* {
    "category_id": "1001",
    "category": "Music"
}*/
const displayCatagory = (data) => {
  console.log(data);
  for (let catagory of data) {
    console.log(catagory.category);
    const menu = catagory.category;
    const div = document.createElement("div");
    div.innerHTML = `
    <button
          class="btn btn-sm bg-[var(--bg-button)] font-inter text-[#252525B3] hover:bg-[#FF1F3D] hover:text-white"
        >
          ${menu}
        </button>
    `;
    nav.append(div);
  }
};
loadButtons();
