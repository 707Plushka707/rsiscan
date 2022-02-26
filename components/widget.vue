<template>
  <VueTradingView
    style="width: 100%; height: 100%"
    :options="options.toString()"
  />
</template>

<script>
import VueTradingView from "vue-trading-view";
export default {
  components: {
    VueTradingView,
  },
  data() {
    return {
      options: {
        symbol: "OANDA:XAUUSD",
        theme: "light",
        width: 500,
        locale: "vi_VN",
        interval: "1D",
        style: 3,
        enable_publishing: false,
        hide_top_toolbar: false,
        hide_legend: false,
        save_image: false,
        toolbar_bg: "#f1f3f6",
        enable_publishing: false,
        withdateranges: true,
        range: "5M",
        save_image: false,
        details: true,
        timezone: "Etc/UTC",
      },
    };
  },
};
</script>