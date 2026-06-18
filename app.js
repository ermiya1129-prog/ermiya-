async function loadPrices() {
  const res = await fetch(
    "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,tether,dogecoin&vs_currencies=usd"
  );

  const data = await res.json();

  document.getElementById("coins").innerHTML = 
    <div class="card">USDT: $${data.tether.usd}</div>
    <div class="card">BTC: $${data.bitcoin.usd}</div>
    <div class="card">ETH: $${data.ethereum.usd}</div>
    <div class="card">DOGE: $${data.dogecoin.usd}</div>
  ;
}

loadPrices();
