<template>
  <div class="profile-page">

  <div class="user-info">
    <div class="container">
      <div class="row">

        <div class="col-xs-12 col-md-10 offset-md-1">
          <img :src="profile.image" class="user-img" />
          <h4> {{ profile.username }}</h4>
          <p>
            {{ profile.bio }}
          </p>
          <button class="btn btn-sm btn-outline-secondary action-btn" @click="followUser">
            <i class="ion-plus-round"></i>
            &nbsp;
            {{ profile.following ? 'UnFollow' : 'Follow' }} {{ profile.username }}
          </button>
        </div>
      </div>
    </div>
  </div>

  <div class="container">
    <div class="row">

      <div class="col-xs-12 col-md-10 offset-md-1">
        <div class="articles-toggle">
          <ul class="nav nav-pills outline-active">
            <li class="nav-item">
              <nuxt-link class="nav-link" 
                :class="{
                  active: !isFav
                }"
                exact
                :to="{
                  name: 'profile',
                  params: {
                    username: this.profile.username
                  }
                }">My Articles</nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link class="nav-link" 
                :class="{
                  active: isFav
                }"
                exact
                :to="{
                  name: 'profileFavorite',
                  params: {
                    username: this.profile.username,
                  }
                }">Favorited Articles</nuxt-link>
            </li>
          </ul>
        </div>
        <!-- 文章列表 -->
        <div class="article-preview" v-for="article in articles" :key="article.slug">
          <div class="article-meta">
            <nuxt-link :to="{ 
              name: 'profile', 
              params: {
                username: article.author.username
              }
            }">
              <img :src="article.author.image" />
            </nuxt-link>
            <div class="info">
              <nuxt-link :to="{ 
              name: 'profile', 
              params: {
                username: article.author.username
              }
            }" class="author">
                {{ article.author.username }}
              </nuxt-link>
              <span class="date">{{ article.createdAt | date('MMM DD, YYYY')}}</span>
            </div>
            <button 
              class="btn btn-outline-primary btn-sm pull-xs-right" 
              :class="{active: article.favorited}"
              @click="onFavorite(article)"
              :disabled="article.disabled"
              >
              <i class="ion-heart"></i> {{ article.favoritesCount }}
            </button>
          </div>
          <nuxt-link :to="{ 
              name: 'article', 
              params: {
                slug: article.slug
              }
            }" class="preview-link">
            <h1>{{ article.title }}</h1>
            <p>{{ article.description }}</p>
            <span>Read more...</span>
          </nuxt-link>
        </div>

      </div>

    </div>
  </div>

</div>
</template>

<script>
import { getProfiles, followUser, unfollowUser } from '@/api/profile'
import { getArticles, getYourFeedArticles} from '@/api/article'

export default {
  name:'userProfile',
  middleware: 'user',
  computed: {
    isFav() {
      return this.$route.name === 'profileFavorite'
    }
  },
  async asyncData(context) {
    const { params, route } = context
    const { data } = await getProfiles(params.username)
    const { profile } = data;
    console.log(route);
    const loadArticles = route.name === 'profileFavorite' ? getYourFeedArticles : getArticles;
    const artReq = route.name === 'profileFavorite' ? { favorited: profile.username } : {author:profile.username};
    const { data: articleRes } = await loadArticles(artReq)

    const { articles } = articleRes
 
    return {
      profile,
      articles
    }
  },
  methods: {
    async followUser() {
      const handleFollow = this.profile.following ? unfollowUser:  followUser
      const { data } = await handleFollow(this.profile.username)
      console.log(data);
      this.profile = data.profile
    }
  }
}
</script>

<style>

</style>