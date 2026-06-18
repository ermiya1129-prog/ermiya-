let allCoins = [];

async function loadData() {

  const coinsDiv = document.getElementById("coins");

  try {

    coinsDiv.innerHTML = "<h2>در حال دریافت اطلاعات...</h2>";

    const response = await fetch(
      "https://api.abantether.com/api/v1/manager/otc/ticker"
    );

    if (!response.ok) {
      throw new Error("HTTP Error: " + response.status);
    }

    const data = await response.json();

    console.log("API DATA:", data);

    if (!data.data || !data.data.markets) {
      throw new Error("ساختار داده API تغییر کرده است");
    }

    allCoins = Object.values(data.data.markets);

    let html = "";

    allCoins.forEach(coin => {

      html += 
      <div class="card">
        <h3>${coin.symbol}</h3>

        <div class="buy">
          خرید:
          ${Number(coin.buy_price).toLocaleString()}
        </div>

        <div class="sell">
          فروش:
          ${Number(coin.sell_price).toLocaleString()}
        </div>

      </div>
      ;

    });

    coinsDiv.innerHTML = html;

  } catch (error) {

    console.error(error);

    coinsDiv.innerHTML = 
      <div class="card">
        <h2>❌ خطا</h2>
        <p>${error.message}</p>
      </div>
    ;
  }
}

loadData();
