<template>
  <div class="photorama">
    <div class="wrapper-text">
      <header>
        <h5 class="date">{{ dateFormated }}</h5>
        <h3 class="title">{{ title }}</h3>
      </header>
      <div
        class="text"
        v-if="text.length > 0"
        v-html="text">
      </div>
    </div>

    <section class="wrapper">
      <div
        @click="handleClick(0)"
        class="cover photo">
        <preload-img
          :srcImg="isItAMobile? photos[0].sizes.medium_large : photos[0].sizes.large"
          :srcPlaceholder="photos[0].sizes.thumbnail"/>
      </div>
      <div class="thumbs">
        <div
          v-for="(photo, i) in photos.slice(1)"
          :key="photo.id"
          @click="handleClick(i + 1)"
          class="photo">
          <preload-img
            :srcImg="photo.sizes.medium_large"
            :srcPlaceholder="photo.sizes.thumbnail"/>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import PreloadImg from '@/components/PreloadImg'
import dayjs from 'dayjs'
import fr from 'dayjs/locale/fr'
import { mapState, mapMutations } from 'vuex'
import { SET_FULLSCREEN } from '@/config'


/* eslint-disable */
export default {
  name: 'Photorama',

  components: { PreloadImg },

  data () {
    return {
      tl:  null,
      played: false
    }
  },

  props: {
    index: { type: Number, required: true },
    title: { type: String, required: true },
    text: { type: String, required: true },
    photos: { type: Array, required: true },
    dateGmt: { type: String, required: true },
    autoplay: { type: Boolean, required: true }
  },

  computed: {
    ...mapState({
      isItAMobile: state => state.isItAMobile
    }),

    dateFormated () {
      let day = dayjs(this.dateGmt).locale(fr)
      return day.format('D MMMM YYYY')
    }
  },

  watch: {
    autoplay (value) {
      if (value && !this.played) {
        setTimeout(_ => {
          this.isScrolledIntoView()
        }, 0)
      }
    }
  },

  mounted () {
    // if (this.autoplay) {
    //   this.isScrolledIntoView()
    // } else {
    //   window.addEventListener('scroll', this.isScrolledIntoView)
    // }
  },

  methods: {
    ...mapMutations({
      setFullscreen: SET_FULLSCREEN
    }),

    handleClick (i) {
      this.setFullscreen({photoramaIndex: this.index, photoIndex: i})
    },

    isScrolledIntoView () {
      var rect = this.$el.getBoundingClientRect();
      var elemTop = rect.top;
      var elemBottom = rect.bottom;

      // Partially visible elements return true:
      var isVisible = elemTop < window.innerHeight && elemBottom >= 0;
      if (isVisible && !this.played) {
        setTimeout(_ => {
          // this.tl.play()
        }, 350)
        window.removeEventListener('scroll', this.isScrolledIntoView)
      }
    }
  }
}
</script>

<style lang="scss">
@import "~@/assets/styles/variables";

.photorama{
  width: 100%;

  .wrapper-text{
    margin: 0 24px;
  }

  header{
    margin-bottom: 15px;
    position: relative;

    &:after{
      content: '';
      display: block;
      position: absolute;
      background: $visitedcolor;
      height: 2px;
      width: 0;
      transition: all 400ms ease;
      width: 100%;
    }
  }

  & + &{
    margin-top: 48px;
  }

  .title{
    // text-transform: uppercase;
    font-size: 24px;
    margin-top: 6px;
    margin-bottom: 2px;
    padding-right: $main_photo_gap;
    color: $tripcolor;
  }
  .date{
    font-size: 12px;
    line-height: 22px;
    text-transform: lowercase;
    font-family: $technicalFont;
    font-weight: 700;
    background: $landcolor;
    color: $tripcolor;
    padding: 0 8px 0 6px;
    display: inline-block;
    // box-shadow: 3px 0px 0px $visitedcolor;
    // border-left: 3px solid $visitedcolor;
  }
  .text{
    margin-top: 1.5em;
    margin-bottom: 2em;
    p{
      margin-top: 0.75em;
      line-height: 1.5;
      &:first-child{
        // text-indent: 24px;
      }
      strong{
        font-weight: 900;
      }
    }
  }
  .photo-title{
    margin-top: 6px;
    margin-bottom: 6px;
    margin-left: 12px;
    font-size: 16px;
  }
  .caption{
    margin-top: 3px;
    margin-left: 0px;
    font-size: 14px;
  }
  .photo{
    width: 100%;
  }
  .cover.photo img{
    margin: auto;
  }
  .photo{
    cursor: pointer;
    box-sizing: border-box;
    &.cover{
      min-height: auto;
    }

  }
  .thumbs{
    margin-top: $main_photo_gap / 2;

    .photo + .photo{
      margin-top: $main_photo_gap / 2;
    }
  }
}
@media only screen and (min-width: 480px) {
  .photorama {
    .thumbs{
      margin-top: $main_photo_gap;
      column-width: 250px;
      column-gap: $main_photo_gap;
      column-fill: balance;

      .photo + .photo{
        margin-top: $main_photo_gap;
      }
    }
  }
}
</style>
