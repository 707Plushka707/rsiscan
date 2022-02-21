<template>
  <div class="wrapper">
    <header class="navbar">
      <div class="container-xl"></div>
    </header>
    <div class="page-wrapper">
      <div class="container-xl">
        <!-- Page title -->
        <div class="page-header d-print-none">
          <div class="row align-items-center">
            <div class="col">
              <!-- Page pre-title -->
              <div class="page-pretitle">RSI Scan</div>
              <h2 class="page-title">Dashboard</h2>
            </div>
            <!-- Page title actions -->
            <div class="col-auto ms-auto d-print-none">
              <div class="btn-list">
                <a
                  href="#"
                  v-b-modal.modalCauHinh
                  class="btn btn-primary d-none d-sm-inline-block"
                >
                  <!-- Download SVG icon from http://tabler-icons.io/i/plus -->
                  Cấu Hình
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="page-body">
        <div class="p-2">
          <div class="row row-deck row-cards">
            <div class="col-12">
              <div class="card">
                <div class="table-responsive">
                  <b-row>
                    <b-col cols="12" class="">
                      <div>
                        <b-form inline>
                          <label>Coin</label>
                          <b-form-input
                            style="text-transform: uppercase"
                            v-model="filterName"
                            class="m-2"
                            debounce="400"
                            type="search"
                          ></b-form-input>
                          <label>RSI 15M</label>
                          <b-form-input
                            style="text-transform: uppercase"
                            v-model="rsi15mRule"
                            class="m-2"
                            debounce="400"
                            type="search"
                          ></b-form-input>
                          <label>RSI 5M</label>
                          <b-form-input
                            style="text-transform: uppercase"
                            v-model="rsi5mRule"
                            class="m-2"
                            debounce="400"
                            type="search"
                          ></b-form-input>
                          <label>Volume</label>
                          <b-form-input
                            style="text-transform: uppercase"
                            v-model="volumeRule"
                            class="m-2"
                            debounce="400"
                            type="search"
                          ></b-form-input>
                        </b-form>
                      </div>
                    </b-col>
                    <b-col col lg="9" md="12" sm="12">
                      <b-table
                        outlined
                        head-variant="dark"
                        class="text-center"
                        striped
                        hover
                        :items="getPairlist"
                        :fields="fields"
                        show-empty
                        :sort-by.sync="sortBy"
                        :sort-desc.sync="sortDesc"
                        :tbody-transition-props="transProps"
                        :filter="filterName"
                      >
                        <template #empty="">
                          <p>
                            Không có thông tin phù hợp với các trường lọc lúc
                            này!
                          </p>
                        </template>
                        <template #cell(#)="data">
                          {{ data.index + 1 }}
                        </template>
                      </b-table>
                    </b-col>
                    <b-col col lg="3" md="12" sm="12">
                      <b-table
                        outlined
                        head-variant="dark"
                        class="text-center"
                        striped
                        hover
                        :items="binanceWatchList"
                        :fields="fieldsBinanceWatchlist"
                        show-empty
                        :sort-by.sync="sortBy"
                        :sort-desc.sync="sortDesc"
                        :tbody-transition-props="transProps"
                      >
                        <template #empty="">
                          <p>Chưa có dữ liệu...</p>
                        </template>
                        <template #cell(#)="data">
                          {{ data.index + 1 }}
                        </template>
                      </b-table>
                    </b-col>
                  </b-row>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <b-modal id="modalCauHinh" title="Cấu Hình Server">
      <b-form-row>
        <b-col cols="6">
          <b-form-group
            label="Binance Delay"
            description="Thời gian delay các vòng để tránh bị BAN IP từ binance "
          >
            <b-form-input
              v-model="serverConfig.delayScript"
              type="number"
              required
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="6">
          <b-form-group
            label="Chu Kì RSI"
            description="Cách tính RSI dựa trên chu kì, ví dụ RSI(6), RSI(14)"
          >
            <b-form-input
              type="number"
              v-model="serverConfig.period"
              required
            ></b-form-input>
          </b-form-group>
        </b-col>
      </b-form-row>

      <b-form-group
        label="Pair List"
        description="Danh sách các cặp giao dịch, cách nhau bằng dấu , "
      >
        <b-form-textarea
          rows="6"
          v-model="serverConfig.pairList"
          required
        ></b-form-textarea>
      </b-form-group>
      <b-form-row>
        <b-col cols="6">
          <b-form-group
            label="RSI 15M"
            description="Cấu hình lọc RSI 15M nặc định"
          >
            <b-form-input
              v-model="serverConfig.rsi15m"
              type="number"
              min="0"
              max="100"
              required
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="6">
          <b-form-group
            label="RSI 5M"
            description="Cấu hình lọc RSI 5M mặc định"
          >
            <b-form-input
              type="number"
              min="0"
              max="100"
              v-model="serverConfig.rsi5m"
              required
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="6">
          <b-form-group
            label="Volume"
            description="Cấu hình lọc Volume mặc định"
          >
            <b-form-input
              type="number"
              v-model="serverConfig.volume"
              required
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="6">
          <b-form-group
            label="Chu Kì BB"
            description="Chu kì lấy BB của watchlist"
          >
            <b-form-input
              type="number"
              v-model="serverConfig.bbperiod"
              required
            ></b-form-input>
          </b-form-group>
        </b-col>
      </b-form-row>
    </b-modal>
    <footer class="footer footer-transparent d-print-none">
      <div class="container-xl">
        <div class="row text-center align-items-center flex-row-reverse">
          <div class="col-12">
            <ul class="list-inline list-inline-dots mb-0">
              <li class="list-inline-item">
                Copyright &copy; 2021
                <a href="." class="link-secondary">Baotm</a>. All rights
                reserved.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
