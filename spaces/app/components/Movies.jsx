"use client";
import React, {useState, useEffect} from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import Image from "next/image";
import CTAButton from "./ui/button";
import { ImageWithFallback } from "./ui/ImageWithFallback";
import Link from "next/link";

const movies = [
  { id: 1, title: "HAVOC", year: 2025, rating: "PG-13", score: "8.2", poster: "/assets/Havoc.jpg", synopsis: "A cinematic journey where imagination becomes reality." },
  { id: 2, title: "SPARTACUS", year: 2025, rating: "R", score: "7.9", poster: "/assets/spartacus.jpg", synopsis: "A sci-fi heist across floating cities." },
  { id: 3, title: "PEAKY BLINDERS", year: 2025, rating: "PG", score: "6.8", poster: "/assets/peaky-blinder.jpg", synopsis: "A coming-of-age story about first loves and old friends." },
  { id: 4, title: "JOHN WICK", year: 2024, rating: "PG-13", score: "8.7", poster: "/assets/John-Wick.jpg", synopsis: "A director races to finish his final masterpiece." },
  { id: 5, title: "BATMAN", year: 2025, rating: "R", score: "7.5", poster: "/assets/batman.jpg", synopsis: "An edge-of-your-seat thriller that never lets go." },
];

const placeholderSvg = encodeURIComponent(
  "<svg xmlns='http://www.w3.org/2000/svg' width='1000' height='1400'><rect width='100%' height='100%' fill='%23e5e7eb'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%236b7280' font-size='36'>Poster</text></svg>"
);
// const placeholder = `data:image/svg+xml;utf8,${placeholderSvg}`;



