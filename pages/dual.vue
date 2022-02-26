<template>
  <b-container fluid>
    <b-row>
      <b-col cols="1"></b-col>
      <b-col cols="11">
        <div id="listgroup-ex" style="position: relative; overflow-y: auto">
          <div class="tradingview" id="list-item-1">
            <h1>BTC</h1>
            <iframe class="" src="https://www.binance.com/en/futures/CVCUSDT">
            </iframe>
          </div>
          <div class="tradingview" id="list-item-2">
            <h1>ETH</h1>
            <iframe src="https://www.binance.com/en/futures/CVCUSDT"> </iframe>
          </div>
          <div class="tradingview" id="list-item-3">
            <h1>LTC</h1>
            <iframe src="https://www.binance.com/en/futures/CVCUSDT"> </iframe>
          </div>
          <div class="tradingview" id="list-item-4">
            <h1>DOGE</h1>
            <iframe src="https://www.binance.com/en/futures/CVCUSDT"> </iframe>
          </div>
          <div class="tradingview" id="list-item-5">
            <h1>SHIT</h1>
            <iframe src="https://www.binance.com/en/futures/CVCUSDT"> </iframe>
          </div>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      text: `
          Quis magna Lorem anim amet ipsum do mollit sit cillum voluptate ex nulla
          tempor. Laborum consequat non elit enim exercitation cillum aliqua
          consequat id aliqua. Esse ex consectetur mollit voluptate est in duis
          laboris ad sit ipsum anim Lorem. Incididunt veniam velit elit elit veniam
          Lorem aliqua quis ullamco deserunt sit enim elit aliqua esse irure. Laborum
          nisi sit est tempor laborum mollit labore officia laborum excepteur
          commodo non commodo dolor excepteur commodo. Ipsum fugiat ex est consectetur
          ipsum commodo tempor sunt in proident.
        `,
    };
  },
};
</script>
<style scoped>
.traddingview {
  height: 100%;
  widows: 100%;
}
iframe {
  height: 650px;
  width: 100%;
}
.list {
  position: absolute;
  top: 0%;
  left: 0%;
  width: 150px;
  height: 150px;
}
</style>