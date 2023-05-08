<template>
  <div class="dashboard-container">
    <div class="activity-qps-info-card" style="margin-top: 30px;">
      <el-card>
        <el-row class="panel-group" :gutter="40">
          <el-col :span="8" class="card-panel-col">
            <div class="card-panel">
              <div class="card-panel-icon-wrapper icon-people">
                <svg-icon icon-class="peoples" class-name="card-panel-icon" />
              </div>
              <div class="card-panel-description">
                <div class="card-panel-text">登录用户数</div>
                <count-to
                  class="card-panel-num"
                  separator=""
                  :startVal="onlineNumStart"
                  :endVal="onlineNum"
                  :duration="8000"
                ></count-to>
              </div>
            </div>
          </el-col>
          <el-col :span="8" class="card-panel-col">
            <div class="card-panel">
              <div class="card-panel-icon-wrapper icon-money">
                <svg-icon icon-class="money" class-name="card-panel-icon" />
              </div>
              <el-row>
                <div class="card-panel-description">
                  <div class="card-panel-text" title="以订单为维度进行统计,不包含用户背包礼物">
                    订单总额 (Today / Yesterday)
                  </div>
                  <count-to
                    class="card-panel-num"
                    :decimals="1"
                    separator=""
                    :startVal="incomeDataStart.total_income.today"
                    :endVal="incomeData.total_income.today"
                    :duration="6000"
                  ></count-to>
                  /
                  <count-to
                    class="card-panel-num"
                    :decimals="1"
                    separator=""
                    :startVal="0"
                    :endVal="incomeData.total_income.yesterday"
                    :duration="6000"
                  ></count-to>
                </div>
              </el-row>
            </div>
          </el-col>
          <el-col :span="8" class="card-panel-col">
            <div class="card-panel">
              <div class="card-panel-icon-wrapper icon-shoppingCard">
                <svg-icon icon-class="shoppingCard" class-name="card-panel-icon" />
              </div>
              <div class="card-panel-description">
                <div class="card-panel-text" title="以订单为维度进行统计,不包含用户背包礼物">
                  订单总数 (Today / Yesterday)
                </div>
                <count-to
                  class="card-panel-num"
                  separator=""
                  :startVal="incomeDataStart.total_num.today"
                  :endVal="incomeData.total_num.today"
                  :duration="6000"
                ></count-to>
                /
                <count-to
                  class="card-panel-num"
                  separator=""
                  :startVal="0"
                  :endVal="incomeData.total_num.yesterday"
                  :duration="6000"
                ></count-to>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-card>
      <el-card shadow="never">
        <div slot="header">
          <span>实时送礼消息数（分钟）</span>
        </div>
        <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
          <line-chart :chart-data="chartData"></line-chart>
        </el-row>
      </el-card>
      <el-card shadow="never">
        <div slot="header">
          <span>送礼日志统计（最近15min）</span>
        </div>
        <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
          <line-chart :chart-data="getSendGiftQpsData"></line-chart>
        </el-row>
      </el-card>
      <el-card shadow="never">
        <div slot="header">
          <span>消息处理统计（最近15min）</span>
        </div>
        <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
          <line-chart :chart-data="chartDataHistory"></line-chart>
        </el-row>
      </el-card>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CountTo from 'vue-count-to'
import {
  getMsgInfoByMinAction,
  getMsgInfoByMinHistoryAction,
  getIncomeStatInfoAction,
  getUserOnlineStatAction,
  getSendGiftQpsAction
} from '../../api/report'
import LineChart from '../dashboard/admin/components/LineChart'

