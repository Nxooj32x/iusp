package org.iusp.common.service;

import com.github.pagehelper.PageInfo;
import org.iusp.common.bean.Article;

import java.util.List;

/**
 * Created by tao on 2017/10/18.
 */
public interface ArticleService {
    List<Article> queryArticleByLimit(String s, int i);

    Article findArticleById(Integer id);

    PageInfo queryArticleForPage(Article article, Integer pageNumber, Integer pageSize);

    int addArticle(Article article);

    int updateArticle(Article article);

    int deleteArticleById(Integer id);
}
