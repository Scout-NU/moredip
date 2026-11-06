export default function Home() {
    return (
      <div className="w-full min-w-0 overflow-x-clip">

       <section
          id="aboutPage"
          className="flex min-h-[350x] w-full items-center justify-center bg-[#d9d9d9] bg-cover bg-center px-8 py-12 sm:px-12 md:min-h-[400px] lg:px-16"
          style={{
            backgroundImage: "url('/images/aboutHero.jpg')",
          }}
        >
          <h1 className="font-league text-center text-[128px] font-normal leading-[1.05] text-[#d62050] sm:text-[54px] lg:text-[90px]">
          Not your average snack
        </h1>

      </section>

      <section
        id="home"
        className="grid min-h-[480px] w-full grid-cols-1 bg-[#FFF2DF] md:min-h-[550px] md:grid-cols-2"
      >
        <div className="flex items-center justify-center">
    <div
      className="aspect-square w-[min(70vw,360px)] overflow-hidden rounded-full bg-[#d9d9d9] bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/dip-closeup.jpg')",
      }}
    />
  </div>

      <div className="flex flex-col items-start justify-center">
        <h1 className="font-league text-[40px] font-normal leading-[1.05] text-[#F94513] sm:text-[54px] lg:text-[70px]">
          Wait, how did we get here?
        </h1>

        <p className="max-w-[550px] mt-6 text-[25px] font-normal leading-[normal] text-black">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sit amet semper diam. Sed quis sollicitudin est. Sed dolor lorem, pharetra eget lacus vel, convallis pharetra orci. Pellentesque sit amet est nibh. Mauris quis elit et orci euismod efficitur. Suspendisse sodales porttitor turpis at malesuada. Mauris sagittis ipsum tortor, ut tempus justo lacinia sed. Cras aliquet sit amet orci nec venenatis. Maecenas varius semper nulla et rhoncus. Quisque eu ipsum rutrum, pretium metus sit amet, volutpat ipsum. 
        </p>
      </div>
      </section>

      {/* Divider stripe */}
    <div className="flex w-full items-center justify-center bg-[#F94513] px-6 py-3">
      <p className="text-center text-[18px] font-bold uppercase text-[#FFD208] sm:text-[22px]">
        Conveyor text or solid stripe/divider to transition to footer
      </p>
    </div>

    {/* Why MoreDip */}
<section className="w-full bg-[#17A6DE] px-8 py-16 sm:px-12 lg:px-16 lg:py-24">
  <h2 className="font-league text-center text-[40px] font-normal leading-[1.05] text-[#FFD208] sm:text-[54px] lg:text-[70px]">
    Why MoreDip?
  </h2>

  <div className="mx-auto mt-12 grid max-w-[1200px] grid-cols-2 gap-x-8 gap-y-12 lg:mt-16 lg:grid-cols-4">
    {[1, 2, 3, 4].map((n) => (
      <div key={n} className="flex flex-col items-center text-center">
        <div className="aspect-square w-[min(35vw,200px)] rounded-full bg-[#d9d9d9] bg-cover bg-center" />
        <p className="mt-6 text-[24px] font-bold leading-[normal] text-[#FFD208] lg:text-[32px]">
          reason why
        </p>
      </div>
    ))}
  </div>
</section>

    {/* Divider stripe */}
    <div className="flex w-full items-center justify-center bg-[#FFD208] px-6 py-3">
      <p className="text-center text-[18px] font-bold uppercase text-[#17A6DE] sm:text-[22px]">
        Conveyor text or solid stripe/divider to transition to footer
      </p>
    </div>

      </div>
    );
  }
  