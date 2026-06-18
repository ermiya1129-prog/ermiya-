const allCoins = [
 {symbol:"USDT", buy_price:92000, sell_price:92500},
 {symbol:"BTC", buy_price:9500000000, sell_price:9550000000},
 {symbol:"ETH", buy_price:250000000, sell_price:252000000},
 {symbol:"DOGE", buy_price:18000, sell_price:18500},
 {symbol:"TRX", buy_price:3500, sell_price:3600}
];

function showCoins(data){

let html="";

data.forEach(c=>{

html += 
<div class="card">
<h3>${c.symbol}</h3>

<div class="buy">
خرید: ${Number(c.buy_price).toLocaleString()}
</div>

<div class="sell">
فروش: ${Number(c.sell_price).toLocaleString()}
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

if(!select) return;

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
parseFloat(document.getElementById("amount").value);

const symbol =
document.getElementById("coinSelect").value;

const coin =
allCoins.find(c=>c.symbol===symbol);

const result =
amount * coin.sell_price;

document.getElementById("result").innerHTML =
result.toLocaleString()+" تومان";

}

function searchCoin(){

const txt =
document.getElementById("search").value.toLowerCase();

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
JSON.parse(localStorage.getItem("watchlist") || "[]");

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
JSON.parse(localStorage.getItem("watchlist") || "[]");

const el =
document.getElementById("watchlist");

if(el){
el.innerHTML = list.join(" ⭐ ");
}

}

showCoins(allCoins);
fillSelect();
showWatch();
