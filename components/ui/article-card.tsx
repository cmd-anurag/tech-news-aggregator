import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Calendar, Newspaper } from "lucide-react"
import { useState, useEffect } from "react"

interface ArticleCardProps {
  article: {
    id: string
    title: string
    description: string
    imageUrl: string | null
    category: string
    source: string
    publishedAt: string
    readTime?: string
    url: string
  }
  variant?: "default" | "featured"
}

const isValidImageUrl = (url: string | null): boolean => {
  if(!url) return false;
  return /^https?:\/\//.test(url) && !url.includes('{') && !url.includes('}')
}

export function ArticleCard({ article, variant = "default" }: ArticleCardProps) {
  const isFeatured = variant === "featured"
  const [imageError, setImageError] = useState(false)
  const [validImage, setValidImage] = useState(false);

  useEffect(() => {
    setValidImage(isValidImageUrl(article.imageUrl));
  }, [article.imageUrl]);
  
  return (
    <Card className={`overflow-hidden h-full transition-all hover:shadow-md ${
      isFeatured ? "lg:flex" : ""
    }`}>
      {/* Image container - Badge removed */}
      <div className={`${isFeatured ? "lg:w-2/5 lg:min-h-full" : "w-full"} p-0`}>
        <div className="aspect-video w-full h-full relative">
          {!validImage || imageError ? (
            <div className="absolute inset-0 bg-muted flex items-center justify-center">
              <Newspaper className="h-12 w-12 text-muted-foreground opacity-20" />
            </div>
          ) : (
            <Image
              src={article.imageUrl!}
              alt={article.title}
              fill
              className="object-cover"
              onError={() => setImageError(true)}
              sizes={isFeatured ? "(max-width: 1024px) 100vw, 40vw" : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
              priority={isFeatured}
            />
          )}
          
        </div>
      </div>
      
      <div className={`${isFeatured ? "lg:w-3/5" : "w-full"}`}>
        <CardHeader className="pb-2">
          <Link href={`/article/${article.id}`}>
            <h3 className={`font-bold line-clamp-2 hover:text-primary transition-colors ${
              isFeatured ? "text-2xl" : "text-lg"
            }`}>
              {article.title}
            </h3>
          </Link>
        </CardHeader>
        <CardContent className="pb-2">
          <p className="text-muted-foreground line-clamp-3">
            {article.description || "No description available"}
          </p>
        </CardContent>
        <CardFooter className="flex justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
          </div>
          {article.source && (
            <div className="flex items-center gap-1">
              <span>{article.source}</span>
            </div>
          )}
        </CardFooter>
      </div>
    </Card>
  )
}