export default function Movies({ poster, title, placeholder = "/assets/default-image.svg" }) {
  const [imgSrc, setImgSrc] = useState(poster || placeholder);
  return (
    <section id="movies" className="w-full overflow-hidden mx-auto md:max-w-5xl text-[#F3F4F6]">
      <div className="flex items-center px-4 justify-between py-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold text-[#F3F4F6] ">Latest Movies</h2>
          <p className="text-sm hidden sm:block text-gray-400">Now playing · Coming soon · Top rated</p>
        </div>
        {/* <div className="flex gap-2">
          <CTAButton className="text-xs px-3 py-1.5 md:text-sm md:px-4 md:py-2">View All Showtimes</CTAButton>
        </div> */}
      </div>

      <Tabs defaultValue="now">
        <div className="flex px-4 flex-col md:flex-row gap-6 items-start">
          <TabsList className="flex md:flex-col w-full md:w-48 overflow-x-auto no-scrollbar bg-card rounded-md p-2 gap-2 h-full" role="tablist">
            <div className="w-full h-full flex flex-row md:flex-col items-start">
              <TabsTrigger className={"w-full"} value="now">Now Showing</TabsTrigger>
              <TabsTrigger className={"w-full"} value="coming">Coming Soon</TabsTrigger>
              <TabsTrigger className={"w-full"} value="top">Top Rated</TabsTrigger>
              <TabsTrigger className={"w-full"} value="genres">Genres</TabsTrigger>
            </div>
          </TabsList>

          <div className="md:flex-1 w-full">
            {/* --- NOW SHOWING --- */}
            <TabsContent value="now" className="p-0">
              {/* Mobile carousel */}
              <div className="md:hidden">
                <div className="flex gap-4 overflow-x-auto w-full no-scrollbar">
                  {movies.map((m, index) => (
                    <article key={m.id} className="snap-center flex-shrink-0 w-[50%] sm:w-[60%] rounded-xl overflow-hidden bg-card shadow">
                      <div className="relative h-72">
                        <ImageWithFallback
                          src={m.poster}
                          alt={m.title}
                          fill // or use width/height for better CLS control
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          loading={index === 0 ? "eager" : "lazy"} // only the first image eager if needed
                          quality={75} // tradeoff: 70-80 is usually great
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                      <div className="p-3">
                        <h3 className="text-sm font-semibold">{m.title} <span className="text-xs text-gray-400">({m.year})</span></h3>
                        <p className="text-xs text-gray-400 mt-1 line-clamp-2">{m.synopsis}</p>
                        <div className="mt-3 flex items-center justify-between">
                          <div className="text-xs text-gray-400">{m.rating} • {m.score}</div>
                          <div className="flex gap-2">
                            <CTAButton className="text-xs px-3 py-1.5 md:text-sm md:px-4 md:py-2">Buy Tickets</CTAButton>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              {/* Desktop grid */}
              <div className="hidden md:block">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {movies.map((m, index) => (
                    <article key={m.id} className="rounded-xl overflow-hidden shadow-lg bg-card flex flex-col">
                      <div className="relative w-full h-72">
                        <ImageWithFallback
                          src={m.poster}
                          alt={m.title}
                          fill // or use width/height for better CLS control
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          loading={index === 0 ? "eager" : "lazy"} // only the first image eager if needed
                          quality={75} // tradeoff: 70-80 is usually great
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                      <div className="p-4 flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="text-lg font-semibold">{m.title}</h3>
                          <p className="text-sm text-gray-400">{m.year} • {m.rating} • Score {m.score}</p>
                          <p className="mt-3 text-sm text-gray-300 line-clamp-3">{m.synopsis}</p>
                        </div>

                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <CTAButton variant="white" size="sm">Watch Trailer</CTAButton>
                            {/* <button className="text-sm px-3 py-2 rounded-md bg-white text-black hover:scale-[1.01] transition">Watch Trailer</button> */}
                            <CTAButton href={"/login"} size="sm">
                             
                              Buy Tickets
                           
                            </CTAButton>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* --- COMING SOON --- */}
            <TabsContent value="coming">
              <div className="">
                <h3 className="text-lg font-semibold mb-3">Coming Soon</h3>
                <p className="text-sm text-gray-400">Get early access to trailers, pre-sale tickets, and exclusive sneak peeks.</p>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {movies.slice(0, 3).map((m, index) => (
                    <article key={m.id} className="rounded-xl overflow-hidden shadow bg-card">
                      <div className="relative h-64">
                        <ImageWithFallback
                          src={m.poster}
                          alt={m.title}
                          fill // or use width/height for better CLS control
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          loading={index === 0 ? "eager" : "lazy"} // only the first image eager if needed
                          quality={75} // tradeoff: 70-80 is usually great
                          style={{ objectFit: "cover" }}
                        />

                      </div>
                      <div className="p-3">
                        <h4 className="font-semibold">{m.title}</h4>
                        <p className="text-sm text-gray-400">Releases {m.year}</p>
                        <div className="mt-3 flex justify-between items-center">
                          <CTAButton size="sm">Pre-order Tickets</CTAButton>
                          <CTAButton variant="white" size="sm">Remind me</CTAButton>
                          {/* <button className="text-sm text-gray-400">Remind me</button> */}
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* --- TOP RATED --- */}
            <TabsContent value="top">
              <div className="w-full">
                <h3 className="text-lg font-semibold mb-3">Top Rated</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {movies
                    .slice()
                    .sort((a, b) => parseFloat(b.score) - parseFloat(a.score))
                    .map((m, index) => (
                      <div key={m.id} className="flex w-full gap-4 items-start bg-card p-3 rounded-md">
                        <div className="relative w-[40%] h-32 rounded overflow-hidden">
                          <ImageWithFallback
                            src={m.poster}
                            alt={m.title}
                            fill // or use width/height for better CLS control
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            loading={index === 0 ? "eager" : "lazy"} // only the first image eager if needed
                            quality={75} // tradeoff: 70-80 is usually great
                            style={{ objectFit: "cover" }}
                          />

                          {/* <Image src={imgSrc} alt={m.title} fill style={{ objectFit: "cover" }} /> */}
                        </div>
                        <div>
                          <h4 className="font-semibold">{m.title}</h4>
                          <p className="text-sm text-gray-400">Score {m.score} • {m.year}</p>
                          <div className="mt-2">
                            <CTAButton size="sm" >View Details</CTAButton>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </TabsContent>

            {/* --- GENRES (simple example) --- */}
            <TabsContent value="genres">
              <div className="">
                <h3 className="text-lg font-semibold mb-3">Browse by Genre</h3>
                <div className="flex gap-3 flex-wrap">
                  {['Action', 'Drama', 'Comedy', 'Sci-Fi', 'Horror'].map((g) => (
                    <button key={g} className="px-3 py-2 bg-card rounded-md text-sm">{g}</button>
                  ))}
                </div>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {movies.map((m, index) => (
                    <article key={m.id} className="rounded-xl overflow-hidden shadow-lg bg-card">
                      <div className="relative h-64">
                        <ImageWithFallback
                          src={m.poster}
                          alt={m.title}
                          fill // or use width/height for better CLS control
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          loading={index === 0 ? "eager" : "lazy"} // only the first image eager if needed
                          quality={75} // tradeoff: 70-80 is usually great
                          style={{ objectFit: "cover" }}
                        />

                      </div>
                      <div className="p-3">
                        <h4 className="font-semibold">{m.title}</h4>
                        <p className="text-sm text-gray-400">{m.year} • {m.rating}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </TabsContent>

          </div>
        </div>
      </Tabs>

      <div className="py-8 text-center text-sm text-gray-500">Discover showtimes near you and book tickets directly.</div>
    </section>
  );
}
