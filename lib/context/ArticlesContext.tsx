"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

interface Article {
    id: string,
    title: string,
    description: string,
    imageUrl: string | null,
    categoty: string,
    source: string | null,
    publishedAt: string,
    url: string,
}

interface ArticlesContextType {
    articles: Article[],
    loading: boolean,
    fetchArticles: (category: string) => Promise<void>,
    fetchArticleById: (id: string) => Article | undefined,
}

const ArticleContext = createContext<ArticlesContextType | undefined>(undefined);

export function ArticlesProvider({children} : {children : React.ReactNode}) {

    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchArticles = async (selectedCategory: string = "all") => {
        try {
            setLoading(true);
            let url;
            if (selectedCategory === "all") {
              url = `/api/news?category=all`;
            } else {
              url = `/api/news?category=${selectedCategory}`;
            }
    
            const response = await fetch(url, {
              next: {revalidate: 300}
            });
    
            const data = await response.json();
    
            if (data.articles && Array.isArray(data.articles)) {
              
              const formattedArticles = data.articles.map(
                (article: any, index: number) => ({
                  id: index.toString(),
                  title: article.title,
                  description: article.description || null,
                  imageUrl: article.urlToImage || null,
                  category: "technology",
                  source: article.source?.name || null,
                  publishedAt: article.publishedAt,
                  url: article.url,
                })
              );
    
              setArticles(formattedArticles);
              
            } else {
              setArticles([]);
            }
          } catch (error) {
            console.error("Error fetching articles:", error);
          } finally {
            setLoading(false);
          }
    }

    const fetchArticleById = (id: string) => {
        return articles.find(article => id === article.id);
    }

    return (
        <ArticleContext.Provider value={{articles, loading, fetchArticles, fetchArticleById}}>
            {children}
        </ArticleContext.Provider>
    )
        
}

export function useArticles() {
    const context = useContext(ArticleContext);
    if(context == undefined) {
        throw new Error("bruh what are you doing");
    }
    return context;
}
