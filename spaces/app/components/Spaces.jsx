import React from 'react'

import Image from 'next/image'
import CTAButton from './ui/button'

const Spaces = () => {
  return (
        <section className=" text-[#F3F4F6]">
            <br/>
            <br/>
            <div className="w-full md:max-w-5xl mx-auto px-4">
                {/* studio logos */}
                <div className="flex flex-wrap items-center justify-center gap-8 opacity-50 mb-8">
                <span><Image className='object-cover' width={100} height={50} src={"/assets/google.svg"} alt='studio logo'/></span>
                <span><Image className='object-cover' width={100} height={50} src={"/assets/bloomberg.png"} alt='studio logo'/></span>
                <span><Image className='object-cover' width={100} height={50} src={"/assets/microsoft-1.png"} alt='studio logo'/></span>
                <span><Image className='object-cover' width={100} height={50} src={"/assets/coca-cola.svg"} alt='studio logo'/></span>
                <span><Image className='object-cover' width={100} height={50} src={"/assets/netflix.png"} alt='studio logo'/></span>
                </div>

                {/* heading */}
                <h2 className="text-left font-semibold leading-tight">
                <span className='text-xl'>Now playing in cinemas — <em>HAVOC</em>. </span>
                <span className="text-gray-400 text-xl">Experience the story that critics are calling "visually stunning and unexpectedly moving" on the big screen.</span>
                </h2>

                <br/>
                <br/>
                <br/>

                {/* hero */}
                <div className="">
                <div className="relative rounded-2xl overflow-hidden bg-card shadow-xl">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                    {/* left text panel (over background) */}
                    <div className="relative p-4 md:py-20 md:px-14 flex items-center">
                        {/* subtle blurred background using same image (desktop shows it behind text) */}
                        <div className="absolute inset-0 -z-10 md:block hidden">
                        <Image
                            width={300}
                            height={300}
                            src="/assets/person.jpg"
                            alt="film poster background"
                            style={{ objectFit: "cover", filter: "blur(8px) brightness(0.45)" }}
                            priority
                        />
                        </div>

                        <div className="max-w-xl">
                        <h3 className="text-2xl sm:text-4xl text-foreground font-semibold mb-4">HAVOC — In Theaters Now</h3>
                        <p className="text-sm sm:text-base text-gray-400 mb-6">
                            A cinematic journey where imagination becomes reality. Follow a band of creators as they uncover an infinite canvas that reshapes their lives, one bold idea at a time.
                        </p>

                        <CTAButton href="/login">
                            Get Tickets
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </CTAButton>

                        </div>
                    </div>

                    {/* right image + mock UI */}
                    <div className="relative h-64 md:h-[420px]">
                        {/* full-size hero image (film poster) */}
                        <Image
                        src="/assets/Havoc.jpg"
                        alt="film poster"
                        fill
                        style={{ objectFit: "cover" }}
                        />

                        {/* left gradient fade for polish */}
                        <div className="pointer-events-none absolute left-0 top-0 h-full w-14 bg-gradient-to-r from-black/80 to-transparent" />
                        <div className="pointer-events-none absolute right-0 top-0 h-full w-14 bg-gradient-to-l from-black/30 to-transparent" />
                    </div>
                    </div>
                </div>
                </div>
            </div>
            <br/>
            <br/>
        </section>

    )
}

export default Spaces
