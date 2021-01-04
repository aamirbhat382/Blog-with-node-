 const Article = require('../../../models/airtical')
 const article = require('e:/markdown-blog-master/models/article')

 function editController() {
     return {
         index: async(req, res) => {
             const article = await Article.findById(req.params.id)
             if (article == null) res.redirect('/')
                 //  console.log(article)
             res.render('admin/edit', { article: article })

         },
         update: async(req, res) => {
             let article = await Article.findById(req.params.id)
             article.title = req.body.title,
                 article.description = req.body.description,
                 article.markdown = req.body.markdown
             try {
                 article.save()
                 res.redirect('/')
             } catch (e) {
                 console.log(e)
             }
         },
         deleteOne: async(req, res) => {
             const article = await Article.findByIdAndDelete(req.params.id)
             res.redirect('/')
         }

     }
 }
 module.exports = editController