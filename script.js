const nav = document.getElementById("nav");
const section = document.querySelector("section");
const btnAll = document.getElementById("btn-all");

function removeActiveClass() {
  const activebtn = document.querySelectorAll(".active");
  activebtn.forEach((btn) => {
    btn.classList.remove("active");
  });
}

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
  //   console.log(data);
  for (let catagory of data) {
    // console.log(catagory.category);
    const menu = catagory.category;
    const div = document.createElement("div");
    div.innerHTML = `
    <button id=btn-${catagory.category_id}
          class="btn btn-sm bg-[var(--bg-button)] font-inter text-[#252525B3] hover:bg-[#FF1F3D] hover:text-white" onclick=loadCatagoryVideos(${catagory.category_id})
        >
          ${menu}
        </button>
    `;
    nav.append(div);
  }
};
loadButtons();

function loadVideos() {
  const URL = "https://openapi.programming-hero.com/api/phero-tube/videos";
  fetch(URL)
    .then((response) => response.json())
    .then((data) => {
      removeActiveClass();
      btnAll.classList.add("active");
      displayVideos(data.videos);
    });
}

/*{
    "category_id": "1001",
    "video_id": "aaaa",
    "thumbnail": "https://i.ibb.co/L1b6xSq/shape.jpg",
    "title": "Shape of You",
    "authors": [
        {
            "profile_picture": "https://i.ibb.co/D9wWRM6/olivia.jpg",
            "profile_name": "Olivia Mitchell",
            "verified": ""
        }
    ],
    "others": {
        "views": "100K",
        "posted_date": "16278"
    },
    "description": "Dive into the rhythm of 'Shape of You,' a captivating track that blends pop sensibilities with vibrant beats. Created by Olivia Mitchell, this song has already gained 100K views since its release. With its infectious melody and heartfelt lyrics, 'Shape of You' is perfect for fans looking for an uplifting musical experience. Let the music take over as Olivia's vocal prowess and unique style create a memorable listening journey."
}*/

btnAll.onclick = loadVideos;

const displayVideos = (videos) => {
  section.innerHTML = "";
  if (videos.length === 0) {
    section.innerHTML = `
    <div
        class="col-span-full flex flex-col gap-8 justify-center items-center"
      >
        <img class="w-[150px]" src="Icon.png" alt="" />
        <p class="text-2xl font-bold">Oops!! Sorry, There is no content here</p>
      </div>
    `;
  }
  videos.forEach((video) => {
    const card = document.createElement("div");
    card.innerHTML = `
    <div class="card">
        <figure>
          <img
            class="w-full h-[150px] object-cover rounded"
            src="${video.thumbnail}"
            alt="thumbnail"
          />
        </figure>
        <div class="flex gap-3 py-5">
          <div class="profile">
            <div class="avatar">
              <div class="ring-primary ring-offset-base-100 w-8 rounded-full">
                <img
                  src="${video.authors[0].profile_picture}"
                />
              </div>
            </div>
          </div>
          <div class="intro">
            <h2 class="font-bold justify-center text-sm">
             ${video.title}
            </h2>
            <p class="flex gap-3 text-[#171717B3] text-sm">
              ${video.authors[0].profile_name}
              <img class="w-6" src="icons8-verified-48.png" alt="" />
            </p>
            <p class="text-[#171717B3] text-sm">${video.others.views} views</p>
          </div>
        </div>
      </div>
    `;
    section.append(card);
  });
};

function loadCatagoryVideos(id) {
  const URL = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
  fetch(URL)
    .then((response) => response.json())
    .then((data) => {
      removeActiveClass();
      const clickedButton = document.getElementById(`btn-${id}`);
      clickedButton.classList.add("active");
      displayVideos(data.category);
    });
}
