import foodCatg from './Arraydata/FoodCatgData';

const Component = ({ title, ImgSrc, Alt }) => {
  return (
    <div className="rounded-xl  border-1 border-gray-200 overflow-hidden  bg-gray-50">
      <div
        className="flex flex-col justify-end bg-cover bg-center bg-no-repeat overflow-hidden h-40 w-40  relative"
        style={{
          backgroundImage: `url(${ImgSrc})`
        }}
        aria-label={Alt}
      >
        {/* Fallback text if the background image fails */}
        <div
          className="absolute inset-0 flex items-center justify-center text-gray-700 bg-gray-100 text-center p-2 rounded-xl"
          style={{
            display: ImgSrc ? 'none' : 'flex' // Show only if ImgSrc fails
          }}
        >
          {Alt}
        </div>
      </div>
      <div className="w-full text-black p-3 rounded-b-xl">
        <h3 className="text-sm float-left font-semibold">{title}</h3>
      </div>
    </div>

  );
};

const FoodCatg = ({ showAll }) => {
  // Calculate the number of items to display: one row (5 items) or all
  const itemsToShow = showAll ? foodCatg : foodCatg.slice(0, 6);

  return (
    <div className="grid gap-6 mt-8 w-fit" style={{ gridTemplateColumns: 'repeat(6, 1fr)' }}>
      {itemsToShow.map((item, index) => (
        <Component key={index} title={item.title} ImgSrc={item.ImgSrc} Alt={item.Alt} />
      ))}
    </div>
  );
};

export default FoodCatg;
