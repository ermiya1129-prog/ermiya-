let allCoins = [];
let chart;

async function loadData(){

try{

const res = await fetch(
"https://api.abantether.com/api/v1/manager/otc/ticker"
);

const json = await res.json();

allCoins = Object.values(json.data.markets);

showCoins(allCoins);

fillSelect();

drawChart();

}catch(err){

console.log(err);

}

}

function showCoins(data){

let html = "";

data.forEach(c=>{

html += 
<div class="card">

<h3>${c.symbol}</h3>

<div class="buy">
خرید:
${Number(c.buy_price).toLocaleString()}
</div>

<div class="sell">
فروش:
${Number(c.sell_price).toLocaleString()}
</div>

<button onclick="addWatch('${c.symbol}')">
⭐ علاقه‌مندی
</button>

</div>
;

});

document.getElementById("coins").innerHTML = html;

}

function fillSelect(){

const select =
document.getElementById("coinSelect");

select.innerHTML="";

allCoins.forEach(c=>{

select.innerHTML +=
<option value="${c.symbol}">
${c.symbol}
</option>;

});

}

function convert(){

const amount =
parseFloat(
document.getElementById("amount").value
);

const symbol =
document.getElementById("coinSelect").value;

const coin =
allCoins.find(c=>c.symbol===symbol);

if(!coin) return;

const result =
amount * Number(coin.sell_price);

document.getElementById("result").innerHTML =
result.toLocaleString()+" تومان";

}

function searchCoin(){

const txt =
document.getElementById("search")
.value
.toLowerCase();

const filtered =
allCoins.filter(c=>
c.symbol.toLowerCase().includes(txt)
);

showCoins(filtered);

}

function toggleTheme(){

document.body.classList.toggle("light");

}

function addWatch(symbol){

let list =
JSON.parse(
localStorage.getItem("watchlist") || "[]"
);

if(!list.includes(symbol))
list.push(symbol);

localStorage.setItem(
"watchlist",
JSON.stringify(list)
);

showWatch();

}

function showWatch(){

let list =
JSON.parse(
localStorage.getItem("watchlist") || "[]"
);

document.getElementById(
"watchlist"
).innerHTML =
list.join(" ⭐ ");

}

function drawChart(){

const labels =
allCoins.slice(0,5)
.map(c=>c.symbol);

const prices =
allCoins.slice(0,5)
.map(c=>Number(c.sell_price));

if(chart) chart.destroy();

chart = new Chart(
document.getElementById("chart"),
{
type:"bar",
data:{
labels,
datasets:[{
label:"قیمت",
data:prices
}]
}
}
);

}

loadData();

showWatch();

setInterval(loadData,10000);
