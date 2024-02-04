import Description from "@/components/Home/Description"
import Hero from "@/components/Home/Hero"
import Navbar from "@/components/Home/Navbar"
import Cards from "@/components/Home/Service"

export default async function Index() {
  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <Navbar />
      <Hero />
      <Description />
      <Cards />
    </div>
  )
}
