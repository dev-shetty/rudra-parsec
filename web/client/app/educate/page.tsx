import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  MarketConcepts2,
  commonFinance,
  financialIndicators,
  marketConceptsDifferences,
} from "@/lib/educationData"

export default function Component() {
  return (
    <section className="container mx-auto p-6">
      <header className="my-8">
        <h1 className="text-4xl font-bold text-center mb-2">
          One Stop Destination.
        </h1>
        <h2 className="text-2xl text-center">
          To all financial topics you need to know.
        </h2>
      </header>
      <div className="grid gap-4">
        <div>
          <p className="text-2xl font-bold mb-4">Finance Terminologies</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {commonFinance.map((item, index) => (
              <Card
                className="rounded-md shadow-md overflow-hidden"
                key={index}
              >
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4">{item.title}</h2>
                  <p className="text-foreground/90 mb-4">{item.definition}</p>
                  <p className="text-foreground/60">{item.example}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        <Separator className="mt-4" />
        <div>
          <p className="text-2xl font-bold mb-4">Financial Indicators</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {financialIndicators.map((item, index) => (
              <Card
                className="rounded-md shadow-md overflow-hidden"
                key={index}
              >
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4">{item.title}</h2>
                  <p className="text-green-500 mb-4">{item.good}</p>
                  <p className="text-red-500">{item.bad}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        <Separator className="mt-4" />
        <div>
          <p className="text-2xl font-bold mb-4">Market Concepts</p>
          <div className="grid md:grid-cols-2 gap-8">
            {marketConceptsDifferences.map((item, index) => (
              <div
                className="grid gap-6 items-start justify-center"
                key={index}
              >
                <div className="border rounded-lg overflow-auto text-center mx-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-center">
                          {item.title1}
                        </TableHead>
                        <TableHead className="text-center">
                          {item.title2}
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {item.differences.map((diff, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium text-center">
                            {diff.first}
                          </TableCell>
                          <TableCell className="text-center">
                            {diff.second}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {MarketConcepts2.map((item, index) => (
              <Card
                className="rounded-md shadow-md overflow-hidden"
                key={index}
              >
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4">{item.title}</h2>
                  <p className="text-foreground/90 mb-4">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
