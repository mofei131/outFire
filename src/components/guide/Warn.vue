<template>
  <div class="warnPage">
    <dv-border-box-1 class="box1" style="overflow: hidden;">
      <!-- <div class="testText">1123-{{warnDataSingle}}</div> -->
      <div class="warnBorder">
        <div class="warnGroup">
          <div class="warnTitle">
            <span>报警信息</span>
            <dv-decoration-5
              style="width:50%;height:2.5vh;position: absolute;left:50%; transform: translateX(-50%)"
            />
          </div>
          <div class="warnCompany">
            <div class="warnCompanyName">报警单位</div>
            <div class="warnCompanyNumberGroup">
              <div class="warnCompanyNumber">{{warnPositon.length}}</div>
              <div class="warnCompanyFooter">个</div>
            </div>
          </div>
          <vue-seamless-scroll
            :data="warnPositon"
            :class-option="optionSetting"
            class="vue-seamless-scroll"
            @click.native="parentClick"
          >
            <div
              class="warnListBorder"
              v-for="(item,index) in warnPositon"
              :key="item.id"
              style="width:45vh"
              :data-id="item.id"
            >
              <!-- <div>
                <img width="20px" height="20px" class="img" src="/img/baojing.jpg" alt />
              </div> -->
              <div class="warnAddress" :data-id="item.id">{{item.value}}</div>
              <div class="warnText">
                <div class="warnName" :data-id="item.id">异常设备</div>
                <div class="warnNameNumberGroup">
                  <div class="warnNumber" :data-id="item.id">{{item.value.length}}</div>
                  <div class="warnNameFooter" :data-id="item.id">个</div>
                </div>
              </div>
            </div>
          </vue-seamless-scroll>
        </div>
      </div>
    </dv-border-box-1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      warnDataSingle: "",
      position: [
        {
          id: 1,
          lng: 87.578433,
          lat: 43.836134,
          value: "乌鲁木齐测试企业1",
          show: false,
          type: 1,
          warnData: [
            { code: 111, status: false },
            { code: 222, status: false },
            { code: 1515, status: false }
          ],
          mt: [
            { name: "手提式干粉灭火器", number: 30 },
            { name: "手提式二氧化碳灭火器", number: 20 },
            { name: "手提式泡沫灭火器", number: 50 },
            { name: "手提式水基型灭火器", number: 50 },
            { name: "手提式卤代烷灭火器", number: 20 },
            { name: "推车式干粉灭火器", number: 30 },
            { name: "推车式二氧化碳灭火器", number: 70 },
            { name: "推车式泡沫灭火器", number: 10 },
            { name: "推车式水基型灭火器", number: 40 },
            { name: "推车式卤代烷灭火器", number: 30 }
          ]
        },
        {
          id: 2,
          lng: 87.613796,
          lat: 43.784601,
          value: "乌鲁木齐测试企业2",
          show: false,
          type: 1,
          warnData: [
            { code: 333, status: false },
            { code: 444, status: false },
            { code: 1616, status: false }
          ],
          mt: [
            { name: "手提式干粉灭火器", number: 30 },
            { name: "手提式二氧化碳灭火器", number: 20 },
            { name: "手提式泡沫灭火器", number: 50 },
            { name: "手提式水基型灭火器", number: 50 },
            { name: "手提式卤代烷灭火器", number: 20 },
            { name: "推车式干粉灭火器", number: 30 },
            { name: "推车式二氧化碳灭火器", number: 70 },
            { name: "推车式泡沫灭火器", number: 10 },
            { name: "推车式水基型灭火器", number: 40 },
            { name: "推车式卤代烷灭火器", number: 30 }
          ]
        },
        {
          id: 3,
          lng: 87.621005,
          lat: 43.764521,
          value: "乌鲁木齐测试企业3",
          show: false,
          type: 2,
          warnData: [
            { code: 555, status: false },
            { code: 666, status: false }
          ],
          mt: [
            { name: "手提式干粉灭火器", number: 30 },
            { name: "手提式二氧化碳灭火器", number: 20 },
            { name: "手提式泡沫灭火器", number: 50 },
            { name: "手提式水基型灭火器", number: 50 },
            { name: "手提式卤代烷灭火器", number: 20 },
            { name: "推车式干粉灭火器", number: 30 },
            { name: "推车式二氧化碳灭火器", number: 70 },
            { name: "推车式泡沫灭火器", number: 10 },
            { name: "推车式水基型灭火器", number: 40 },
            { name: "推车式卤代烷灭火器", number: 30 }
          ]
        },
        {
          id: 4,
          lng: 87.706836,
          lat: 43.803187,
          value: "乌鲁木齐测试企业4",
          show: false,
          type: 2,
          warnData: [
            { code: 777, status: false },
            { code: 888, status: false }
          ],
          mt: [
            { name: "手提式干粉灭火器", number: 30 },
            { name: "手提式二氧化碳灭火器", number: 20 },
            { name: "手提式泡沫灭火器", number: 50 },
            { name: "手提式水基型灭火器", number: 50 },
            { name: "手提式卤代烷灭火器", number: 20 },
            { name: "推车式干粉灭火器", number: 30 },
            { name: "推车式二氧化碳灭火器", number: 70 },
            { name: "推车式泡沫灭火器", number: 10 },
            { name: "推车式水基型灭火器", number: 40 },
            { name: "推车式卤代烷灭火器", number: 30 }
          ]
        },
        {
          id: 5,
          lng: 87.526592,
          lat: 43.841334,
          value: "乌鲁木齐测试企业5",
          show: false,
          type: 3,
          warnData: [
            { code: 999, status: false },
            { code: 1010, status: false },
            { code: 1212, status: false },
            { code: 1414, status: false }
          ],
          mt: [
            { name: "手提式干粉灭火器", number: 30 },
            { name: "手提式二氧化碳灭火器", number: 20 },
            { name: "手提式泡沫灭火器", number: 50 },
            { name: "手提式水基型灭火器", number: 50 },
            { name: "手提式卤代烷灭火器", number: 20 },
            { name: "推车式干粉灭火器", number: 30 },
            { name: "推车式二氧化碳灭火器", number: 70 },
            { name: "推车式泡沫灭火器", number: 10 },
            { name: "推车式水基型灭火器", number: 40 },
            { name: "推车式卤代烷灭火器", number: 30 }
          ]
        },
        {
          id: 6,
          lng: 87.504276,
          lat: 43.83861,
          value: "乌鲁木齐测试企业6",
          show: false,
          type: 4,
          warnData: [{ code: 1111, status: false }],
          mt: [
            { name: "手提式干粉灭火器", number: 30 },
            { name: "手提式二氧化碳灭火器", number: 20 },
            { name: "手提式泡沫灭火器", number: 50 },
            { name: "手提式水基型灭火器", number: 50 },
            { name: "手提式卤代烷灭火器", number: 20 },
            { name: "推车式干粉灭火器", number: 30 },
            { name: "推车式二氧化碳灭火器", number: 70 },
            { name: "推车式泡沫灭火器", number: 10 },
            { name: "推车式水基型灭火器", number: 40 },
            { name: "推车式卤代烷灭火器", number: 30 }
          ]
        },

        // 阿克苏
        {
          id: 7,
          lng: 80.267823,
          lat: 41.171978,
          value: "阿克苏测试企业7",
          show: false,
          type: 3,
          warnData: [
            { code: 999, status: false },
            { code: 1010, status: false },
            { code: 1212, status: false },
            { code: 1414, status: false }
          ],
          mt: [
            { name: "手提式干粉灭火器", number: 30 },
            { name: "手提式二氧化碳灭火器", number: 20 },
            { name: "手提式泡沫灭火器", number: 50 },
            { name: "手提式水基型灭火器", number: 50 },
            { name: "手提式卤代烷灭火器", number: 20 },
            { name: "推车式干粉灭火器", number: 30 },
            { name: "推车式二氧化碳灭火器", number: 70 },
            { name: "推车式泡沫灭火器", number: 10 },
            { name: "推车式水基型灭火器", number: 40 },
            { name: "推车式卤代烷灭火器", number: 30 }
          ]
        },
        {
          id: 8,
          lng: 80.291083,
          lat: 41.264237,
          value: "阿克苏测试企业8",
          show: false,
          type: 3,
          warnData: [
            { code: 999, status: false },
            { code: 1010, status: false },
            { code: 1212, status: false },
            { code: 1414, status: false }
          ],
          mt: [
            { name: "手提式干粉灭火器", number: 30 },
            { name: "手提式二氧化碳灭火器", number: 20 },
            { name: "手提式泡沫灭火器", number: 50 },
            { name: "手提式水基型灭火器", number: 50 },
            { name: "手提式卤代烷灭火器", number: 20 },
            { name: "推车式干粉灭火器", number: 30 },
            { name: "推车式二氧化碳灭火器", number: 70 },
            { name: "推车式泡沫灭火器", number: 10 },
            { name: "推车式水基型灭火器", number: 40 },
            { name: "推车式卤代烷灭火器", number: 30 }
          ]
        },

        // 阿勒泰
        {
          id: 9,
          lng: 88.131819,
          lat: 47.827053,
          value: "阿勒泰测试企业9",
          show: false,
          type: 3,
          warnData: [
            { code: 999, status: false },
            { code: 1010, status: false },
            { code: 1212, status: false },
            { code: 1414, status: false }
          ],
          mt: [
            { name: "手提式干粉灭火器", number: 30 },
            { name: "手提式二氧化碳灭火器", number: 20 },
            { name: "手提式泡沫灭火器", number: 50 },
            { name: "手提式水基型灭火器", number: 50 },
            { name: "手提式卤代烷灭火器", number: 20 },
            { name: "推车式干粉灭火器", number: 30 },
            { name: "推车式二氧化碳灭火器", number: 70 },
            { name: "推车式泡沫灭火器", number: 10 },
            { name: "推车式水基型灭火器", number: 40 },
            { name: "推车式卤代烷灭火器", number: 30 }
          ]
        },
        {
          id: 10,
          lng: 88.134137,
          lat: 47.816277,
          value: "阿勒泰测试企业10",
          show: false,
          type: 3,
          warnData: [
            { code: 999, status: false },
            { code: 1010, status: false },
            { code: 1212, status: false },
            { code: 1414, status: false }
          ],
          mt: [
            { name: "手提式干粉灭火器", number: 30 },
            { name: "手提式二氧化碳灭火器", number: 20 },
            { name: "手提式泡沫灭火器", number: 50 },
            { name: "手提式水基型灭火器", number: 50 },
            { name: "手提式卤代烷灭火器", number: 20 },
            { name: "推车式干粉灭火器", number: 30 },
            { name: "推车式二氧化碳灭火器", number: 70 },
            { name: "推车式泡沫灭火器", number: 10 },
            { name: "推车式水基型灭火器", number: 40 },
            { name: "推车式卤代烷灭火器", number: 30 }
          ]
        },

        // 昌吉
        {
          id: 11,
          lng: 87.31723,
          lat: 44.005124,
          value: "昌吉测试企业11",
          show: false,
          type: 3,
          warnData: [
            { code: 999, status: false },
            { code: 1010, status: false },
            { code: 1212, status: false },
            { code: 1414, status: false }
          ],
          mt: [
            { name: "手提式干粉灭火器", number: 30 },
            { name: "手提式二氧化碳灭火器", number: 20 },
            { name: "手提式泡沫灭火器", number: 50 },
            { name: "手提式水基型灭火器", number: 50 },
            { name: "手提式卤代烷灭火器", number: 20 },
            { name: "推车式干粉灭火器", number: 30 },
            { name: "推车式二氧化碳灭火器", number: 70 },
            { name: "推车式泡沫灭火器", number: 10 },
            { name: "推车式水基型灭火器", number: 40 },
            { name: "推车式卤代烷灭火器", number: 30 }
          ]
        },
        {
          id: 12,
          lng: 87.28603,
          lat: 44.007964,
          value: "昌吉测试企业12",
          show: false,
          type: 3,
          warnData: [
            { code: 999, status: false },
            { code: 1010, status: false },
            { code: 1212, status: false },
            { code: 1414, status: false }
          ],
          mt: [
            { name: "手提式干粉灭火器", number: 30 },
            { name: "手提式二氧化碳灭火器", number: 20 },
            { name: "手提式泡沫灭火器", number: 50 },
            { name: "手提式水基型灭火器", number: 50 },
            { name: "手提式卤代烷灭火器", number: 20 },
            { name: "推车式干粉灭火器", number: 30 },
            { name: "推车式二氧化碳灭火器", number: 70 },
            { name: "推车式泡沫灭火器", number: 10 },
            { name: "推车式水基型灭火器", number: 40 },
            { name: "推车式卤代烷灭火器", number: 30 }
          ]
        },

        // 克拉玛依
        {
          id: 13,
          lng: 84.903128,
          lat: 45.585952,
          value: "克拉玛依测试企业13",
          show: false,
          type: 3,
          warnData: [
            { code: 999, status: false },
            { code: 1010, status: false },
            { code: 1212, status: false },
            { code: 1414, status: false }
          ],
          mt: [
            { name: "手提式干粉灭火器", number: 30 },
            { name: "手提式二氧化碳灭火器", number: 20 },
            { name: "手提式泡沫灭火器", number: 50 },
            { name: "手提式水基型灭火器", number: 50 },
            { name: "手提式卤代烷灭火器", number: 20 },
            { name: "推车式干粉灭火器", number: 30 },
            { name: "推车式二氧化碳灭火器", number: 70 },
            { name: "推车式泡沫灭火器", number: 10 },
            { name: "推车式水基型灭火器", number: 40 },
            { name: "推车式卤代烷灭火器", number: 30 }
          ]
        },
        {
          id: 14,
          lng: 84.889138,
          lat: 45.555189,
          value: "克拉玛依测试企业14",
          show: false,
          type: 3,
          warnData: [
            { code: 999, status: false },
            { code: 1010, status: false },
            { code: 1212, status: false },
            { code: 1414, status: false }
          ],
          mt: [
            { name: "手提式干粉灭火器", number: 30 },
            { name: "手提式二氧化碳灭火器", number: 20 },
            { name: "手提式泡沫灭火器", number: 50 },
            { name: "手提式水基型灭火器", number: 50 },
            { name: "手提式卤代烷灭火器", number: 20 },
            { name: "推车式干粉灭火器", number: 30 },
            { name: "推车式二氧化碳灭火器", number: 70 },
            { name: "推车式泡沫灭火器", number: 10 },
            { name: "推车式水基型灭火器", number: 40 },
            { name: "推车式卤代烷灭火器", number: 30 }
          ]
        },

        // 石河子
        {
          id: 15,
          lng: 86.039857,
          lat: 44.302041,
          value: "石河子测试企业15",
          show: false,
          type: 3,
          warnData: [
            { code: 999, status: false },
            { code: 1010, status: false },
            { code: 1212, status: false },
            { code: 1414, status: false }
          ],
          mt: [
            { name: "手提式干粉灭火器", number: 30 },
            { name: "手提式二氧化碳灭火器", number: 20 },
            { name: "手提式泡沫灭火器", number: 50 },
            { name: "手提式水基型灭火器", number: 50 },
            { name: "手提式卤代烷灭火器", number: 20 },
            { name: "推车式干粉灭火器", number: 30 },
            { name: "推车式二氧化碳灭火器", number: 70 },
            { name: "推车式泡沫灭火器", number: 10 },
            { name: "推车式水基型灭火器", number: 40 },
            { name: "推车式卤代烷灭火器", number: 30 }
          ]
        },
        {
          id: 16,
          lng: 86.080841,
          lat: 44.30497,
          value: "石河子测试企业16",
          show: false,
          type: 3,
          warnData: [
            { code: 999, status: false },
            { code: 1010, status: false },
            { code: 1212, status: false },
            { code: 1414, status: false }
          ],
          mt: [
            { name: "手提式干粉灭火器", number: 30 },
            { name: "手提式二氧化碳灭火器", number: 20 },
            { name: "手提式泡沫灭火器", number: 50 },
            { name: "手提式水基型灭火器", number: 50 },
            { name: "手提式卤代烷灭火器", number: 20 },
            { name: "推车式干粉灭火器", number: 30 },
            { name: "推车式二氧化碳灭火器", number: 70 },
            { name: "推车式泡沫灭火器", number: 10 },
            { name: "推车式水基型灭火器", number: 40 },
            { name: "推车式卤代烷灭火器", number: 30 }
          ]
        },

        // 库尔勒
        {
          id: 17,
          lng: 86.161243,
          lat: 41.742007,
          value: "库尔勒测试企业17",
          show: false,
          type: 3,
          warnData: [
            { code: 999, status: false },
            { code: 1010, status: false },
            { code: 1212, status: false },
            { code: 1414, status: false }
          ],
          mt: [
            { name: "手提式干粉灭火器", number: 30 },
            { name: "手提式二氧化碳灭火器", number: 20 },
            { name: "手提式泡沫灭火器", number: 50 },
            { name: "手提式水基型灭火器", number: 50 },
            { name: "手提式卤代烷灭火器", number: 20 },
            { name: "推车式干粉灭火器", number: 30 },
            { name: "推车式二氧化碳灭火器", number: 70 },
            { name: "推车式泡沫灭火器", number: 10 },
            { name: "推车式水基型灭火器", number: 40 },
            { name: "推车式卤代烷灭火器", number: 30 }
          ]
        },
        {
          id: 18,
          lng: 86.144764,
          lat: 41.745209,
          value: "库尔勒测试企业18",
          show: false,
          type: 3,
          warnData: [
            { code: 999, status: false },
            { code: 1010, status: false },
            { code: 1212, status: false },
            { code: 1414, status: false }
          ],
          mt: [
            { name: "手提式干粉灭火器", number: 30 },
            { name: "手提式二氧化碳灭火器", number: 20 },
            { name: "手提式泡沫灭火器", number: 50 },
            { name: "手提式水基型灭火器", number: 50 },
            { name: "手提式卤代烷灭火器", number: 20 },
            { name: "推车式干粉灭火器", number: 30 },
            { name: "推车式二氧化碳灭火器", number: 70 },
            { name: "推车式泡沫灭火器", number: 10 },
            { name: "推车式水基型灭火器", number: 40 },
            { name: "推车式卤代烷灭火器", number: 30 }
          ]
        },

        //伊犁
        {
          id: 19,
          lng: 81.29975,
          lat: 43.925915,
          value: "伊利测试企业19",
          show: false,
          type: 3,
          warnData: [
            { code: 999, status: false },
            { code: 1010, status: false },
            { code: 1212, status: false },
            { code: 1414, status: false }
          ],
          mt: [
            { name: "手提式干粉灭火器", number: 30 },
            { name: "手提式二氧化碳灭火器", number: 20 },
            { name: "手提式泡沫灭火器", number: 50 },
            { name: "手提式水基型灭火器", number: 50 },
            { name: "手提式卤代烷灭火器", number: 20 },
            { name: "推车式干粉灭火器", number: 30 },
            { name: "推车式二氧化碳灭火器", number: 70 },
            { name: "推车式泡沫灭火器", number: 10 },
            { name: "推车式水基型灭火器", number: 40 },
            { name: "推车式卤代烷灭火器", number: 30 }
          ]
        },
        {
          id: 20,
          lng: 81.281554,
          lat: 43.928512,
          value: "伊利测试企业20",
          show: false,
          type: 3,
          warnData: [
            { code: 999, status: false },
            { code: 1010, status: false },
            { code: 1212, status: false },
            { code: 1414, status: false }
          ],
          mt: [
            { name: "手提式干粉灭火器", number: 30 },
            { name: "手提式二氧化碳灭火器", number: 20 },
            { name: "手提式泡沫灭火器", number: 50 },
            { name: "手提式水基型灭火器", number: 50 },
            { name: "手提式卤代烷灭火器", number: 20 },
            { name: "推车式干粉灭火器", number: 30 },
            { name: "推车式二氧化碳灭火器", number: 70 },
            { name: "推车式泡沫灭火器", number: 10 },
            { name: "推车式水基型灭火器", number: 40 },
            { name: "推车式卤代烷灭火器", number: 30 }
          ]
        },

        //塔城
        {
          id: 21,
          lng: 82.974467,
          lat: 46.749777,
          value: "塔城测试企业21",
          show: false,
          type: 3,
          warnData: [
            { code: 999, status: false },
            { code: 1010, status: false },
            { code: 1212, status: false },
            { code: 1414, status: false }
          ],
          mt: [
            { name: "手提式干粉灭火器", number: 30 },
            { name: "手提式二氧化碳灭火器", number: 20 },
            { name: "手提式泡沫灭火器", number: 50 },
            { name: "手提式水基型灭火器", number: 50 },
            { name: "手提式卤代烷灭火器", number: 20 },
            { name: "推车式干粉灭火器", number: 30 },
            { name: "推车式二氧化碳灭火器", number: 70 },
            { name: "推车式泡沫灭火器", number: 10 },
            { name: "推车式水基型灭火器", number: 40 },
            { name: "推车式卤代烷灭火器", number: 30 }
          ]
        },
        {
          id: 22,
          lng: 82.998843,
          lat: 46.741396,
          value: "塔城测试企业22",
          show: false,
          type: 3,
          warnData: [
            { code: 999, status: false },
            { code: 1010, status: false },
            { code: 1212, status: false },
            { code: 1414, status: false }
          ],
          mt: [
            { name: "手提式干粉灭火器", number: 30 },
            { name: "手提式二氧化碳灭火器", number: 20 },
            { name: "手提式泡沫灭火器", number: 50 },
            { name: "手提式水基型灭火器", number: 50 },
            { name: "手提式卤代烷灭火器", number: 20 },
            { name: "推车式干粉灭火器", number: 30 },
            { name: "推车式二氧化碳灭火器", number: 70 },
            { name: "推车式泡沫灭火器", number: 10 },
            { name: "推车式水基型灭火器", number: 40 },
            { name: "推车式卤代烷灭火器", number: 30 }
          ]
        },

        // 喀什
        {
          id: 23,
          lng: 75.997828,
          lat: 39.465504,
          value: "喀什测试企业23",
          show: false,
          type: 3,
          warnData: [
            { code: 999, status: false },
            { code: 1010, status: false },
            { code: 1212, status: false },
            { code: 1414, status: false }
          ],
          mt: [
            { name: "手提式干粉灭火器", number: 30 },
            { name: "手提式二氧化碳灭火器", number: 20 },
            { name: "手提式泡沫灭火器", number: 50 },
            { name: "手提式水基型灭火器", number: 50 },
            { name: "手提式卤代烷灭火器", number: 20 },
            { name: "推车式干粉灭火器", number: 30 },
            { name: "推车式二氧化碳灭火器", number: 70 },
            { name: "推车式泡沫灭火器", number: 10 },
            { name: "推车式水基型灭火器", number: 40 },
            { name: "推车式卤代烷灭火器", number: 30 }
          ]
        },
        {
          id: 24,
          lng: 75.984117,
          lat: 39.463384,
          value: "喀什测试企业24",
          show: false,
          type: 3,
          warnData: [
            { code: 999, status: false },
            { code: 1010, status: false },
            { code: 1212, status: false },
            { code: 1414, status: false }
          ],
          mt: [
            { name: "手提式干粉灭火器", number: 30 },
            { name: "手提式二氧化碳灭火器", number: 20 },
            { name: "手提式泡沫灭火器", number: 50 },
            { name: "手提式水基型灭火器", number: 50 },
            { name: "手提式卤代烷灭火器", number: 20 },
            { name: "推车式干粉灭火器", number: 30 },
            { name: "推车式二氧化碳灭火器", number: 70 },
            { name: "推车式泡沫灭火器", number: 10 },
            { name: "推车式水基型灭火器", number: 40 },
            { name: "推车式卤代烷灭火器", number: 30 }
          ]
        }
      ]
    };
  },
  components: {},
  // props: ["position"],
  computed: {
    warnPositon() {
      return this.position;
    },

    optionSetting() {
      return {
        step: 0.3, // 数值越大速度滚动越快
        limitMoveNum: 2, // 开始无缝滚动的数据量 this.dataList.length
        hoverStop: true, // 是否开启鼠标悬停stop
        direction: 1, // 0向下 1向上 2向左 3向右
        openWatch: true, // 开启数据实时监控刷新dom
        singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        waitTime: 1000 // 单步运动停止的时间(默认值1000ms)
      };
    }
  },
  methods: {
    sendWarn(id) {
      this.warnDataSingle = this.warnPositon.filter(item => {
        return item.id === id;
      });
      console.log(id);
      this.$emit("sendWarnData", this.warnDataSingle);
    },

    parentClick(e) {
      console.log(e.target.dataset.id);
      this.warnDataSingle = this.warnPositon.filter(item => {
        return item.id === e.target.dataset.id * 1;
      });

      this.$emit("sendWarnData", this.warnDataSingle);
    }
  }
};
</script>

