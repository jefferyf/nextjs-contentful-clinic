import React from "react";
import { SearchContext } from "../context/searchContext";

const Assessment = () => {
  const { searchDetails, setSearchDetails } = React.useContext(SearchContext);

  const handleClick = (e) => {
    setSearchDetails({
      ...searchDetails,
      positive: !searchDetails.positive,
    });
  };

  const handleChange = (e) => {
    console.log(e.target.value);
    setSearchDetails({
      ...searchDetails,
      positive: Boolean(e.target.value),
    });
  };

  return (
    <section className="bg-white dark:bg-gray-900">
      <pre>{JSON.stringify(searchDetails)}</pre>
      <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
          Assessment
        </h2>
        <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sequi eos
          fugit sit modi id sed nobis, repellendus ut architecto commodi
          sapiente iusto nam tempora at in! Aut voluptas nisi quos?
        </p>

        <div>
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
            Question One
          </h2>
          <p>Are you positive?</p>
          <div>
            <label htmlFor="positiveTrue">
              <input
                type="radio"
                id="positiveTrue"
                name="positive"
                value={"true"}
                onChange={handleChange}
              />
              True
            </label>
            <label htmlFor="positiveFalse">
              <input
                type="radio"
                id="positiveFalse"
                name="positive"
                value={""}
                onChange={handleChange}
              />
              False
            </label>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Assessment;
