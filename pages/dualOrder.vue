<template>
  <div class="grid-container" v-if="listPair.length > 0">
    <div
      class="item"
      v-for="(item, index) in listPair"
      :key="index"
      v-bind:style="checkLength"
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
  methods: {},
  computed: {
    checkLength() {
      let length = this.listPair.length;
      let str = "";
      if (length === 1) {
        str = "height:97vh;width:95vw";
      } else if (length === 2) {
        str = "height:97vh;width:49vw";
      }
      if (length > 2) {
        str = "height:48vh;width:49vw";
      }
      return str;
    },
  },

  mounted() {
    let listPair = this.$cookies.get("watchListAccount");
    listPair = JSON.parse(listPair);
    let myList = [];

    listPair.map((item) => {
      //&symbol=BATS_DLY%3AAAPL&interval=15&symboledit=1&saveimage=1&toolbarbg=f1f3f6&studies=RSI%40tv-basicstudies%1FBB%40tv-basicstudies&theme=light&style=1&timezone=Etc%2FUTC&studies_overrides=%7B%7D&overrides=%7B%7D&enabled_features=%5B%5D&disabled_features=%5B%5D
      let urlStr = `https://www.tradingview.com/widgetembed/?frameElementId=tradingview_9db2f&symbol=${item}PERP&interval=15&symboledit=1&saveimage=1&studies=BB%40tv-basicstudies&toolbarbg=f1f3f6&theme=dark&style=1&timezone=Etc%2FUTC&studies_overrides=%7B%7D&overrides=%7B%7D&enabled_features=%5B%5D&disabled_features=%5B%5D&locale=vi_VN`;

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
html,
body {
  background-color: rgb(224, 55, 202) !important;
}
.grid-container {
  display: grid;
  grid-template-columns: auto auto;
  grid-gap: 10px;
  padding: 10px;
  background-color: rgb(34, 76, 167) !important;
}

.grid-container > div {
  text-align: center;
}
.frame {
  width: 100%;
  height: 100%;
}
</style>