<style scoped>

.testText {
  color: #ffffff;
}
.warnGroup {
  background-color: rgba(17, 57, 125, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1.2rem;
  color: #ffffff;
  height: 25vh;
}

.warnBorder {
  /* padding: 6px 10px 6px 10px; */
  padding: 0.6vh 0.2vh 0.6vh 0.2vh;
}

.warnTitle {
  padding: 1vh 0;
  color: #1dc1f5;
  /* font-weight: bold; */
  font-size: 1.2rem;
  width: 100%;
  text-align: center;
  /* border: 1px solid; */
  position: relative;
}
.warnTitle span {
}

.warnCompanyName {
  font-size: 1rem;
}

.warnCompany {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
}

.warnCompanyNumberGroup {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}

.warnCompanyNumber {
  margin: 0 1.3vh;
  color: #ff0000;
  font-weight: bold;
  font-family: DS-DIGI;
  font-size: 1.8rem;
}

.warnListBorder {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  /* border: 1.5px solid #ccc; */
  border-radius: 10px;
  /* padding: 5px 0; */
  align-items: center;
  margin-bottom: 10px;
  font-size: 1rem;
}

.warnText {
  width: 45%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.warnNameNumberGroup {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
}

.warnNumber {
  margin: 0 5px;
  font-size: 35px;
  color: #ff0000;
  font-weight: bold;
  font-family: DS-DIGI;
  font-size: 1.2rem;
}

.vue-seamless-scroll {
  overflow: hidden;
}
</style>
