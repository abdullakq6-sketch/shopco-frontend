const STYLES = [
  {
    name: "Casual",
    image:
      "https://images.pexels.com/photos/7880003/pexels-photo-7880003.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    span: "md:col-span-2",
  },
  {
    name: "Formal",
    image:
      "https://images.pexels.com/photos/3875654/pexels-photo-3875654.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    span: "md:col-span-3",
  },
  {
    name: "Party",
    image:
      "https://images.pexels.com/photos/3419729/pexels-photo-3419729.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    span: "md:col-span-3",
  },
  {
    name: "Gym",
    image:
      "https://images.pexels.com/photos/32695898/pexels-photo-32695898.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    span: "md:col-span-2",
  },
];

export function DressStyles() {
  return (
    <section className="mx-auto max-w-[1240px] px-4 py-8 lg:py-12">
      <div className="rounded-[20px] bg-[#F0F0F0] px-6 py-10 lg:rounded-[40px] lg:px-16 lg:py-16">
        <h2 className="text-center font-display text-[32px] leading-none lg:text-5xl">
          BROWSE BY DRESS STYLE
        </h2>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-5 lg:mt-16 lg:gap-5">
          {STYLES.map((style) => (
            <a
              key={style.name}
              href="/product/one-life-graphic-t-shirt"
              className={`group relative block h-[190px] overflow-hidden rounded-[20px] bg-white lg:h-[289px] ${style.span}`}
            >
              <img
                src={style.image}
                alt={`${style.name} style`}
                className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <span className="absolute left-6 top-4 text-2xl font-bold text-white drop-shadow-md lg:left-9 lg:top-6 lg:text-[36px]">
                {style.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
