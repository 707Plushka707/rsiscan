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
              <h2 class="page-title">Dashboard</h2>
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
                      thead-class="myThClass"
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
                  <b-col col lg="3" md="12" sm="12">
                    <b-row>
                      <b-col cols="12"> </b-col>
                      <b-col cols="12">
                        <b-table
                          outlined
                          head-variant="dark"
                          class="text-center"
                          striped
                          hover
                          :items="orderWatchList"
                          :fields="fieldsCopyTradeWatchlist"
                          show-empty
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
import widget from "../components/widget.vue";
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
  components: { widget },
  name: "IndexPage",
  data() {
    return {
      isOpen: true,
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
      fieldsCopyTradeWatchlist: [
        { key: "#" },
        { key: "name" },
        {
          key: "TT",
        },
      ],
    };
  },
  computed: {
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
}
.watchList:hover {
  color: rgb(0, 255, 60);
  background: red;
  cursor: pointer;
}
</style>