function compare(a, b) {
  if (a.rsi && b.rsi) {
    if (a.rsi > b.rsi) {
      return -1;
    }
    if (a.rsi < b.rsi) {
      return 1;
    }
    return 0;
  } else {
    return 0;
  }
}
export default {
  name: "IndexPage",
  data() {
    return {
      serverConfig: {
        delayScript: 20,
        period: 6,
        pairList: [],
        rsi15m: 50,
        rsi5m: 20,
        volume: 1,
        bbperiod: 6,
      },
      sortBy: "rsi15m.RSI",
      sortDesc: true,
      transProps: {
        name: "flip-list",
      },
      filterName: null,

      items: [],
      listpair: [],
      dataReady: false,
      fetchStatus: false,
      rsi5mRule: 10,
      rsi15mRule: 50,
      volumeRule: 1,
      filter: null,
      filterOn: [],
      fields: [
        { key: "name", sortable: true },
        {
          key: "rsi15m.RSI",
          sortable: true,
          label: "RSI 15M",
          sortDirection: "desc",
        },
        { key: "rsi5m.RSI", sortable: true, label: "RSI 5M" },
        {
          key: "info.close",
          sortable: true,
          label: "Price",
          formatter: (value, key, item) => {
            return parseFloat(value.toString());
          },
        },
        {
          key: "info.volume",
          sortable: true,
          label: "Volume",
          formatter: (value, key, item) => {
            return this.formatSoTien(parseFloat(value.toString()).toFixed(0));
          },
        },
      ],
      binanceWatchList: [],
      fieldsBinanceWatchlist: [
        { key: "#" },
        { key: "Pair" },
        {
          key: "BB",
        },
        {
          key: "Windows",
        },
      ],
    };
  },
  computed: {
    getPairlist() {
      let newList = [];
      this.listpair.map((item) => {
        if (
          item.rsi5m &&
          item.rsi15m &&
          item.rsi15m.RSI >= this.rsi15mRule &&
          item.rsi5m.RSI >= this.rsi5mRule &&
          parseFloat(item.info.volume) >= this.volumeRule
        ) {
          newList.push(item);
        }
      });
      return newList;
    },
  },
  async mounted() {
    this.getData();
    setInterval(() => {
      this.getData();
    }, 5000); //chay moi 5p 1 lan
  },
  methods: {
    formatSoTien(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },

    getPrice(item) {
      let price = parseFloat(item.info.close.toString());
      return 1;
    },
    getVolume(item) {
      let volume = parseFloat(item.info.volume);
      return volume.toFixed(0);
    },
    getRSI15M(item) {
      let result;
      if (item.rsi15m) {
        result = item.rsi15m.RSI;
      } else {
        result = "x";
      }
      return result;
    },

    getRSI5M(item) {
      let result;
      if (item.rsi5m) {
        result = item.rsi5m.RSI;
      } else {
        result = "x";
      }
      return result;
    },
    getName5M(item) {
      return 1;
    },
    getName15M(item) {
      let result;
      if (item[0].time === "15m") {
        result = item[0];
      } else {
        return "";
      }
      console.log(result);
      return result.RSI;
    },
    filterRSI() {},
    getData() {
      // this.dataReady = false;
      console.log("fetch...");
      fetch("https://baotmrsi.herokuapp.com/rsi")
        .then((data) => data.json())
        .then((data) => {
          //  console.log(data)
          let list = [];
          data.forEach((element) => {
            if (element) {
              list.push(element);
            }
          });
          list = list.sort(compare);
          list = _.groupBy(list, "name");

          let newList = [];
          _.forOwn(list, (value, key) => {
            let rsi15;
            let rsi5;
            let d = value;
            for (let i = 0; i < 2; i++) {
              if (d[i]) {
                if (d[i].time === "5m") {
                  rsi5 = d[i];
                }
                if (d[i].time === "15m") {
                  rsi15 = d[i];
                }
              } else {
                if (rsi15) {
                  rsi5 = null;
                }
                if (rsi5) {
                  rsi15 = null;
                }
              }
            }

            let newObject = {
              name: key,
              rsi15m: rsi15,
              rsi5m: rsi5,
              ...value[0],
            };
            if (rsi15) {
              newList.push(newObject);
            }
          });

          this.listpair = newList;
          this.dataReady = true;
        });
    },
  },
};
</script>
<style scoped>
table .flip-list-move {
  transition: transform 1s;
}
</style>
