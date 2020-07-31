<template>
  <div class="range-slider">
    <h3 class="range-slider__number">{{ value + "%" }}</h3>
    <div class="range-slider__container">
      <div class="range-slider__track" ref="track"></div>
      <div
        ref="dot"
        class="range-slider__dot"
        @mousedown.prevent="startHandler"
        @touchstart.prevent="startHandler"
        :style="{ left: position + 'px' }"
      ></div>
    </div>
    <div class="range-slider__controls">
      <button class="range-slider__btn" type="button" @click="setValue(25)">
        25%
      </button>
      <button class="range-slider__btn" type="button" @click="setValue(50)">
        50%
      </button>
      <button class="range-slider__btn" type="button" @click="setValue(75)">
        75%
      </button>
      <button class="range-slider__btn" type="button" @click="setValue(100)">
        100%
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Range",
  props: {
    value: {
      type: [String, Number],
      required: true
    }
  },
  data: () => ({
    isMobile: false,
    shiftX: null,
    trackX: null,
    rightEdge: null
  }),
  computed: {
    position() {
      return (this.value / 100) * this.rightEdge;
    }
  },
  methods: {
    setValue(value) {
      this.$emit("input", value);
    },
    getPageX(event) {
      return event.touches ? event.touches[0].pageX : event.pageX;
    },
    getRightEdge() {
      this.rightEdge =
        this.$refs.track.offsetWidth - this.$refs.dot.offsetWidth;
    },
    startHandler(event) {
      this.shiftX =
        this.getPageX(event) - this.$refs.dot.getBoundingClientRect().left;
      this.trackX = this.$refs.track.getBoundingClientRect().left;
      if (this.isMobile) {
        document.addEventListener("touchmove", this.moveHandler);
        document.addEventListener("touchend", this.endHandler);
      } else {
        document.addEventListener("mousemove", this.moveHandler);
        document.addEventListener("mouseup", this.endHandler);
      }
    },
    moveHandler(event) {
      let newPosition = this.getPageX(event) - this.shiftX - this.trackX;
      if (newPosition < 0) newPosition = 0;
      if (newPosition > this.rightEdge) newPosition = this.rightEdge;
      const newPosToPercent = ((newPosition / this.rightEdge) * 100).toFixed(1);
      this.setValue(newPosToPercent);
    },
    endHandler() {
      if (this.isMobile) {
        document.removeEventListener("touchmove", this.moveHandler);
        document.removeEventListener("touchend", this.endHandler);
      } else {
        document.removeEventListener("mousemove", this.moveHandler);
        document.removeEventListener("mouseup", this.endHandler);
      }
    }
  },
  mounted() {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      this.isMobile = true;
    }
    this.getRightEdge();
    window.addEventListener("resize", this.getRightEdge);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.getRightEdge);
  }
};
</script>
<style scoped>
.range-slider {
  position: relative;
}
.range-slider__container {
  position: relative;
  min-height: 40px;
}
.range-slider__track {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  height: 40px;
  width: 100%;
  background: rgb(6, 241, 96);
  background: linear-gradient(
    90deg,
    rgba(6, 241, 96, 1) 50%,
    rgba(221, 198, 19, 1) 62%,
    rgba(255, 106, 0, 1) 85%,
    rgba(247, 62, 0, 1) 100%
  );
  border-radius: 35px;
}
.range-slider__dot {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 25px;
  height: 25px;
  background-color: #ffffff;
  border-radius: 40px;
  cursor: pointer;
}
.range-slider__controls {
  display: flex;
  justify-content: center;
  margin-top: 25px;
}
.range-slider__btn {
  margin: 0 10px;
  height: 46px;
  min-width: 75px;
  padding: 0 16px;
  color: white;
  background-color: #2a4983;
  border: 0;
  border-radius: 40px;
  cursor: pointer;
  outline: none;
  font-weight: bold;
  font-size: 20px;
}
</style>
