package org.iusp.common.dao.impl;


import org.iusp.base.BaseDao;
import org.iusp.common.bean.Article;
import org.iusp.common.dao.ArticleDao;
import org.iusp.utils.StringUtil;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class ArticleDaoImpl extends BaseDao implements ArticleDao {

    @Override
    public List<Article> queryArticleByLimit(String s) {
        Map<String, Object> paramMap = new HashMap<String, Object>();
        paramMap.put("type", s);
        return this.getSqlSession().selectList("article.queryArticleByLimit", paramMap);
    }

    @Override
    public Article findArticleById(Integer id) {
        return this.getSqlSession().selectOne("article.findArticleById", id);
    }

    @Override
    public List<Article> queryArticleForPage(Article article) {

        Map<String, Object> paramMap = new HashMap<String, Object>();

        paramMap.put("title", StringUtil.trim(article.getTitle()));
        paramMap.put("type", article.getType());
        paramMap.put("author", StringUtil.trim(article.getAuthor()));

        List<Article> list = this.getSqlSession().selectList("article.queryArticleForPage", paramMap);

        return list;
    }

    @Override
    public int addArticle(Article article) {
        return this.getSqlSession().insert("article.addArticle", article);
    }

    @Override
    public int updateArticle(Article article) {
        return this.getSqlSession().update("article.updateArticle", article);
    }

    @Override
    public int deleteArticleById(Integer id) {
        return this.getSqlSession().delete("article.deleteArticleById", id);
    }
}