export default {
  name: 'dashboard',
  components: {
    CountTo,
    LineChart,
  },
  data() {
    return {
      onlineNum: 0,
      onlineNumStart: 0,
      incomeDataStart: {
        total_income: {
          today: 0,
          yesterday: 0
        },
        total_num: {
          today: 0,
          yesterday: 0
        }
      },
      incomeData: {
        total_income: { today: 0, yesterday: 0 },
        total_num: { today: 0, yesterday: 0 }
      },
      chartData: {
        xData: [],
        yData: [
          {
            title: '礼物消息数(已处理)',
            type: 'line',
            color: '#43a175',
            data: []
          },
          {
            title: '礼物消息数(生产)',
            type: 'line',
            color: '#f08388',
            data: []
          }
        ]
      },
      getSendGiftQpsData: {
        xData: [],
        yData: [
          {
            title: '总赠送QPS',
            type: 'line',
            color: '#e77dc9',
            data: []
          },
          {
            title: '奇豆赠送QPS',
            type: 'bar',
            stack: 'qps',
            color: '#acde9c',
            data: []
          },
          {
            title: '钻石赠送QPS',
            type: 'bar',
            stack: 'qps',
            color: '#90d5f1',
            data: []
          },
          {
            title: '奇点赠送QPS',
            type: 'bar',
            stack: 'qps',
            color: '#f2cb7d',
            data: []
          }
        ]
      },
      chartDataHistory: {
        xData: [],
        yData: [
          {
            title: '礼物消息数(已处理)',
            type: 'bar',
            color: '#faa722',
            stack: 'msg_history',
            data: []
          }
        ]
      }
    }
  },

  mounted() {
    this.getMsgInfoByMin();
    this.getSendGiftQpsStat();
    this.getMsgInfoByMinHistory();
    this.getIncomeStatInfo();
    this.getUserOnlineStatInfo();

    // 定时任务
    this.getMsgInfoByMinIntervalId = setInterval(() => {
      this.getMsgInfoByMin()
    }, 3000)
    this.getSendGiftQpsStatIntervalId = setInterval(() => {
      this.getSendGiftQpsStat()
    }, 10000)
    this.getMsgInfoByMinHistoryIntervalId = setInterval(() => {
      this.getMsgInfoByMinHistory()
    }, 10000)
    // 收入统计
    this.getIncomeStatInfoIntervalId = setInterval(() => {
      this.getIncomeStatInfo()
    }, 7000)
    // 登录用户
    this.getUserOnlineStatInfoIntervalId = setInterval(() => {
      this.getUserOnlineStatInfo()
    }, 10000)
  },

  beforeDestroy() {
    // 销毁定时任务
    clearInterval(this.getMsgInfoByMinIntervalId)
    clearInterval(this.getSendGiftQpsStatIntervalId)
    clearInterval(this.getMsgInfoByMinHistoryIntervalId)
    clearInterval(this.getIncomeStatInfoIntervalId)
    clearInterval(this.getUserOnlineStatInfoIntervalId)
  },

  computed: {
    ...mapGetters(['name', 'roles'])
  },

  methods: {
    /**
     * 当前分钟内，消息数
     */
    getMsgInfoByMin() {
      return new Promise(resolve => {
        getMsgInfoByMinAction().then(response => {
          if (response.code === 'A00000') {
            const chartData = this.chartData
            if (chartData['xData'].length > 120) {
              chartData['xData'].shift()
              chartData['yData'][0]['data'].shift()
              chartData['yData'][1]['data'].shift()
            }
            chartData['xData'].push(response.data.msg_data['current_time'])
            chartData['yData'][0]['data'].push(response.data.msg_data['send_gift_num'])
            chartData['yData'][1]['data'].push(response.data.msg_data['total_msg'])
            this.chartData = chartData
            resolve()
          } else {
            clearInterval(this.getMsgInfoByMinIntervalId)
            reject()
          }
        })
      })
    },

    getMsgInfoByMinHistory() {
      return new Promise(resolve => {
        getMsgInfoByMinHistoryAction().then(response => {
          if (response.code === 'A00000') {
            const chartDataHistory = this.chartDataHistory
            const xData = []
            const send_gift_msg_arr = []
            response.data.msg_data.forEach(item => {
              xData.push(item['current_time'])
              send_gift_msg_arr.push(item['send_gift_num'])
            })
            chartDataHistory['xData'] = xData
            chartDataHistory['yData'][0]['data'] = send_gift_msg_arr
            this.chartDataHistory = chartDataHistory
            resolve()
          } else {
            clearInterval(this.getMsgInfoByMinHistoryIntervalId)
          }
        })
      })
    },

    getSendGiftQpsStat() {
      return new Promise(resolve => {
        getSendGiftQpsAction().then(response => {
          if (response.code === 'A00000') {
            const getSendGiftQpsData = this.getSendGiftQpsData
            const xData = []
            const total_qps_arr = []
            const qidou_qps_arr = []
            const zhanshi_qps_arr = []
            const qidian_qps_arr = []

            for (const current_time in response.data) {
              xData.push(current_time)
              const item = response.data[current_time]
              total_qps_arr.push(
                parseInt(item['qidou_qps']) + parseInt(item['zuanshi_qps']) + parseInt(item['qidian_qps'])
              )
              qidou_qps_arr.push(item['qidou_qps'])
              zhanshi_qps_arr.push(item['zuanshi_qps'])
              qidian_qps_arr.push(item['qidian_qps'])
            }
            getSendGiftQpsData['xData'] = xData
            getSendGiftQpsData['yData'][0]['data'] = total_qps_arr
            getSendGiftQpsData['yData'][1]['data'] = qidou_qps_arr
            getSendGiftQpsData['yData'][2]['data'] = zhanshi_qps_arr
            getSendGiftQpsData['yData'][3]['data'] = qidian_qps_arr
            this.getSendGiftQpsData = getSendGiftQpsData
            resolve()
          } else {
            clearInterval(this.getSendGiftQpsStatIntervalId)
          }
        })
      })
    },
    getIncomeStatInfo() {
      return new Promise(resolve => {
        getIncomeStatInfoAction().then(response => {
          if (response.code === 'A00000') {
            if (response.data.length >= 2) {
              this.incomeDataStart.total_income.today = this.incomeData.total_income.today
              this.incomeDataStart.total_income.yesterday = this.incomeData.total_income.yesterday
              this.incomeDataStart.total_num.today = this.incomeData.total_num.today
              this.incomeDataStart.total_num.yesterday = this.incomeData.total_num.yesterday
              this.incomeData.total_income.today = response.data[0][1]
              this.incomeData.total_income.yesterday = response.data[1][1]
              this.incomeData.total_num.today = response.data[0][2]
              this.incomeData.total_num.yesterday = response.data[1][2]
            }
            resolve()
          } else {
            clearInterval(this.getIncomeStatInfoIntervalId)
          }
        })
      })
    },
    getUserOnlineStatInfo() {
      return new Promise(resolve => {
        getUserOnlineStatAction().then(response => {
          if (response.code === 'A00000') {
            this.onlineNumStart = this.onlineNum
            this.onlineNum = response.data.login_user
            resolve()
          } else {
            clearInterval(this.getUserOnlineStatInfoIntervalId)
          }
        })
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }

  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}

.panel-group {
  margin-top: 0px;

  .card-panel-col {
    margin-bottom: 12px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);

    .card-panel-icon-wrapper {
      color: #fff;
    }

    .icon-people {
      background: #40c9c6;
    }

    .icon-message {
      background: #36a3f7;
    }

    .icon-money {
      background: #f4516c;
    }

    .icon-shoppingCard {
      background: #34bfa3;
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px 26px 26px 0;

      .card-panel-text {
        line-height: 16px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}
</style>
