import Navbar from "@/components/Navbar";
import NewsQuery from "@/components/news-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { NewsApiResponse, NewsDomains } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

type SearchParams = {
  searchParams: {
    date: string;
    domain: NewsDomains;
  };
};

export const metadata = {
  title: "News"
}

export default async function TrendingNews({ searchParams }: SearchParams) {
  const { date, domain } = searchParams;
  const currentDate = `${new Date().getFullYear()}-${
    new Date().getMonth() + 1
  }-${new Date().getDate() - 1}`;
  const response = await fetch(
    `https://newsapi.org/v2/everything?${new URLSearchParams({
      q: domain || "Indian Finance",
      from: date || currentDate,
      apiKey: process.env.NEXT_PUBLIC_NEWS_API_KEY!,
    })}`
  );
  const news: NewsApiResponse = await response.json();

  return (
    <main className="max-w-7xl mx-5">
      <Navbar />
      <h1 className="text-4xl mt-36 font-bold mb-6 px-3">Trending News</h1>
      <div className="px-3 mb-5 pb-2">
        <NewsQuery domain={domain} />
      </div>
      <section className="grid gap-6 md:grid-cols-2 px-3 lg:grid-cols-3">
        {news.articles.map((article) => (
          <div className="group h-max" key={article.url}>
            <Card className="border-input">
              <Image
                alt={article.title}
                className="w-full rounded-t-md h-48 object-cover"
                height="200"
                src={article.urlToImage}
                style={{ aspectRatio: "4/3", objectFit: "cover" }}
                width="300"
              />
              <CardHeader>
                <CardTitle>
                  <Link
                    href={article.url}
                    className="hover:underline"
                    target="_blank"
                  >
                    {article.title}
                  </Link>
                </CardTitle>
                <CardDescription className="text-ellipsis">
                  {article.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {article.source.name}
                </p>
              </CardContent>
            </Card>
          </div>
        ))}
      </section>
    </main>
  );
}
