import ArticlesGrid from "@/components/articles";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-center p-10">Tech News Aggregator</h1>
      <ArticlesGrid />
    </div>
  );
}
