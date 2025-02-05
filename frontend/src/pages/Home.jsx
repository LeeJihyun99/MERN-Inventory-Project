import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [btn, setBtn] = useState(false);
  const navigate = useNavigate();

  const btnClicked = () => {
    setBtn(true);
  };

  useEffect(() => {
    if (btn) {
      console.log("Button clicked:", btn);
      navigate("/products/show");
    }
  }, [btn, navigate]);

  return (
    <div className="h-screen flex justify-center items-center">
      {!btn && (
        <button
          onClick={btnClicked}
          type="button"
          className="px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          All Products
        </button>
      )}
    </div>
  );
}

export default Home;
