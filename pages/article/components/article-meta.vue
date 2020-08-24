<template>
  <div class="article-meta">
    <nuxt-link
      :to="{
      name: 'profile',
      params: {
        username: articleData.author.username
      }
    }"
    >
      <img :src="articleData.author.image" />
    </nuxt-link>
    <div class="info">
      <nuxt-link
        :to="{
        name: 'profile',
        params: {
          username: articleData.author.username
        }
      }"
        class="author"
      >{{ articleData.author.username }}</nuxt-link>
      <span class="date">{{ articleData.createAt | date('MMM DD,YYYY') }}</span>
    </div>
    <!-- 浏览他人文章，为关注该用户 -->
    <button
      class="btn btn-sm btn-outline-secondary"
      :class="{active: articleData.author.following}"
      @click="followUser"
    >
      <i class="ion-plus-round"></i>
      &nbsp;
      {{ articleData.author.following ? 'UnFollow' : 'Follow' }} 
      {{ articleData.author.username }}
      <!-- <span class="counter">(10)</span> -->
    </button>
    &nbsp;&nbsp;
    <button
      class="btn btn-sm btn-outline-primary"
      :class="{active: articleData.author.favorited}"
      @click="onFavorite"
    >
      <i class="ion-heart"></i>
      &nbsp;
      Favorite Post
      <span class="counter">({{ articleData.favoritesCount }})</span>
    </button>
  </div>
</template>

<script>
import { addFavorite, delFavorite } from "@/api/article";
import { followUser, unfollowUser } from "@/api/profile";
export default {
  name: "articleMeta",
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  data(){
    return {
      articleData: this.article
    }
  },
  head() {
    return {
      title: `${this.article.title} - RealWorld`,
      meta: [
        {
          // meta标签的唯一标识编号，避免重复现象
          hid: "description",
          name: "description",
          content: this.article.description
        }
      ]
    };
  },
  methods: {
    async onFavorite() {
      let hadleObj = {
        method: addFavorite,
        favorited: true,
        count: 1,
        disabled: false
      };
      if (this.articleData.favorited) {
        // 取消点赞
        hadleObj.method = delFavorite;
        hadleObj.favorited = false;
        hadleObj.count = -1;
      }
      await hadleObj.method(this.articleData.slug);
      this.articleData.favorited = hadleObj.favorited
      this.articleData.favoritesCount += hadleObj.count
    },
    async followUser() {
      const handleFollow = this.articleData.author.following ? unfollowUser : followUser;
      const { data } =  await handleFollow(this.articleData.author.username);
      this.articleData.author.following = data.profile.following;
    }
  }
};
</script>

<style>
</style>