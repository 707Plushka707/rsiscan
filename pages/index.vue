<template>
  <div class="wrapper">
    <b-sidebar id="mySideBoard" title="Watch List" right width="700px" shadow>
      <b-table
        style="font-size: 13px"
        outlined
        head-variant="dark"
        class="text-center"
        striped
        hover
        small
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

        <template #cell(name)="data">
          {{ data.item.name }}
          <span class="linkBinance">
            <a
              :href="'https://www.binance.com/en/futures/' + data.item.name"
              target="_blank"
              >→</a
            >
          </span>
        </template>
        <template #cell(price)="data">
          <p class="namePairList text-left">
            Price:
            {{ parseFloat(data.item.currentValue.last_tick.close.toString()) }}
            <br />
            RSI 15M:{{ data.item.currentValue.rsi15m }}
            <br />
            RSI 5M:{{ data.item.currentValue.rsi5m }}
            <br />
            Volume:{{
              parseFloat(data.item.currentValue.last_tick.volume.toString())
            }}
          </p>
        </template>
        <template #cell(bb15m)="data">
          <div class="rsiNumber text-left">
            <strong
              v-bind:style="
                data.item.currentValue.BB15m > data.item.oldValue.BB15m
                  ? 'color:green'
                  : 'color:red'
              "
            >
              U:{{ data.item.currentValue.BB15m.upper.toFixed(4) }}
              <sub class="text-muted">
                {{ data.item.oldValue.BB15m.upper.toFixed(4) }}</sub
              >
              <span
                style="color: green"
                v-if="
                  data.item.currentValue.BB15m.upper >
                  data.item.oldValue.BB15m.upper
                "
                >↑</span
              >
              <span v-else style="color: red">↓</span>

              <br />M:{{ data.item.currentValue.BB15m.middle.toFixed(4) }}
              <sub class="text-muted">
                {{ data.item.oldValue.BB15m.middle.toFixed(4) }}</sub
              >
              <span
                style="color: green"
                v-if="
                  data.item.currentValue.BB15m.middle >
                  data.item.oldValue.BB15m.middle
                "
                >↑</span
              >
              <span v-else style="color: red">↓</span>
              <br />L:{{ data.item.currentValue.BB15m.lower.toFixed(4) }}
              <sub class="text-muted">
                {{ data.item.oldValue.BB15m.lower.toFixed(4) }}</sub
              >
              <span
                style="color: green"
                v-if="
                  data.item.currentValue.BB15m.lower >
                  data.item.oldValue.BB15m.lower
                "
                >↑</span
              >
              <span v-else style="color: red">↓</span><br />
              PB:{{ data.item.currentValue.BB15m.pb.toFixed(4) }}
              <sub class="text-muted">
                {{ data.item.oldValue.BB15m.pb.toFixed(4) }}</sub
              >
              <span
                style="color: green"
                v-if="
                  data.item.currentValue.BB15m.pb > data.item.oldValue.BB15m.pb
                "
                >↑</span
              >
              <span v-else style="color: red">↓</span>
              <br
            /></strong>
          </div>
        </template>
        <template #cell(bb5m)="data">
          <div class="rsiNumber text-left">
            <strong
              v-bind:style="
                data.item.currentValue.BB5m > data.item.oldValue.BB5m
                  ? 'color:green'
                  : 'color:red'
              "
            >
              U:{{ data.item.currentValue.BB5m.upper.toFixed(4) }}
              <sub class="text-muted">
                {{ data.item.oldValue.BB5m.upper.toFixed(4) }}</sub
              >
              <span
                style="color: green"
                v-if="
                  data.item.currentValue.BB5m.upper >
                  data.item.oldValue.BB5m.upper
                "
                >↑</span
              >
              <span v-else style="color: red">↓</span>

              <br />M:{{ data.item.currentValue.BB5m.middle.toFixed(4) }}
              <sub class="text-muted">
                {{ data.item.oldValue.BB5m.middle.toFixed(4) }}</sub
              >
              <span
                style="color: green"
                v-if="
                  data.item.currentValue.BB5m.middle >
                  data.item.oldValue.BB5m.middle
                "
                >↑</span
              >
              <span v-else style="color: red">↓</span>
              <br />L:{{ data.item.currentValue.BB5m.lower.toFixed(4) }}
              <sub class="text-muted">
                {{ data.item.oldValue.BB5m.lower.toFixed(4) }}</sub
              >
              <span
                style="color: green"
                v-if="
                  data.item.currentValue.BB5m.lower >
                  data.item.oldValue.BB5m.lower
                "
                >↑</span
              >
              <span v-else style="color: red">↓</span><br />
              PB:{{ data.item.currentValue.BB5m.pb.toFixed(4) }}
              <sub class="text-muted">
                {{ data.item.oldValue.BB5m.pb.toFixed(4) }}</sub
              >
              <span
                style="color: green"
                v-if="
                  data.item.currentValue.BB5m.pb > data.item.oldValue.BB5m.pb
                "
                >↑</span
              >
              <span v-else style="color: red">↓</span>
              <br
            /></strong>
          </div>
        </template>
        <template #cell(tool)="data">
          <div class="addToBBPairList" @click="removeBBWatchList(data.item)">
            ☒
          </div> </template
        ><template #cell(volume)="data">
          <span>{{
            parseFloat(data.item.currentValue.last_tick.volume).toFixed(0)
          }}</span>
        </template>
      </b-table>
    </b-sidebar>
    <b-sidebar
      id="mySideBoardRight"
      title="Master Account"
      left
      backdrop-variant="dark"
      width="700px"
      shadow
    >
      <b-container>
        <p v-if="accountOrder">
          * Tổng Ví :
          <code
            >{{ parseFloat(accountOrder.totalWalletBalance).toFixed(1) }}
          </code>
          - Đang còn :
          <code
            >{{ parseFloat(accountOrder.availableBalance).toFixed(1) }}
          </code>
          <br />
          * Đang đánh :
          <code
            >{{ parseFloat(accountOrder.totalInitialMargin).toFixed(1) }}
          </code>
          - Lợi nhuận:
          <code
            >{{ parseFloat(accountOrder.totalUnrealizedProfit).toFixed(1) }}
          </code>
          <br />
          * Lệnh Đang Chờ :
          <code>{{ orderWatchList.length }} </code>
          <a v-b-modal.thongkeacc @click="getThongKeAcc()" href="#"
            >Thống Kê ngày...</a
          >
        </p>

        <b-table
          outlined
          head-variant="dark"
          class="text-center"
          striped
          hover
          :fields="fieldWatchList"
          :items="orderWatchList"
          show-empty
          :tbody-transition-props="transProps"
        >
          <template #empty="">
            <b-spinner variant="primary" small label="Spinning"></b-spinner>
          </template>
          <template #cell(symbol)="data">
            <span class="linkBinance" @click="calculatorValue(data.item)"
              >♣</span
            >
            <span class="namePairList"> {{ data.item.symbol }}</span>
          </template>
          <template #cell(unrealizedProfit)="data">
            <div>
              <span
                :class="
                  parseFloat((data.item.initialMargin * 10) / 100) <
                  parseFloat(data.item.unrealizedProfit)
                    ? 'vebo'
                    : ''
                "
                >{{ parseFloat(data.item.unrealizedProfit).toFixed(2) }}</span
              >
              <span class="text-mute">
                <sub
                  :style="
                    (data.item.unrealizedProfit / data.item.initialMargin) *
                      100 <
                    -50
                      ? 'color:white;background-color:red'
                      : 'color:white;background-color:green;'
                  "
                  >{{
                    (
                      (data.item.unrealizedProfit / data.item.initialMargin) *
                      100
                    ).toFixed(1)
                  }}%</sub
                >
              </span>
            </div>
          </template>
        </b-table>
        <div class="col-auto ms-auto d-print-none">
          <div class="btn-list">
            <a
              href="/dualOrder"
              target="_blank"
              class="btn btn-success d-none d-sm-inline-block"
            >
              <!-- Download SVG icon from http://tabler-icons.io/i/plus -->
              ⇌
            </a>
          </div>
        </div>
        <div v-if="calculatorValueStatus">
          <div v-if="calculatorValueStatusCheck">
            <b-table
              :items="calculatorItem"
              outlined
              head-variant="dark"
              class="text-center mt-3"
              striped
              hover
              responsive
              caption-top
              :caption="
                'Check mô hình nến đảo chiều cho cặp ' + calculatorSymbol
              "
            >
              <template #cell(name)="data">
                <strong>{{ data.item.name }}</strong>
              </template>
              <template #cell(1m)="data">
                <span :class="data.item['1m'] ? 'yes_c' : 'no_c'">{{
                  data.item["1m"] ? "✓" : "x"
                }}</span>
              </template>
              <template #cell(5m)="data">
                <span :class="data.item['5m'] ? 'yes_c' : 'no_c'">{{
                  data.item["5m"] ? "✓" : "x"
                }}</span>
              </template>
              <template #cell(15m)="data">
                <span :class="data.item['15m'] ? 'yes_c' : 'no_c'">{{
                  data.item["15m"] ? "✓" : "x"
                }}</span>
              </template>
              <template #cell(30m)="data">
                <span :class="data.item['30m'] ? 'yes_c' : 'no_c'">{{
                  data.item["30m"] ? "✓" : "x"
                }}</span>
              </template>
              <template #cell(4h)="data">
                <span :class="data.item['4h'] ? 'yes_c' : 'no_c'">{{
                  data.item["4h"] ? "✓" : "x"
                }}</span>
              </template>
              <template #cell(1h)="data">
                <span :class="data.item['1h'] ? 'yes_c' : 'no_c'">{{
                  data.item["1h"] ? "✓" : "x"
                }}</span>
              </template>
              <template #cell(1d)="data">
                <span :class="data.item['1d'] ? 'yes_c' : 'no_c'">{{
                  data.item["1d"] ? "✓" : "x"
                }}</span>
              </template>
              <template #cell(1w)="data">
                <span :class="data.item['1w'] ? 'yes_c' : 'no_c'">{{
                  data.item["1w"] ? "✓" : "x"
                }}</span>
              </template>
            </b-table>
          </div>
          <div v-else class="text-center">
            <b-spinner variant="primary" label="Spinning"></b-spinner>
          </div>
        </div>
      </b-container>
    </b-sidebar>

    <header class="navbar">
      <div class="container-xl"></div>
    </header>
    <div style="z-index: 0" class="page-wrapper">
      <div class="container-xl">
        <!-- Page title -->
        <div class="page-header d-print-none">
          <div class="row align-items-center">
            <div class="col">
              <!-- Page pre-title -->
              <div class="page-pretitle">RSI Scan</div>
              <h2 class="page-title">
                Dashboard

                <span class="sideBarOrder" v-b-toggle.mySideBoardRight>⍟</span>
              </h2>
            </div>
            <div>
              <b-avatar
                v-b-toggle.mySideBoard
                v-for="(item, index) in getBinanceWatchList"
                :key="index"
                :text="item.name[0] + item.name[1] + item.name[2]"
                v-b-tooltip.hover
                :title="item.name"
                variant="warning"
                class="mr-1 watchList"
              ></b-avatar>
            </div>
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
            <!-- Page title actions -->
            <div class="col-auto ms-auto d-print-none">
              <div class="btn-list">
                <a
                  href="/dual"
                  target="_blank"
                  class="btn btn-success d-none d-sm-inline-block"
                >
                  <!-- Download SVG icon from http://tabler-icons.io/i/plus -->
                  ⇌
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
                <b-container>
                  <b-row>
                    <b-col cols="12">
                      <div>
                        <b-form inline>
                          <label>Coin</label>
                          <b-form-input
                            style="text-transform: uppercase"
                            v-model="filterName"
                            class="m-2"
                            debounce="200"
                            type="search"
                          ></b-form-input>
                          <label>RSI 15M</label>
                          <b-form-input
                            style="text-transform: uppercase"
                            v-model="rsi15mRule"
                            class="m-2"
                            debounce="200"
                            type="search"
                          ></b-form-input>
                          <label>RSI 5M</label>
                          <b-form-input
                            style="text-transform: uppercase"
                            v-model="rsi5mRule"
                            class="m-2"
                            debounce="200"
                            type="search"
                          ></b-form-input>
                          <label>Volume</label>
                          <b-form-input
                            style="text-transform: uppercase"
                            v-model="volumeRule"
                            class="m-2"
                            debounce="200"
                            type="search"
                          ></b-form-input>
                        </b-form>
                      </div>
                    </b-col>
                  </b-row>
                </b-container>
                <b-row>
                  <b-col col lg="12" md="12" sm="12">
                    <b-table
                      style="font-size: 13px"
                      head-variant="dark"
                      class="text-center"
                      striped
                      fixed
                      hover
                      no-border-collapse
                      responsive
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
                          Không có thông tin phù hợp với các trường lọc lúc này!
                        </p>
                      </template>

                      <template #cell(name)="data">
                        <div class="namePairList">
                          <span
                            class="linkBinance"
                            @click="addToBBWatchList(data.item)"
                            >☆</span
                          >
                          {{ data.item.name }}
                          <span class="linkBinance">
                            <a
                              :href="
                                'https://www.binance.com/en/futures/' +
                                data.item.name
                              "
                              target="_blank"
                              >→</a
                            >
                          </span>
                        </div>
                      </template>
                      <template #cell(rsi15m)="data">
                        <div class="rsiNumber">
                          <strong
                            v-bind:style="
                              data.item.currentValue.rsi15m >
                              data.item.oldValue.rsi15m
                                ? 'color:green'
                                : 'color:red'
                            "
                          >
                            {{ data.item.currentValue.rsi15m }}</strong
                          >
                          <sub class="text-muted">
                            {{ data.item.oldValue.rsi15m }}</sub
                          >
                          <span
                            style="color: green"
                            v-if="
                              data.item.currentValue.rsi15m >
                              data.item.oldValue.rsi15m
                            "
                            >↑</span
                          >
                          <span v-else style="color: red">↓</span>
                        </div>
                      </template>
                      <template #cell(rsi5m)="data">
                        <div class="rsiNumber">
                          <strong
                            v-bind:style="
                              data.item.currentValue.rsi5m >
                              data.item.oldValue.rsi5m
                                ? 'color:green'
                                : 'color:red'
                            "
                          >
                            {{ data.item.currentValue.rsi5m }}</strong
                          >
                          <sub class="text-muted">
                            {{ data.item.oldValue.rsi5m }}</sub
                          >
                          <span
                            style="color: green"
                            v-if="
                              data.item.currentValue.rsi5m >
                              data.item.oldValue.rsi5m
                            "
                            >↑</span
                          >
                          <span v-else style="color: red">↓</span>
                        </div>
                      </template>
                      <template #cell(price)="data">
                        <div class="rsiNumber">
                          <strong
                            v-bind:style="
                              data.item.currentValue.last_tick.close >
                              data.item.oldValue.last_tick.close
                                ? 'color:green'
                                : 'color:red'
                            "
                          >
                            {{
                              parseFloat(data.item.currentValue.last_tick.close)
                            }}</strong
                          >
                          <sub class="text-muted">
                            {{
                              parseFloat(data.item.oldValue.last_tick.close)
                            }}</sub
                          >
                          <span
                            style="color: green"
                            v-if="
                              data.item.currentValue.last_tick.close >
                              data.item.oldValue.last_tick.close
                            "
                            >↑</span
                          >
                          <span v-else style="color: red">↓</span>
                        </div>
                      </template>
                      <template #cell(bb15m)="data">
                        <div class="rsiNumber text-left">
                          <strong
                            v-bind:style="
                              data.item.currentValue.BB15m >
                              data.item.oldValue.BB15m
                                ? 'color:green'
                                : 'color:red'
                            "
                          >
                            U:{{
                              data.item.currentValue.BB15m.upper.toFixed(4)
                            }}
                            <sub class="text-muted">
                              {{
                                data.item.oldValue.BB15m.upper.toFixed(4)
                              }}</sub
                            >
                            <span
                              style="color: green"
                              v-if="
                                data.item.currentValue.BB15m.upper >
                                data.item.oldValue.BB15m.upper
                              "
                              >↑</span
                            >
                            <span v-else style="color: red">↓</span>

                            <br />M:{{
                              data.item.currentValue.BB15m.middle.toFixed(4)
                            }}
                            <sub class="text-muted">
                              {{
                                data.item.oldValue.BB15m.middle.toFixed(4)
                              }}</sub
                            >
                            <span
                              style="color: green"
                              v-if="
                                data.item.currentValue.BB15m.middle >
                                data.item.oldValue.BB15m.middle
                              "
                              >↑</span
                            >
                            <span v-else style="color: red">↓</span>
                            <br />L:{{
                              data.item.currentValue.BB15m.lower.toFixed(4)
                            }}
                            <sub class="text-muted">
                              {{
                                data.item.oldValue.BB15m.lower.toFixed(4)
                              }}</sub
                            >
                            <span
                              style="color: green"
                              v-if="
                                data.item.currentValue.BB15m.lower >
                                data.item.oldValue.BB15m.lower
                              "
                              >↑</span
                            >
                            <span v-else style="color: red">↓</span><br />
                            PB:{{ data.item.currentValue.BB15m.pb.toFixed(4) }}
                            <sub class="text-muted">
                              {{ data.item.oldValue.BB15m.pb.toFixed(4) }}</sub
                            >
                            <span
                              style="color: green"
                              v-if="
                                data.item.currentValue.BB15m.pb >
                                data.item.oldValue.BB15m.pb
                              "
                              >↑</span
                            >
                            <span v-else style="color: red">↓</span>
                            <br
                          /></strong>
                        </div>
                      </template>
                      <template #cell(bb5m)="data">
                        <div class="rsiNumber text-left">
                          <strong
                            v-bind:style="
                              data.item.currentValue.BB5m >
                              data.item.oldValue.BB5m
                                ? 'color:green'
                                : 'color:red'
                            "
                          >
                            U:{{ data.item.currentValue.BB5m.upper.toFixed(4) }}
                            <sub class="text-muted">
                              {{
                                data.item.oldValue.BB5m.upper.toFixed(4)
                              }}</sub
                            >
                            <span
                              style="color: green"
                              v-if="
                                data.item.currentValue.BB5m.upper >
                                data.item.oldValue.BB5m.upper
                              "
                              >↑</span
                            >
                            <span v-else style="color: red">↓</span>

                            <br />M:{{
                              data.item.currentValue.BB5m.middle.toFixed(4)
                            }}
                            <sub class="text-muted">
                              {{
                                data.item.oldValue.BB5m.middle.toFixed(4)
                              }}</sub
                            >
                            <span
                              style="color: green"
                              v-if="
                                data.item.currentValue.BB5m.middle >
                                data.item.oldValue.BB5m.middle
                              "
                              >↑</span
                            >
                            <span v-else style="color: red">↓</span>
                            <br />L:{{
                              data.item.currentValue.BB5m.lower.toFixed(4)
                            }}
                            <sub class="text-muted">
                              {{
                                data.item.oldValue.BB5m.lower.toFixed(4)
                              }}</sub
                            >
                            <span
                              style="color: green"
                              v-if="
                                data.item.currentValue.BB5m.lower >
                                data.item.oldValue.BB5m.lower
                              "
                              >↑</span
                            >
                            <span v-else style="color: red">↓</span><br />
                            PB:{{ data.item.currentValue.BB5m.pb.toFixed(4) }}
                            <sub class="text-muted">
                              {{ data.item.oldValue.BB5m.pb.toFixed(4) }}</sub
                            >
                            <span
                              style="color: green"
                              v-if="
                                data.item.currentValue.BB5m.pb >
                                data.item.oldValue.BB5m.pb
                              "
                              >↑</span
                            >
                            <span v-else style="color: red">↓</span>
                            <br
                          /></strong>
                        </div>
                      </template>
                      <template #cell(volume)="data">
                        <div class="rsiNumber">
                          <strong
                            v-bind:style="
                              data.item.currentValue.last_tick.volume >
                              data.item.oldValue.last_tick.volume
                                ? 'color:green'
                                : 'color:red'
                            "
                          >
                            {{
                              formatSoTien(
                                parseFloat(
                                  data.item.currentValue.last_tick.volume
                                ).toFixed(0)
                              )
                            }}</strong
                          >
                          <sub class="text-muted">
                            {{
                              formatSoTien(
                                parseFloat(
                                  data.item.oldValue.last_tick.volume
                                ).toFixed(0)
                              )
                            }}</sub
                          >
                          <span
                            style="color: green"
                            v-if="
                              data.item.currentValue.last_tick.volume >
                              data.item.oldValue.last_tick.volume
                            "
                            >↑</span
                          >
                          <span v-else style="color: red">↓</span>
                        </div>
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

    <b-modal
      size="xl"
      no-close-on-backdrop
      id="thongkeacc"
      title="Thống Kê Acc"
    >
      <b-table
        outlined
        head-variant="dark"
        class="text-center"
        responsive
        caption-top
        foot-row-variant="danger"
        foot-clone
        show-empty
        :items="getAccountThongKe"
        small
        hover
      >
        <template v-slot:foot(income)>
          Tổng : {{ getSumProfit }} $
        </template>
        <template #cell(incomeType)="data">
          <b-badge variant="warning">{{ data.item.incomeType }}</b-badge>
        </template>
        <template #cell(time)="data">
          <strong>{{ $moment(data.item.time).format("hh:mm DD/MM") }}</strong>
        </template>
      </b-table>
    </b-modal>
    <b-modal
      size="xl"
      no-close-on-backdrop
      id="modalCauHinh"
      title="Cấu Hình Server"
    >
      <b-row>
        <b-col cols="8">
          <b-form-row>
            <b-col cols="3">
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
            <b-col cols="3">
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
            <b-col cols="3">
              <b-form-group
                label="Site Protection"
                description="Bật chế độ password"
              >
                <b-form-checkbox
                  switch
                  v-model="serverConfig.enablePassword"
                  required
                ></b-form-checkbox>
              </b-form-group> </b-col
            ><b-col cols="3">
              <b-form-group
                label="Password"
                description="Password để đăng nhập"
              >
                <b-form-input
                  v-model="serverConfig.sitePassword"
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
            <b-col cols="4">
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
            <b-col cols="4">
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
            <b-col cols="4">
              <b-form-group
                label="Clien Refresh"
                description="Thời gian lấy dữ liệu từ phía client"
              >
                <b-form-input
                  type="number"
                  min="0"
                  max="100"
                  v-model="serverConfig.delayClient"
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
            <b-col cols="6">
              <b-row>
                <b-col cols="6">
                  <b-form-group
                    label="Thông Báo "
                    description="Bật thông báo qua email khi RSI 15M,RSI5M vượt ngưỡng"
                  >
                    <b-form-checkbox
                      switch
                      v-model="serverConfig.enaleNoti"
                      required
                    ></b-form-checkbox>
                  </b-form-group>
                </b-col>
                <b-col cols="6">
                  <b-form-group
                    label="BB listwatch "
                    description="Bật BB listwatch"
                  >
                    <b-form-checkbox
                      switch
                      v-model="serverConfig.bblistWatch"
                      required
                    ></b-form-checkbox>
                  </b-form-group>
                </b-col>
                <b-col cols="12">
                  <b-form-group
                    label="RSI 15M Noti"
                    description="RSI 15M cảnh báo"
                  >
                    <b-form-input
                      type="number"
                      v-model="serverConfig.rsi15mNoti"
                      required
                    ></b-form-input> </b-form-group
                ></b-col>
                <b-col cols="12">
                  <b-form-group
                    label="RSI 5M Noti"
                    description="RSI 15M cảnh báo"
                  >
                    <b-form-input
                      type="number"
                      v-model="serverConfig.rsi5mNoti"
                      required
                    ></b-form-input> </b-form-group
                ></b-col>
              </b-row>
            </b-col>
            <b-col cols="6">
              <b-form-group
                label="Email Nhận Thông Báo"
                description="Cẩn thận gây nhức đầu,điền email ai nấy phải chịu,cách nhau bằng dấu , nếu muốn nhận nhiều"
              >
                <b-form-textarea
                  rows="8"
                  v-model="serverConfig.listEmail"
                  required
                ></b-form-textarea>
              </b-form-group>
            </b-col>
          </b-form-row>
        </b-col>
        <b-col cols="4">
          <b-row>
            <b-col cols="12">
              <b-row>
                <b-col cols="6">
                  <b-form-group
                    label="Copy Trade "
                    description="Mở Khung Copy Trade"
                  >
                    <b-form-checkbox
                      switch
                      v-model="serverConfig.enableCopyTrade"
                      required
                    ></b-form-checkbox>
                  </b-form-group>
                </b-col>
                <b-col cols="6">
                  <b-form-group
                    label="Thông Báo"
                    description="Gửi thông báo qua email khi có có order"
                  >
                    <b-form-checkbox
                      switch
                      v-model="serverConfig.enableNoticopyTrade"
                      required
                    ></b-form-checkbox>
                  </b-form-group>
                </b-col>
                <b-col cols="12">
                  <b-form-group
                    label="Email Nhận thông báo"
                    description="Danh sách email sẽ nhận thông báo khi có trade xảy ra"
                  >
                    <b-form-textarea
                      rows="8"
                      v-model="serverConfig.listEmailCopyTradeNoti"
                      required
                    ></b-form-textarea> </b-form-group
                ></b-col>
                <b-col cols="12">
                  <b-form-group
                    label="List Account(cẩn thận)"
                    description="Danh sách list account chủ chốt trade từ đó"
                  >
                    <b-form-textarea
                      rows="8"
                      v-model="serverConfig.listAccountCopyTrade"
                      required
                    ></b-form-textarea> </b-form-group
                ></b-col>
                <b-col cols="12">
                  <b-form-group
                    label="List Account Bot(cẩn thận)"
                    description="Danh sách list account sẽ nhận tín hiệu từ Copy Trade"
                  >
                    <b-form-textarea
                      rows="8"
                      v-model="serverConfig.listAccountCopyTradeClient"
                      required
                    ></b-form-textarea> </b-form-group
                ></b-col>
              </b-row>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
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
      thongkeacc: [],
      isOpen: true,
      calculatorValueStatusCheck: false,
      accountOrder: [],
      serverConfig: {
        enablePassword: false,
        sitePassword: "anhbaodeptraivodoi",
        delayScript: 20,
        delayClient: 5,
        period: 6,
        bblistWatch: true,
        pairList: [
          "RAYUSDT",
          "SUSHIUSDT",
          "CVCUSDT",
          "BTSUSDT",
          "HOTUSDT",
          "ZRXUSDT",
          "QTUMUSDT",
          "IOTAUSDT",
          "BTCBUSD",
          "WAVESUSDT",
          "ADAUSDT",
          "LITUSDT",
          "XTZUSDT",
          "BNBUSDT",
          "AKROUSDT",
          "HNTUSDT",
          "ETCUSDT",
          "XMRUSDT",
          "YFIUSDT",
          "FTTBUSD",
          "ETHUSDT",
          "ALICEUSDT",
          "ALPHAUSDT",
          "SFPUSDT",
          "REEFUSDT",
          "BATUSDT",
          "DOGEUSDT",
          "RLCUSDT",
          "TRXUSDT",
          "STORJUSDT",
          "SNXUSDT",
          "AUDIOUSDT",
          "XLMUSDT",
          "IOTXUSDT",
          "NEOUSDT",
          "UNIUSDT",
          "SANDUSDT",
          "DASHUSDT",
          "KAVAUSDT",
          "RUNEUSDT",
          "CTKUSDT",
          "LINKUSDT",
          "CELRUSDT",
          "RSRUSDT",
          "ADABUSD",
          "DGBUSDT",
          "SKLUSDT",
          "RENUSDT",
          "LPTUSDT",
          "TOMOUSDT",
          "MTLUSDT",
          "LTCUSDT",
          "DODOUSDT",
          "KSMUSDT",
          "EGLDUSDT",
          "BNBBUSD",
          "VETUSDT",
          "ONTUSDT",
          "IMXUSDT",
          "TRBUSDT",
          "MANAUSDT",
          "FLOWUSDT",
          "COTIUSDT",
          "CHRUSDT",
          "BAKEUSDT",
          "GRTUSDT",
          "FLMUSDT",
          "MASKUSDT",
          "EOSUSDT",
          "OGNUSDT",
          "SCUSDT",
          "BALUSDT",
          "STMXUSDT",
          "LUNAUSDT",
          "DENTUSDT",
          "KNCUSDT",
          "SRMUSDT",
          "ENJUSDT",
          "C98USDT",
          "ZENUSDT",
          "ATOMUSDT",
          "NEARUSDT",
          "SOLBUSD",
          "ENSUSDT",
          "BCHUSDT",
          "ATAUSDT",
          "IOSTUSDT",
          "HBARUSDT",
          "ZECUSDT",
          "TLMUSDT",
          "ANTUSDT",
          "ETHBUSD",
          "GALAUSDT",
          "AAVEUSDT",
          "GTCUSDT",
          "ALGOUSDT",
          "ICPUSDT",
          "LRCUSDT",
          "AVAXUSDT",
          "ARPAUSDT",
          "CELOUSDT",
          "ROSEUSDT",
          "MATICUSDT",
          "1INCHUSDT",
          "MKRUSDT",
          "PEOPLEUSDT",
          "THETAUSDT",
          "UNIUSDT",
          "LINAUSDT",
          "ARUSDT",
          "RVNUSDT",
          "FILUSDT",
          "NKNUSDT",
          "KLAYUSDT",
          "COMPUSDT",
          "SOLUSDT",
          "BTCUSDT",
          "OMGUSDT",
          "ICXUSDT",
          "BLZUSDT",
          "FTMUSDT",
          "YFIIUSDT",
          "BANDUSDT",
          "XRPBUSD",
          "DOGEBUSD",
          "XRPUSDT",
          "SXPUSDT",
          "CRVUSDT",
          "BELUSDT",
          "DOTUSDT",
          "XEMUSDT",
          "ONEUSDT",
          "ZILUSDT",
          "AXSUSDT",
          "DYDXUSDT",
          "OCEANUSDT",
          "CHZUSDT",
          "ANKRUSDT",
          "DUSKUSDT",
          "CTSIUSDT",
        ],

        rsi15m: 50,
        rsi5m: 20,
        volume: 1,
        bbperiod: 6,
        listEmail: "trinhminhbao@gmail.com",
        enaleNoti: false,
        rsi15mNoti: 80,
        rsi5mNoti: 90,
        enableCopyTrade: false,
        enableNoticopyTrade: false,
        listEmailCopyTradeNoti: [
          {
            name: "Bảo",
            email: "deptraivodoi_taigioivosong_numberonevutru@gmail.com",
          },
          {
            name: "kiên",
            email: "kienthichga100kg@gmail.com",
          },
          {
            name: "thành",
            email: "thanhuongruouthuavo@gmail.com",
          },
          ,
          {
            name: "thắng",
            email: "mtkscamtaocaodauthang@gmail.com",
          },
        ],
        listAccountCopyTradeClient: [
          {
            AccountName: "example",
            Exchange: "Binance",
            APIKey: "xxxx-xxxx-xxxx",
            APISerect: "xxxx-xxxx-xxxx",
          },
          {
            AccountName: "example",
            Exchange: "Binance",
            APIKey: "xxxx-xxxx-xxxx",
            APISerect: "xxxx-xxxx-xxxx",
          },
        ],
        listAccountCopyTrade: [
          {
            AccountName: "example",
            Exchange: "Binance",
            APIKey: "xxxx-xxxx-xxxx",
            APISerect: "xxxx-xxxx-xxxx",
          },
          {
            AccountName: "example",
            Exchange: "Binance",
            APIKey: "xxxx-xxxx-xxxx",
            APISerect: "xxxx-xxxx-xxxx",
          },
        ],
      },
      sortBy: "rsi15m",
      sortDesc: true,
      transProps: {
        name: "flip-list",
      },
      filterName: null,
      calculatorSymbol: null,
      calculatorValueStatus: false,
      calculatorItem: null,
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
        {
          key: "name",
          sortable: true,
          stickyColumn: true,
          isRowHeader: true,
          variant: "primary",
        },
        {
          key: "rsi15m",
          sortable: true,
          label: "RSI 15M",
          sortDirection: "desc",
          formatter: (value, key, item) => {
            return item.currentValue.rsi15m;
          },
          thClass: "myThClass",
          class: "myColCusName",
          sortByFormatted: true,
        },
        {
          key: "rsi5m",
          sortable: true,
          label: "RSI 5M",
          sortDirection: "desc",
          formatter: (value, key, item) => {
            return item.currentValue.rsi5m;
          },
          thClass: "myThClass",
          class: "myColCusName",
          sortByFormatted: true,
        },
        {
          key: "price",
          sortable: true,
          label: "Price",
          sortDirection: "desc",
          formatter: (value, key, item) => {
            return item.currentValue.last_tick.close;
          },
          sortByFormatted: true,
        },
        {
          key: "bb15m",
          sortable: true,
          label: "BB 15m",
          sortDirection: "desc",
          formatter: (value, key, item) => {
            return item.currentValue.last_tick.close;
          },
          sortByFormatted: true,
        },
        {
          key: "bb5m",
          sortable: true,
          label: "BB 5M",
          sortDirection: "desc",
          formatter: (value, key, item) => {
            return item.currentValue.last_tick.close;
          },
          sortByFormatted: true,
        },
        {
          key: "volume",
          sortable: true,
          label: "Volume",
          sortDirection: "desc",
          formatter: (value, key, item) => {
            return item.currentValue.last_tick.volume;
          },
          sortByFormatted: true,
        },
      ],
      fieldsBinanceWatchlist: [
        {
          key: "name",

          stickyColumn: true,
          isRowHeader: true,
          variant: "primary",
        },

        {
          key: "price",
          label: "Info",
          formatter: (value, key, item) => {
            return item.currentValue.last_tick.close;
          },
        },
        {
          key: "bb15m",
          label: "BB 15m",
        },
        {
          key: "bb5m",
          label: "BB 5M",
        },
        {
          key: "tool",

          label: "tool",
        },
      ],
      binanceWatchList: [],
      orderWatchList: [],
      fieldWatchList: [
        { key: "symbol", label: "Cặp" },
        {
          key: "entryPrice",
          label: "Giá Vào",
          formatter: (value, key, item) => {
            return parseFloat(value.toString()).toFixed(4);
          },
        },
        {
          key: "price_current",
          label: "Giá Hiện tại",
          formatter: (value, key, item) => {
            return parseFloat(value.toString());
          },
        },
        {
          key: "positionInitialMargin",
          label: "Vốn",
          formatter: (value, key, item) => {
            return parseFloat(value).toFixed(1);
          },
        },
        {
          key: "unrealizedProfit",
          label: "KQ",
          formatter: (value, key, item) => {
            return parseFloat(value).toFixed(1);
          },
        },
      ],
    };
  },
  computed: {
    getSumProfit() {
      let count = 0;
      this.getAccountThongKe.map((item) => {
        count += parseFloat(item.income);
      });
      return count.toFixed(0);
    },
    getBinanceWatchList() {
      //read from cookie
      let a = this.$cookies.get("watchList");
      if (!a) {
        this.$cookies.set("watchList", JSON.stringify([]));
      }
      a = JSON.parse(this.$cookies.get("watchList"));
      //  this.binanceWatchList = JSON.parse(a);
      let listWatch = [];
      this.listpair.map((item) => {
        a.map((item1Cookie) => {
          if (item1Cookie === item.name) {
            listWatch.push(item);
          }
        });
      });
      this.binanceWatchList = listWatch;
      return this.binanceWatchList;
    },
    getAccountThongKe() {
      let thongke = [];
      this.thongkeacc.map((item) => {
        let today = this.$moment();
        let tranTime = this.$moment(item.time);
        if (
          item.incomeType === "REALIZED_PNL" &&
          today.isSame(tranTime, "day")
        ) {
          thongke.push(item);
        }
      });
      return thongke;
    },
    getPairlist() {
      let newList = [];
      this.listpair.map((item) => {
        let volume = item.currentValue.last_tick.volume;
        if (
          item.currentValue.rsi15m >= this.rsi15mRule &&
          item.currentValue.rsi5m >= this.rsi5mRule &&
          volume >= this.volumeRule
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
    getThongKeAcc() {
      let url = "https://baotmrsi.herokuapp.com/getthongke";
      fetch(url)
        .then((data) => data.json())
        .then((data) => {
          this.thongkeacc = data;
        });
    },
    removeBBWatchList(item) {
      let name = item.name;
      let newList = [];
      this.binanceWatchList.filter((e) => {
        if (e.name != name) {
          newList.push(e);
        }
      });
      this.binanceWatchList = newList;
      let ListName = [];
      this.binanceWatchList.map((item) => {
        ListName.push(item.name);
      });
      this.$cookies.set("watchList", JSON.stringify(ListName));
    },
    addToBBWatchList(item) {
      let name = item.name;
      if (this.binanceWatchList.length > 0) {
        if (!this.binanceWatchList.filter((e) => e.name === name).length > 0) {
          this.binanceWatchList.push(item);
        } else {
          this.$bvToast.toast(`Mã token bạn chọn đã nằm trong watchlist`, {
            title: "Trùng mã",
            autoHideDelay: 2000,
            variant: "danger",
          });
        }
      } else {
        this.binanceWatchList.push(item);
      }
      //lưu vào cookie
      let ListName = [];
      this.binanceWatchList.map((item) => {
        ListName.push(item.name);
      });
      this.$cookies.set("watchList", JSON.stringify(ListName));
    },

    formatSoTien(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    calculatorValue(item) {
      this.calculatorSymbol = item.symbol;
      this.calculatorValueStatusCheck = false;
      this.calculatorValueStatus = true;
      fetch("https://baotmrsi.herokuapp.com/analyze?symbol=" + item.symbol)
        .then((data) => data.json())
        .then((data) => {
          console.log(data);
          let resultArray = [];
          let allKey;
          data.map((item) => {
            allKey = Object.keys(item);
          });

          allKey.map((item) => {
            let name = item; //abandonedbay
            let myObject = {};
            data.map((item1) => {
              myObject.name = name;
              myObject[item1.time] = item1[name];
            });
            resultArray.push(myObject);
          });
          resultArray = resultArray.filter((item) => {
            return item.name != "time";
          });

          this.calculatorValueStatus = true;
          this.calculatorItem = resultArray;
          this.calculatorValueStatusCheck = true;
        });
    },
    getData() {
      // this.dataReady = false;
      let url = "https://baotmrsi.herokuapp.com/rsi";
      //let url = "http://localhost:3000/rsi";
      console.log("fetch...");
      fetch(url)
        .then((data) => data.json())
        .then((data) => {
          // console.log(data);
          this.listpair = data;
          let urlUser = "https://baotmrsi.herokuapp.com/getAccount";
          fetch(urlUser)
            .then((data) => data.json())
            .then((data) => {
              this.accountOrder = data;
              let listOrder = data.positions.filter((item) => {
                if (
                  parseFloat(item.initialMargin) != 0 &&
                  parseFloat(item.maintMargin) != 0
                ) {
                  return true;
                } else {
                  return false;
                }
              });
              let _listOrder = [];
              this.listpair.map((item) => {
                listOrder.map((item1) => {
                  // console.log(item.currentValue.last_tick);
                  if (item.currentValue.name === item1.symbol) {
                    _listOrder.push({
                      ...item1,
                      price_current: item.currentValue.last_tick.close,
                    });
                  }
                });
              });
              this.orderWatchList = _listOrder;
              let listDualOrder = [];
              this.orderWatchList.map((item) => {
                listDualOrder.push(item.symbol);
              });
              this.$cookies.set(
                "watchListAccount",
                JSON.stringify(listDualOrder)
              );
            });

          this.dataReady = true;
        });
      //fetch userdata
    },
  },
};
</script>
<style scoped>
table .flip-list-move {
  transition: transform 1s;
}
.namePairList {
  font-weight: 700;
}
.namePairList:hover {
  color: red;
  cursor: pointer;
}
.addToBBPairList {
  color: blue;
  font-weight: 800;
}
.addToBBPairList:hover {
  color: red;
  cursor: pointer;
}
.tableInfo thead > tr {
  padding: 100px !important;
}
.myPaddingHead {
  padding: 10px !important;
}
.myColCus {
  max-width: 300px !important;
  min-width: 200px !important;
}
.myColCusName {
  max-width: 200px !important;
  min-width: 200px !important;
}

.myColCus {
  max-width: 300px !important;
  min-width: 200px !important;
}
.myColCusName {
  max-width: 200px !important;
  min-width: 200px !important;
}
.myColCus:hover,
.myColCusName:hover {
  background-color: #b8daff;
  color: crimson;
  cursor: pointer;
}

.myThClass {
  font-size: 15px !important;
  font-weight: bold;
  min-width: 120px;
  max-width: 120px;
  padding: 0.8rem !important;
}
.linkBinance {
  color: blue;
}
.linkBinance:hover {
  color: yellow;
  cursor: pointer;
}
.watchList:hover {
  color: rgb(0, 255, 60);
  background: red;
  cursor: pointer;
}
.sideBarOrder {
  color: red;
}
.sideBarOrder:hover {
  color: green;
  cursor: pointer;
}

@keyframes blinker {
  50% {
    opacity: 0;
  }
}
.vebo {
  animation: blinker 1s linear infinite;
  color: white;
  text-align: right;
  background-color: green;
}
.no_c {
  color: white;
  background-color: red;
  padding: 2px;
}
.yes_c {
  animation: blinker 1s linear infinite;
  color: white;
  padding: 2px;
  background-color: green;
}
.no_c:hover,
.yes_c:hover {
  cursor: pointer;
  background-color: rgb(16, 214, 181);
}
</style>
