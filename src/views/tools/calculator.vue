<template>
  <div class="full-screen soda-calculator">
    <!-- 计算器视图 -->
    <div class="soda-calculator__viewer" @click="handleClickViewer">
      <p
        :class="[
          'calculator-result',
          { 'calculator-result--show': currentStack.result },
        ]"
      >
        = {{ currentStack.result }}
      </p>
      <p
        :class="[
          'calculator-process',
          { 'calculator-process--readonly': currentStack.result },
        ]"
      >
        {{ formatShowKeyboardHistory(currentStack.list) }}
      </p>
    </div>

    <!-- 键盘 -->
    <div
      :class="['van-hairline--top', 'soda-calculator__keyboard']"
      safe-area-inset-bottom
    >
      <div class="soda-calculator__keyboard--container">
        <template v-for="(line, lineIndex) in keyboardData">
          <div
            v-for="(item, index) in line"
            :key="`keyboard_${lineIndex}_${index}`"
            class="keyboard-item"
            @click="haneldKeyboardTap(item)"
          >
            <van-icon v-if="item.icon" :name="item.icon" />
            <span v-else>{{ item.name }}</span>
          </div>
        </template>
      </div>
    </div>
    <van-popup
      v-model="showHistoryPopup"
      closeable
      position="bottom"
      class="calculator-history"
    >
      <h3 class="calculator-history__title">恭喜解锁隐藏功能</h3>
      <ul class="calculator-history__list">
        <li
          v-for="(item, index) in keyboardHistory"
          :key="`calculator-history_${index}`"
          class="calculator-history__item"
        >
          <template v-if="item.result">
            <span class="item-result">{{ item.result }}</span>
            <span class="item-equal">=</span>
          </template>
          <template v-if="item.list && item.list.length">
            <span v-if="item.list && item.list.length">
              {{ formatShowKeyboardHistory(item.list) }}
            </span>
          </template>
        </li>
      </ul>
    </van-popup>
  </div>
</template>

<script>
import resource from '@/resource';
export default {
  name: 'Calculator',
  data() {
    return {
      keyboardData: [
        [
          {
            name: 'C',
            icon: resource.icC,
            type: 'action',
            action: 'clear',
          },
          {
            name: 'X',
            icon: resource.icClear,
            action: 'backspace',
            type: 'action',
          },
          {
            name: '%',
            icon: resource.icBfb,
            type: 'value',
            value: '*0.01',
            canInheritPrevVal: true,
          },
          {
            name: '÷',
            icon: resource.icChu,
            type: 'operator',
            value: '/',
            canInheritPrevVal: true,
          },
        ],
        [
          {
            name: '7',
            type: 'value',
            value: '7',
          },
          {
            name: '8',
            type: 'value',
            value: '8',
          },
          {
            name: '9',
            type: 'value',
            value: '9',
          },
          {
            name: 'x',
            icon: resource.icCheng,
            type: 'operator',
            value: '*',
            canInheritPrevVal: true,
          },
        ],
        [
          {
            name: '4',
            type: 'value',
            value: '4',
          },
          {
            name: '5',
            type: 'value',
            value: '5',
          },
          {
            name: '6',
            type: 'value',
            value: '6',
          },
          {
            name: '-',
            icon: resource.icJian,
            type: 'operator',
            value: '-',
            canInheritPrevVal: true,
          },
        ],
        [
          {
            name: '1',
            type: 'value',
            value: '1',
          },
          {
            name: '2',
            type: 'value',
            value: '2',
          },
          {
            name: '3',
            type: 'value',
            value: '3',
          },
          {
            name: '+',
            icon: resource.icJia,
            type: 'operator',
            value: '+',
            canInheritPrevVal: true,
          },
        ],
        [
          {
            name: '00',
            type: 'value',
            value: '00',
          },
          {
            name: '0',
            type: 'value',
            value: '0',
          },
          {
            name: '.',
            type: 'operator',
            value: '.',
          },
          {
            name: '=',
            icon: resource.icDh,
            type: 'action',
            action: 'cal',
          },
        ],
      ],
      prevKeyboard: {},
      keyboardHistory: [],
      currentIndex: 0,
      currentStack: {
        list: [],
        result: '',
      },
      validClickNumber: 3,
      currentClickNumber: 0,
      currentClickTime: 0,
      clickInterval: 200,
      showHistoryPopup: false,
    };
  },
  computed: {},
  methods: {
    haneldKeyboardTap(keyboard) {
      const { name, type, action, canInheritPrevVal } = keyboard;
      const stackListLen = this.currentStack.list.length;
      if (type === 'operator' && this.prevKeyboard.type === 'operator') {
        if (stackListLen) {
          this.currentStack.list[stackListLen - 1] = keyboard;
          this.prevKeyboard = keyboard;
          this.$forceUpdate();
        }
        return;
      }

      if (
        (name === '%' &&
          (!stackListLen ||
            this.currentStack.list[stackListLen - 1].type === 'operator')) ||
        (!stackListLen && (name === '00' || name === '0'))
      )
        return;

      let inherited;
      if (this.prevKeyboard.isEnd === true && action !== 'backspace') {
        // 上一次计算已结束 开始新的
        this.currentStack = {
          list: [],
          result: '',
        };
        this.prevKeyboard = {};

        const keyboardHistoryLen = this.keyboardHistory.length;
        if (!keyboardHistoryLen) return;
        const lastKeyboardHistory = this.keyboardHistory[
          keyboardHistoryLen - 1
        ];

        if (lastKeyboardHistory.result && canInheritPrevVal) {
          this.currentStack.list.push({
            value: lastKeyboardHistory.result,
            name: lastKeyboardHistory.result,
            inherited: true,
          });
          inherited = true;
        }
      }

      if (type === 'action') {
        switch (action) {
          case 'cal':
            // 等于（计算结果）
            this.handleEvalResult();
            break;
          case 'clear':
            // 归0
            this.currentStack = {
              list: [],
              result: '',
            };
            break;
          case 'backspace':
            // 回退一个
            if (!this.prevKeyboard.isEnd) {
              this.currentStack.list.pop();
            }
            break;

          default:
            break;
        }
      }
      if (
        !inherited &&
        (type === 'action' || type === 'operator') &&
        !stackListLen
      )
        return;

      let cacheKeyboard = { ...keyboard };
      if (action === 'cal') cacheKeyboard.isEnd = true;
      if (type !== 'action') this.currentStack.list.push(cacheKeyboard);
      this.prevKeyboard = cacheKeyboard;

      this.$forceUpdate();
    },
    formatResultKeyboardHistory(list) {
      if (!(list && list.length)) return '';
      const keyboardNames = list.map(item => {
        if (!item.noShow) return item.value;
      });
      return keyboardNames.join('');
    },
    formatShowKeyboardHistory(list) {
      if (!(list && list.length)) return '';
      const keyboardNames = list.map(item => {
        if (!item.noShow) return item.name;
      });
      return keyboardNames.join('');
    },
    handleStackResult(str) {
      try {
        return eval(str).toString();
      } catch (err) {
        console.error(err);
        this.$toast('暂不支持这么花里胡哨的操作，请清除重来');
        return false;
      }
    },
    handleEvalResult() {
      const evalResult = this.handleStackResult(
        this.formatResultKeyboardHistory(this.currentStack.list)
      );
      if (evalResult) {
        this.currentStack.result = evalResult;
        this.keyboardHistory.push(this.currentStack);
      }
    },
    handleClickViewer() {
      const newDate = new Date().getTime();

      if (this.currentClickTime === 0) this.currentClickTime = newDate;

      if (newDate <= this.currentClickTime + this.clickInterval) {
        this.currentClickNumber++;
      } else {
        this.currentClickNumber = 1;
      }

      this.currentClickTime = newDate;

      if (this.currentClickNumber === this.validClickNumber) {
        this.openHisrotyPopup();
        this.currentClickTime = 0;
        this.currentClickNumber = 0;
      }
    },
    openHisrotyPopup() {
      if (!(this.keyboardHistory && this.keyboardHistory.length)) return false;
      this.showHistoryPopup = true;
    },
  },
};
</script>

