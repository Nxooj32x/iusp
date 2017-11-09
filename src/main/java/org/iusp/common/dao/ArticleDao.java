package org.iusp.common.dao;


import org.iusp.common.bean.Article;

import java.util.List;

public interface ArticleDao {
    List<Article> queryArticleByLimit(String s);

    Article findArticleById(Integer id);

    List<Article> queryArticleForPage(Article article);

    int addArticle(Article article);

    int updateArticle(Article article);

    int deleteArticleById(Integer id);
}
