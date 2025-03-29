"use client"

import { useState, useEffect } from "react"
import { ArticleCard } from "@/components/ui/article-card"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Article {
  id: string
  title: string
  description: string
  imageUrl: string
  category: string
  source: string
  publishedAt: string
  readTime?: string
  url: string
}

export default function ArticlesGrid() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  
  useEffect(() => {
    // Replace with your actual API call
    const fetchArticles = async () => {
      try {
        setLoading(true)
        // Replace with your actual API endpoint
        const apikey = process.env.NEXT_PUBLIC_NEWS_API_KEY
        const url = `https://newsapi.org/v2/top-headlines?category=technology&apiKey=${apikey}`

        const response = await fetch(url)
        const data = await response.json()
        if (data.articles && Array.isArray(data.articles)) {
          const formattedArticles = data.articles.map((article: any, index: number) => ({
            id: index.toString(),
            title: article.title,
            description: article.description || null,
            imageUrl: article.urlToImage || null,
            category: "technology",
            source: article.source?.name || null,
            publishedAt: article.publishedAt,
            url: article.url
          }));
          setArticles(formattedArticles)
        } else {
          setArticles([])
        }
      } catch (error) {
        console.error("Error fetching articles:", error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchArticles()
  }, [selectedCategory])
  
  return (
    <div className="container mx-auto py-8 px-4">
      {/* Categories filter */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Latest Articles</h2>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="ai">Artificial Intelligence</SelectItem>
            <SelectItem value="blockchain">Blockchain</SelectItem>
            <SelectItem value="programming">Programming</SelectItem>
            <SelectItem value="startups">Startups</SelectItem>
            <SelectItem value="cloud">Cloud Computing</SelectItem>
            <SelectItem value="security">Cybersecurity</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {/* Featured article */}
      {!loading && articles.length > 0 && (
        <div className="mb-10">
          <ArticleCard article={articles[0]} variant="featured" />
        </div>
      )}
      
      {/* Articles grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          // Skeleton loaders while loading
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-[200px] w-full rounded-lg" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <div className="flex justify-between">
                <Skeleton className="h-4 w-[100px]" />
                <Skeleton className="h-4 w-[70px]" />
              </div>
            </div>
          ))
        ) : (
          // Display actual articles
          articles.slice(1).map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))
        )}
      </div>
      
      {/* Load more button */}
      {!loading && articles.length > 0 && (
        <div className="mt-10 text-center">
          <Button variant="outline" size="lg">Load More</Button>
        </div>
      )}
    </div>
  )
}