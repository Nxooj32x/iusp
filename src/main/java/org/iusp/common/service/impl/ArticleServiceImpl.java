package org.iusp.common.service.impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.iusp.common.bean.Article;
import org.iusp.common.dao.ArticleDao;
import org.iusp.common.service.ArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ArticleServiceImpl implements ArticleService {
    @Autowired
    private ArticleDao articleDao;
    @Override
    public List<Article> queryArticleByLimit(String s, int i) {
        PageHelper.startPage(1, i);
        List<Article> articles = articleDao.queryArticleByLimit(s);
        PageInfo pageInfo = new PageInfo(articles);
        return pageInfo.getList();
    }

    @Override
    public Article findArticleById(Integer id) {
        return articleDao.findArticleById(id);
    }

    @Override
    public PageInfo queryArticleForPage(Article article, Integer pageNumber, Integer pageSize) {
        PageHelper.startPage(pageNumber,pageSize);
        List<Article> articles = articleDao.queryArticleForPage(article);
        PageInfo pageInfo = new PageInfo(articles);
        return pageInfo;
    }

    @Override
    public int addArticle(Article article) {
        return articleDao.addArticle(article);
    }

    @Override
    public int updateArticle(Article article) {
        return articleDao.updateArticle(article);
    }

    @Override
    public int deleteArticleById(Integer id) {
        return articleDao.deleteArticleById(id);
    }
}
