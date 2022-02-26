<template>
  <div class="grid-container" v-if="listPair.length > 0">
    <div
      class="item"
      v-for="(item, index) in listPair"
      :key="index"
      v-bind:style="listPair.length / 2 == 1 ? 'height:90vh' : 'height:48vh'"
    >
      <iframe class="frame" :src="item.url"> </iframe>
    </div>
  </div>
  <div v-else>
    <h1>Chưa chọn cặp nào</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      listPair: [],
    };
  },
  mounted() {
    let listPair = this.$cookies.get("watchList");
    listPair = JSON.parse(listPair);
    let myList = [];

    listPair.map((item) => {
      //&symbol=BATS_DLY%3AAAPL&interval=15&symboledit=1&saveimage=1&toolbarbg=f1f3f6&studies=RSI%40tv-basicstudies%1FBB%40tv-basicstudies&theme=light&style=1&timezone=Etc%2FUTC&studies_overrides=%7B%7D&overrides=%7B%7D&enabled_features=%5B%5D&disabled_features=%5B%5D
      let urlStr = `https://www.tradingview.com/widgetembed/?frameElementId=tradingview_9db2f&symbol=${item}PERP&interval=15&symboledit=1&saveimage=1&studies=BB%40tv-basicstudies&toolbarbg=f1f3f6&theme=dark&style=1&timezone=Etc%2FUTC&studies_overrides=%7B%7D&overrides=%7B%7D&enabled_features=%5B%5D&disabled_features=%5B%5D&locale=vi_VN`;
console.log(urlStr)
      myList.push({
        name: item,
        url: urlStr,
      });
    });
    this.listPair = myList;
  },
};
</script>
<style scoped>
html {
  background-color: black !important;
}
.grid-container {
  display: grid;
  grid-template-columns: auto auto;
  grid-gap: 10px;
  background-color: black;
  padding: 10px;
}

.grid-container > div {
  background-color: rgba(12, 12, 12, 0.8);
  text-align: center;
}
.frame {
  width: 100%;
  height: 100%;
}
</style>