<style lang="less" scoped>
@import '~@/style/vw.less';

.soda-calculator {
  font-family: 'Courier New', Courier, monospace;
  font-weight: bold;
  &__viewer {
    height: 40%;
    font-size: vw(24);
    line-height: vw(26);
    color: black;
    display: flex;
    flex-direction: column-reverse;
    text-align: right;
    padding: vw(12);
    overflow: hidden;
    position: relative;
    &::after {
      content: '';
      background: url('~@/assets/home-logo.png') no-repeat center;
      background-size: 100% 100%;
      display: block;
      position: absolute;
      position: absolute;
      width: vw(290);
      height: vw(58);
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      opacity: 0.15;
    }
    .calculator-process {
      position: relative;
      z-index: 1;
      word-break: break-all;
      &--readonly {
        opacity: 0.65;
        font-size: vw(22);
        line-height: vw(24);
      }
      transition: all ease-in 0.2s;
    }
    .calculator-result {
      position: relative;
      z-index: 1;
      margin-top: vw(6);
      word-break: break-all;
      font-size: vw(26);
      line-height: vw(28);
      visibility: hidden;
      opacity: 0;
      transform: scale(0);
      transform-origin: right bottom;
      height: 0;
      &--show {
        transition: all ease-in 0.2s;
        visibility: visible;
        opacity: 1;
        transform: scale(1);
        height: auto;
      }
    }
  }
  &__keyboard {
    height: 60%;
    &.is-iosx {
      padding-bottom: vw(110);
    }
    &--container {
      height: 100%;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-column-gap: vw(1);
      grid-row-gap: vw(1);
      padding: vw(1);
      background-image: linear-gradient(
        120deg,
        rgba(18, 194, 233, 0.5),
        rgba(196, 113, 237, 0.3),
        rgba(246, 79, 89, 0.2)
      );
    }

    .keyboard-item {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #fff;
      transition: all ease-in-out 0.2s;
      color: #333;
      font-size: vw(20);
      &:active {
        color: #fff;
        background-color: transparent;
      }
    }
  }
  .calculator-history {
    /* font-family: 'Open Sans', -apple-system, BlinkMacSystemFont,
      'Helvetica Neue', Helvetica, Segoe UI, Arial, Roboto, 'PingFang SC',
      'miui', 'Hiragino Sans GB', 'Microsoft Yahei', sans-serif; */
    font-family: 'PingFang SC', sans-serif;
    font-weight: normal;
    ::v-deep .van-popup__close-icon--top-right {
      top: vw(16);
      right: vw(16);
    }
    &__title {
      color: #333;
      font-size: vw(22);
      line-height: vw(26);
      margin-top: vw(14);
      margin-left: vw(14);
      width: calc(100% - vw(58));
    }
    &__list {
      max-height: 75vh;
      overflow: auto;
      margin: vw(10) vw(14);
    }
    &__item {
      padding: vw(8) 0;
      display: flex;
      align-items: flex-start;
      flex-direction: row-reverse;
      font-size: vw(16);
      line-height: vw(24);
      color: #999;
      &:not(:last-of-type) {
        border-bottom: 1px solid #eee;
      }
      .item-result {
        color: #333;
      }
      .item-equal {
        margin: 0 vw(4);
      }
    }
  }
}
</style>
