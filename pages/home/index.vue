<template>
  <div class="home-page">

  <div class="banner">
    <div class="container">
      <h1 class="logo-font">conduit</h1>
      <p>A place to share your knowledge.</p>
    </div>
  </div>

  <div class="container page">
    <div class="row">

      <div class="col-md-9">
        <!-- tab部分 -->
        <div class="feed-toggle">
          <ul class="nav nav-pills outline-active">
            <li v-if="user" class="nav-item">
              <nuxt-link class="nav-link" 
                :class="{
                  active: tab === 'your_feed'
                }"
                exact
                :to="{
                  name: 'home',
                  query: {
                    tab: 'your_feed'
                  }
                }">Your Feed</nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link class="nav-link " 
                exact
                :class="{
                  active: tab === 'global_feed'
                }"
                :to="{
                  name: 'home'
                }">Global Feed</nuxt-link>
            </li>
            <li v-if="tag" class="nav-item">
              <nuxt-link class="nav-link" 
                :class="{
                  active: tab === 'tag'
                }"
                exact
                :to="{
                  name: 'home',
                  query: {
                    tab: 'tag',
                    tag: tag
                  }
                }"># {{ tag }}</nuxt-link>
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
        <!-- 分页 -->
        <nav>
          <ul class="pagination">
            <li class="page-item" :class="{active: item === page}" :key="item" v-for="(item) in totalPage">
              <nuxt-link
                class="page-link"
                :to="{
                  name: 'home',
                  query: {
                    page: item,
                    tag: tag,
                    tab: tab
                  }
                }"
              >{{ item }}</nuxt-link>
            </li>
          </ul>
        </nav>
      </div>

      <div class="col-md-3">
        <div class="sidebar">
          <p>Popular Tags</p>

          <div class="tag-list">
              <nuxt-link class="tag-pill tag-default" 
                v-for="item in tags"            
                :key="item" 
                :to="{
                  name: 'home',
                  query: {
                    tag: item,
                    tab: 'tag'
                  }
                }">
                {{item}}
              </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>

</div>
</template>

<script>
import { getArticles, getYourFeedArticles, addFavorite, delFavorite } from '@/api/article'
import { getTags } from '@/api/tag'
import { mapState } from 'vuex'

export default {
  name: 'HomeIndex',
  watchQuery: ['page', 'tag', 'tab'],
  async asyncData ({query}) {
    const page = Number.parseInt(query.page || 1)
    const limit = 20
    const tab = query.tab || 'global_feed'
    const tag = query.tag
    const loadArticles = tab === 'global_feed' ? getArticles : getYourFeedArticles
    const [articleRes, tagRes] = await Promise.all([
      loadArticles({
        limit,
        offset: (page -1) * limit,
        tag
      }),
      getTags()
    ])
    const { articles, articlesCount }  = articleRes.data
    const {tags} = tagRes.data

    articles.forEach( articles => articles.disabled = false)

    return {
      limit,
      page,
      articles: articles,
      articlesCount: articlesCount,
      tags: tags,
      tab,
      tag
    }
  },
  computed: {
    ...mapState(['user']),
    totalPage () {
      return Math.ceil(this.articlesCount / this.limit)
    }
  },
  methods: {
    async onFavorite(article) {
      article.disabled = true
      let hadleObj = {
        method: addFavorite,
        favorited: true,
        count: 1,
        disabled: false
      };
      if(article.favorited) {
        // 取消点赞
        hadleObj.method = delFavorite
        hadleObj.favorited = false
        hadleObj.count = -1
      }
      await hadleObj.method(article.slug)
      article.favorited = hadleObj.favorited
      article.favoritesCount += hadleObj.count

      article.disabled = false
    }
  }
}
</script>

<style>

</style>