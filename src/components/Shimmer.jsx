const ShimmerCard = () => (
  <div className="w-[80vw] sm:w-[250px] h-[430px] bg-[#f0f0f0] rounded-lg m-2.5 p-2 box-border flex flex-col gap-3">

    {/* Image */}
    <div className="relative h-[180px] w-full rounded-md bg-[#d1d1d1] overflow-hidden shimmer-el" />

    {/* Name */}
    <div className="relative h-[18px] w-4/5 rounded-md bg-[#d1d1d1] overflow-hidden shimmer-el mt-2.5" />

    {/* Cuisine */}
    <div className="relative h-4 w-3/5 rounded-md bg-[#d1d1d1] overflow-hidden shimmer-el mt-2.5" />

    {/* Rating */}
    <div className="relative h-4 w-1/4 rounded-md bg-[#d1d1d1] overflow-hidden shimmer-el mt-2.5" />

    {/* Price */}
    <div className="relative h-4 w-2/5 rounded-md bg-[#d1d1d1] overflow-hidden shimmer-el mt-2.5" />

    {/* Delivery time */}
    <div className="relative h-4 w-[70%] rounded-md bg-[#d1d1d1] overflow-hidden shimmer-el mt-2.5" />

  </div>
);

const Shimmer = ({ count = 15 }) => {
  return (
    <>
      <style>{`
        @keyframes shimmer-x {
          0%   { transform: translate3d(-150%, 0, 0); }
          100% { transform: translate3d(150%, 0, 0); }
        }

        .shimmer-el::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 60%;
          background: linear-gradient(
            90deg,
            rgba(255,255,255,0)   0%,
            rgba(255,255,255,0.6) 50%,
            rgba(255,255,255,0)   100%
          );
          transform: translate3d(-150%, 0, 0);
          will-change: transform;
          animation: shimmer-x 1.1s linear infinite;
          pointer-events: none;
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
        }

        @media (prefers-reduced-motion: reduce) {
          .shimmer-el::after {
            animation: none;
            transform: translate3d(0, 0, 0);
            opacity: 0.95;
          }
        }
      `}</style>

      <div className="flex flex-wrap justify-center mt-[50px] w-full">
        {Array.from({ length: count }).map((_, idx) => (
          <ShimmerCard key={idx} />
        ))}
      </div>
    </>
  );
};

export default Shimmer;