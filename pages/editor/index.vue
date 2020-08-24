<template>
  <div class="editor-page">
  <div class="container page">
    <div class="row">

      <div class="col-md-10 offset-md-1 col-xs-12">
        <form @submit.prevent="onSubmit">
          <fieldset>
            <fieldset class="form-group">
                <input type="text" class="form-control form-control-lg" required v-model="article.title" placeholder="Article Title" :disabled="disabled">
            </fieldset>
            <fieldset class="form-group">
                <input type="text" required v-model="article.description" class="form-control" placeholder="What's this article about?" :disabled="disabled">
            </fieldset>
            <fieldset class="form-group">
                <textarea class="form-control" v-model="article.body" required rows="8" placeholder="Write your article (in markdown)" :disabled="disabled"></textarea>
            </fieldset>
            <fieldset class="form-group">
                <input type="text" class="form-control" placeholder="Enter tags, split with comma" v-model="article.tagList" :disabled="disabled"><div class="tag-list"></div>
            </fieldset>
            <button class="btn btn-lg pull-xs-right btn-primary" :disabled="disabled">
                Publish Article
            </button>
          </fieldset>
        </form>
      </div>

    </div>
  </div>
</div>
</template>

<script>
import { createArticles, updateArticles, getArticle} from '@/api/article'
 
export default {
  name: 'editor',
  // 路由匹配组件渲染之前执行中间件处理
  middleware: 'user',
  data() {
    return {
      article: {
        title: '',
        description: '',
        body: '',
        tagList: ''
      },
      disabled: false,
      slug: ''
    }
  },
  mounted() {
    // 根据路由判定是新增还是编辑
    if(this.$route.params.slug) {
      this.slug = this.$route.params.slug
      // 获取文章详情
      getArticle(this.slug).then((res)=> {
        this.article = res.data.article
        this.article.tagList = this.article.tagList.join(',')
      })
    }
  },
  methods: {
    async onSubmit() {
      console.log('submit');
      // 更新时禁止点击和更改数值
      this.disabled = true;
      const handleReq = this._slug ? updateArticles : createArticles;
      const {title, description, body, tagList} = this.article
      const params = {
        title,
        description,
        body,
        tagList: tagList.split(',')
      }
      if(this.slug) {
        params.slug = this.slug
      }

      const {data} = await handleReq({article: params})
      this.disabled = false;
      this.$router.push(`/article/${data.article.slug}`)
    }
  }
} 
</script>

<style>

</style>