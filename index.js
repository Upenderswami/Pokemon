let data = "";
let finaldata = [];
let limit = 20;
let offset = 0;

async function getDataFromAPI(url) {
    const response = await fetch(url);
    const result = await response.json();
    return result;
}

window.addEventListener("load", async () => {
    data = await getDataFromAPI(`https://pokeapi.co/api/v2/pokemon?limit&offset=0`);
    console.log(data);
    data.results.forEach(async (obj) => {
        const temp = await getDataFromAPI(obj.url);
        console.log(temp);
        finaldata.push(temp);
        show(finaldata);
    });
});

const wrapper = document.querySelector('main');

function show(finaldata) {
    wrapper.innerHTML = "";

    finaldata.forEach(upender => {
        const mydiv = document.createElement("div");
        mydiv.classList.add("flip-card");

        const flipCardInner = document.createElement("div");
        flipCardInner.classList.add("flip-card-inner");

        const flipCardFront = document.createElement("div");
        flipCardFront.classList.add("flip-card-front");

        const flipCardBack = document.createElement("div");
        flipCardBack.classList.add("flip-card-back");

        const myimage = document.createElement("img");
        myimage.src = upender.sprites.other.dream_world.front_default;

        const id = document.createElement("span");
        id.innerHTML = "ID: " + upender.id;

        const name = document.createElement("h4");
        name.innerHTML = "Name: " + upender.name;

        const type = document.createElement("p");
        type.innerHTML = "Type: " + upender.types[0].type.name;

        const backpara = document.createElement("h5");
        backpara.innerHTML = 
       "<span>Heigth:"+upender.height+" </span> <span>weigth:"+upender.weight+" </span> <span>Hp:"+upender.stats[0].base_stat+" </span> <span>Attack:"+upender.stats[1].base_stat+" </span> <span>Defense:"+upender.stats[2].base_stat+" </span> <span>special-attack:"+upender.stats[3].base_stat+" </span><span>Special-defense:"+upender.stats[4].base_stat+" </span><span>Speed:"+upender.stats[5].base_stat+" </span>";

        flipCardFront.append(id, myimage, name, type);
        flipCardBack.append(backpara);

        flipCardInner.append(flipCardFront, flipCardBack);
        mydiv.appendChild(flipCardInner);

        wrapper.appendChild(mydiv);
    });
}

const input = document.querySelector("#search");
const select = document.querySelector("select");
const loadMore = document.querySelector("#loadMore");

input.addEventListener("keyup", Inputfunction);
select.addEventListener("change", selectfunction);
loadMore.addEventListener("click", () => {
    offset += limit;
    loadMorefunction();
});

function Inputfunction(e) {
    if (e.target.value.length === 0) {
        show(finaldata);
    } else {
        let forinput = finaldata.filter(obj => obj.name.includes(e.target.value));
        show(forinput);
    }
}

function selectfunction(e) {
    const type = e.target.value;
    if (type === "all") {
        show(finaldata);
    } else {
        let forinput = finaldata.filter(obj => obj.types.some(t => t.type.name === type));
        show(forinput);z
    }
}

async function loadMorefunction() {
    data = await getDataFromAPI("https://pokeapi.co/api/v2/pokemon?limit=" + limit + "&offset=" + offset);
    data.results.forEach(async (obj) => {
        const temp = await getDataFromAPI(obj.url);
        finaldata.push(temp);
        console.log(finaldata.length);
        show(finaldata);
    });
}

