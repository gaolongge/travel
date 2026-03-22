import { useState, useEffect, useCallback } from 'react';
import apiClient from '@/lib/api-client';
import type { Article, Tag, Author, AdjacentArticle } from '@/types';

// 获取文章列表 - 支持加载更多
export function useArticles(pageSize: number = 6, tagId?: string) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchArticles = useCallback(async (pageNum: number, append: boolean = false) => {
    if (append) {
      setLoadingMore(true);
    } else {
      setLoading(true);
    }
    setError(null);
    try {
      const response = await apiClient.post('/article/list', {
        page: pageNum,
        pageSize,
        tagId,
      });
      if (append) {
        setArticles(prev => [...prev, ...response.data.articles]);
      } else {
        setArticles(response.data.articles);
      }
      setTotal(response.data.total);
      setTotalPages(response.data.totalPages);
    } catch (err) {
      setError('Failed to fetch articles');
      console.error(err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [pageSize, tagId]);

  // 初始加载或标签切换
  useEffect(() => {
    setPage(1);
    fetchArticles(1, false);
  }, [tagId]); // eslint-disable-line react-hooks/exhaustive-deps

  // 页码变化时加载更多
  useEffect(() => {
    if (page > 1) {
      fetchArticles(page, true);
    }
  }, [page]); // eslint-disable-line react-hooks/exhaustive-deps

  const loadMore = useCallback(() => {
    if (page < totalPages) {
      setPage(prev => prev + 1);
    }
  }, [page, totalPages]);

  const hasMore = page < totalPages;

  return { 
    articles, 
    total, 
    totalPages, 
    page,
    loading, 
    loadingMore,
    error, 
    loadMore,
    hasMore,
    refetch: () => fetchArticles(1, false) 
  };
}

// 获取文章详情
export function useArticle(id?: string, slug?: string) {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!id && !slug) return;
      setLoading(true);
      setError(null);
      try {
        const response = await apiClient.post('/article/detail', { id, slug });
        setArticle(response.data);
      } catch (err) {
        setError('Failed to fetch article');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [id, slug]);

  return { article, loading, error };
}

// 获取标签列表
export function useTags() {
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTags = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await apiClient.post('/tag/list');
        setTags(response.data.tags);
      } catch (err) {
        setError('Failed to fetch tags');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTags();
  }, []);

  return { tags, loading, error };
}

// 获取作者信息
export function useAuthor() {
  const [author, setAuthor] = useState<Author | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAuthor = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await apiClient.post('/author/info');
        setAuthor(response.data.author);
      } catch (err) {
        setError('Failed to fetch author');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAuthor();
  }, []);

  return { author, loading, error };
}

// 获取相邻文章
export function useAdjacentArticles(articleId: string) {
  const [adjacent, setAdjacent] = useState<AdjacentArticle | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdjacent = async () => {
      if (!articleId) return;
      setLoading(true);
      try {
        const response = await apiClient.post('/article/adjacent', { id: articleId });
        setAdjacent(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAdjacent();
  }, [articleId]);

  return { adjacent, loading };
}
