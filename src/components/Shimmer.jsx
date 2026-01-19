const Shimmer = ({ }) => {
  // count = how many shimmer cards you want
  return (
    <div className="shimmer-container flex flex-wrap justify-center">
      {Array.from({ length: 16 }).map((_, idx) => (
        <div className="shimmer-card" key={idx}>
          <div className="img-shimmer"></div>
          <div className="name-shimmer"></div>
          <div className="cuisine-shimmer"></div>
          <div className="rating-shimmer"></div>
          <div className="price-shimmer"></div>
          <div className="deltime-shimmer"></div>
        </div>
      ))}
    </div>
  );
};

export default Shimmer;





// const Shimmer = () => {
//   return (
//     <div className="shimmer-container">
//       <div className="shimmer-card">
//         <div className="img-shimmer"></div>
//         <div className="name-shimmer"></div>
//         <div className="cuisine-shimmer"></div>
//         <div className="rating-shimmer"></div>
//         <div className="price-shimmer"></div>
//         <div className="deltime-shimmer"></div>
//       </div>
//       <div className="shimmer-card">
//         <div className="img-shimmer"></div>
//         <div className="name-shimmer"></div>
//         <div className="cuisine-shimmer"></div>
//         <div className="rating-shimmer"></div>
//         <div className="price-shimmer"></div>
//         <div className="deltime-shimmer"></div>
//       </div>
//       <div className="shimmer-card">
//         <div className="img-shimmer"></div>
//         <div className="name-shimmer"></div>
//         <div className="cuisine-shimmer"></div>
//         <div className="rating-shimmer"></div>
//         <div className="price-shimmer"></div>
//         <div className="deltime-shimmer"></div>
//       </div>
//       <div className="shimmer-card">
//         <div className="img-shimmer"></div>
//         <div className="name-shimmer"></div>
//         <div className="cuisine-shimmer"></div>
//         <div className="rating-shimmer"></div>
//         <div className="price-shimmer"></div>
//         <div className="deltime-shimmer"></div>
//       </div>
//       <div className="shimmer-card">
//         <div className="img-shimmer"></div>
//         <div className="name-shimmer"></div>
//         <div className="cuisine-shimmer"></div>
//         <div className="rating-shimmer"></div>
//         <div className="price-shimmer"></div>
//         <div className="deltime-shimmer"></div>
//       </div>
//       <div className="shimmer-card">
//         <div className="img-shimmer"></div>
//         <div className="name-shimmer"></div>
//         <div className="cuisine-shimmer"></div>
//         <div className="rating-shimmer"></div>
//         <div className="price-shimmer"></div>
//         <div className="deltime-shimmer"></div>
//       </div>
//       <div className="shimmer-card">
//         <div className="img-shimmer"></div>
//         <div className="name-shimmer"></div>
//         <div className="cuisine-shimmer"></div>
//         <div className="rating-shimmer"></div>
//         <div className="price-shimmer"></div>
//         <div className="deltime-shimmer"></div>
//       </div>
//       <div className="shimmer-card">
//         <div className="img-shimmer"></div>
//         <div className="name-shimmer"></div>
//         <div className="cuisine-shimmer"></div>
//         <div className="rating-shimmer"></div>
//         <div className="price-shimmer"></div>
//         <div className="deltime-shimmer"></div>
//       </div>
//       <div className="shimmer-card">
//         <div className="img-shimmer"></div>
//         <div className="name-shimmer"></div>
//         <div className="cuisine-shimmer"></div>
//         <div className="rating-shimmer"></div>
//         <div className="price-shimmer"></div>
//         <div className="deltime-shimmer"></div>
//       </div>
//       <div className="shimmer-card">
//         <div className="img-shimmer"></div>
//         <div className="name-shimmer"></div>
//         <div className="cuisine-shimmer"></div>
//         <div className="rating-shimmer"></div>
//         <div className="price-shimmer"></div>
//         <div className="deltime-shimmer"></div>
//       </div>
//       <div className="shimmer-card">
//         <div className="img-shimmer"></div>
//         <div className="name-shimmer"></div>
//         <div className="cuisine-shimmer"></div>
//         <div className="rating-shimmer"></div>
//         <div className="price-shimmer"></div>
//         <div className="deltime-shimmer"></div>
//       </div>
//       <div className="shimmer-card">
//         <div className="img-shimmer"></div>
//         <div className="name-shimmer"></div>
//         <div className="cuisine-shimmer"></div>
//         <div className="rating-shimmer"></div>
//         <div className="price-shimmer"></div>
//         <div className="deltime-shimmer"></div>
//       </div>
//       <div className="shimmer-card">
//         <div className="img-shimmer"></div>
//         <div className="name-shimmer"></div>
//         <div className="cuisine-shimmer"></div>
//         <div className="rating-shimmer"></div>
//         <div className="price-shimmer"></div>
//         <div className="deltime-shimmer"></div>
//       </div>
//       <div className="shimmer-card">
//         <div className="img-shimmer"></div>
//         <div className="name-shimmer"></div>
//         <div className="cuisine-shimmer"></div>
//         <div className="rating-shimmer"></div>
//         <div className="price-shimmer"></div>
//         <div className="deltime-shimmer"></div>
//       </div>
//       <div className="shimmer-card">
//         <div className="img-shimmer"></div>
//         <div className="name-shimmer"></div>
//         <div className="cuisine-shimmer"></div>
//         <div className="rating-shimmer"></div>
//         <div className="price-shimmer"></div>
//         <div className="deltime-shimmer"></div>
//       </div>
//       <div className="shimmer-card">
//         <div className="img-shimmer"></div>
//         <div className="name-shimmer"></div>
//         <div className="cuisine-shimmer"></div>
//         <div className="rating-shimmer"></div>
//         <div className="price-shimmer"></div>
//         <div className="deltime-shimmer"></div>
//       </div>
//     </div>
//   );
// };

// export default Shimmer;
