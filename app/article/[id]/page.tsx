"use client";

import { useArticles } from "@/lib/context/ArticlesContext";
import { useEffect, useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

export default function ArticlePage({ params }: { params: Promise<{ id: string }> }) {
  
  const resolvedParams = use(params);
  const id = resolvedParams.id;
  
  const { fetchArticleById, loading } = useArticles();
  const [article, setArticle] = useState<any>(null);
  
  useEffect(() => {
    const loadArticle = async () => {
      const articleData = await fetchArticleById(id);
      setArticle(articleData);
    };
    
    loadArticle();
  }, [id, fetchArticleById]);
  
  if (loading || !article) {
    return (
      <div className="container mx-auto py-12 px-4 text-center">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mb-12"></div>
          <div className="h-96 bg-gray-200 rounded mb-8"></div>
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
        </div>
      </div>
    );
  }
  
  const publishedDate = new Date(article.publishedAt);
  const timeAgo = formatDistanceToNow(publishedDate, { addSuffix: true });
  
  return (
    <div className="container mx-auto py-8 px-4">
      <Link href="/" className="text-blue-600 hover:underline mb-6 inline-block">
        ← Back to articles
      </Link>
      
      <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
      
      <div className="flex items-center mb-6 text-gray-600">
        <span>Source: {article.source}</span>
        <span className="mx-3">•</span>
        <span>{timeAgo}</span>
        {article.readTime && (
          <>
            <span className="mx-3">•</span>
            <span>{article.readTime} read</span>
          </>
        )}
      </div>
      
      {article.imageUrl && (
        <div className="relative w-full h-[400px] mb-8">
          <Image 
            src={article.imageUrl}
            alt={article.title}
            fill
            style={{ objectFit: 'cover' }}
            className="rounded-lg"
          />
        </div>
      )}
      
      <div className="prose lg:prose-xl max-w-none">
        {article.content ? (
          <div dangerouslySetInnerHTML={{ __html: article.content }} />
        ) : (
          <p className="text-lg">{article.description}</p>
        )}
      </div>
      
      <div className="mt-12 border-t pt-6">
        <a 
          href={article.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Read full article at {article.source}
        </a>
      </div>
    </div>
  );
}