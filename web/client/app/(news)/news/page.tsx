import NewsQuery from "@/components/news-query"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { NewsApiResponse, NewsDomains } from "@/lib/types"
import Image from "next/image"
import Link from "next/link"

type SearchParams = {
  searchParams: {
    date: string
    domain: NewsDomains
  }
}

export default async function TrendingNews({ searchParams }: SearchParams) {
  const date = searchParams.date
  const domain = searchParams.domain ?? "Indian Finance"

  const dateObj = new Date()
  // Month + 1 because it is 0 indexed, date - 1 to get yesterdays news
  const currentDate = `${dateObj.getFullYear()}-${dateObj.getMonth() + 1}-${
    dateObj.getDate() - 1
  }`

  const response = await fetch(
    `https://newsapi.org/v2/everything?${new URLSearchParams({
      q: domain,
      from: date ?? currentDate,
      // sortBy: "publishedAt",
      apiKey: process.env.NEXT_PUBLIC_NEWS_API_KEY!,
    })}`
  )

  const news: NewsApiResponse = await response.json()

  return (
    <main className="p-4 md:p-6 lg:p-8">
      <h1 className="text-4xl font-bold mb-6">Trending News</h1>
      <NewsQuery domain={domain} />
      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {news.articles.map((article) => (
          <div className="group h-max" key={article.url}>
            <Card>
              <Image
                alt={article.title}
                className="w-full h-48 object-cover"
                height="200"
                src={article.urlToImage}
                style={{
                  aspectRatio: "4/3",
                  objectFit: "cover",
                }}
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
  )
}
