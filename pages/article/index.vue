<template>
  <div class="article-page">
    <div class="banner">
      <div class="container">
        <h1>{{ article.title }}</h1>
        <!-- meta组件 -->
        <article-meta :article="article"></article-meta>
      </div>
    </div>

    <div class="container page">
      <div class="row article-content">
        <div class="col-md-12" v-html="article.body"></div>
      </div>
      <hr />
      <div class="article-actions">
        <!-- meta组件 -->
        <article-meta :article="article"></article-meta>
      </div>

      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <!-- 评论部分 -->
          <article-comments :article="article"></article-comments>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticle } from "@/api/article";
import MarkdownIt from "markdown-it";
import articleMeta from "./components/article-meta";
import articleComments from "./components/article-comments";

export default {
  name: "articleIndex",
  components: {
    articleMeta,
    articleComments
  },
  async asyncData({ params }) {
    const { data } = await getArticle(params.slug);
    // 处理markdown格式的文章主体内容
    const md = MarkdownIt();
    const { article } = data;
    article.body = md.render(article.body);
    return {
      article
    };
  }
};
</script>

<style>
</style>