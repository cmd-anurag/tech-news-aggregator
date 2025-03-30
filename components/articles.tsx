"use client";
import { useArticles } from "@/lib/context/ArticlesContext";
import { useState, useEffect, cache } from "react";
import { ArticleCard } from "@/components/ui/article-card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface Article {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  source: string;
  publishedAt: string;
  readTime?: string;
  url: string;
}

export default function ArticlesGrid() {

  const {articles, loading, fetchArticles} = useArticles();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);

  const articlesPerPage = 21;

  useEffect(() => {
    fetchArticles(selectedCategory);
  }, [selectedCategory]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil((articles.length - 1) / articlesPerPage);

  const handlePrev = () => {
    // idk why the scroll jumps when moving from last -> second last
    // this is temp fix for now

    setCurrentPage((prev) => Math.max(1, prev - 1));
    setTimeout(() => {
      const grid = document.querySelector(".grid");
      if (grid) {
        grid.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 10);
  };

  const handleNext = () => {
    setCurrentPage((next) => Math.min(totalPages, next + 1));
    setTimeout(() => {
      const grid = document.querySelector(".grid");
      if (grid) {
        grid.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 10);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Categories filter */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Latest Articles</h2>
        <Select value={selectedCategory} onValueChange={handleCategoryChange}>
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
        {loading
          ? // Skeleton loaders while loading
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
          : // actual articles

            articles
              .slice(
                (currentPage - 1) * articlesPerPage + 1,
                Math.min(currentPage * articlesPerPage + 1, articles.length)
              )
              .map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
      </div>
      {/* Pagination */}
      <div className="m-10">
        {!loading && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={currentPage > 1 ? handlePrev : undefined}
                  className={
                    currentPage === 1
                      ? "pointer-events-none cursor-not-allowed opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink>{currentPage}</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  onClick={currentPage < totalPages ? handleNext : undefined}
                  className={
                    currentPage === totalPages
                      ? "pointer-events-none opacity-50 cursor-not-allowed"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </div>
  );
}
