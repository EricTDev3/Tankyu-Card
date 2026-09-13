import { useState, useEffect } from "react";
import axios from "axios";
import ShopCard from "./ShopCard";
import ItineraryMap from "./ItineraryMap";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";

export default function MustVisitShops() {
  const [savedShops, setSavedShops] = useState([]);
  const [tripPlan, setTripPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSavedShops = async () => {
      const response = await axios.get("/api/shops/getSavedShops", {
        withCredentials: true,
      });
      setSavedShops(response.data.shopData);
    };
    fetchSavedShops();
  }, []);

  const handleRemoveShop = async (shopId) => {
    const response = await axios.delete("/api/shops/deleteSavedShop", {
      withCredentials: true,
      data: { shopId },
    });
    const filteredShops = savedShops.filter((shop) => shop.shop_id !== shopId);
    setSavedShops(filteredShops);
  };

  const handleGeneratePlan = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/shops/generateTripPlan");
      setTripPlan(response.data.tripPlan);
    } catch (error) {
      setError(error);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex min-h-screen bg-[url('/images/shopsToVisit.png')] bg-cover bg-no-repeat">
        <div className="flex flex-1 flex-col">
          <h1
            className="text-center font-hiro text-5xl
          font-bold
          bg-gradient-to-r
          from-red-500
          via-yellow-300
          via-green-300
          via-cyan-300
          via-blue-400
          via-purple-400
          to-pink-400
          bg-clip-text
          text-transparent
          drop-shadow-[0_0_8px_rgba(255,255,255,0.35)] mt-10"
          >
            TCG WAYPOINTS
          </h1>

          <ItineraryMap shops={savedShops} />

          <div className="mt-4 flex flex-col items-center gap-2 px-4">
            <button
              className="rounded-full bg-red-900 px-5 py-2 font-medium text-white shadow-md transition-all hover:bg-red-700 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
              onClick={handleGeneratePlan}
              disabled={loading}
            >
              {loading ? "Generating..." : "Plan My Trip"}
            </button>
            {error && (
              <p className="text-center text-sm font-medium text-yellow-500">
                Something went wrong generating your trip plan.
              </p>
            )}
          </div>

          {tripPlan && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <button
                type="button"
                aria-label="Dismiss trip plan"
                className="absolute inset-0 bg-black/40"
                onClick={() => setTripPlan(null)}
              />
              <div className="relative z-10 flex max-h-[80vh] w-full max-w-2xl flex-col overflow-hidden border-2 border-black bg-[url('/images/sakuraModal.png')] bg-cover bg-no-repeat shadow-[4px_4px_0_0] shadow-black">
                <div className="flex min-h-0 flex-1 flex-col bg-white/75 backdrop-blur-sm p-4">
                  <div className="mb-3 flex items-start justify-between gap-4">
                    <h2 className="font-hiro text-2xl font-bold text-red-900 drop-shadow-sm sm:text-3xl">
                      Trip Plan
                    </h2>
                    <button
                      type="button"
                      aria-label="Close"
                      className="-me-1 -mt-1 rounded-full border-2 border-red-800 bg-white/80 p-2 text-red-800 transition hover:bg-red-800 hover:text-white"
                      onClick={() => setTripPlan(null)}
                    >
                      <svg
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        className="size-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                  <div className="min-h-0 flex-1 overflow-y-auto rounded-md bg-white/70 px-4 py-3 text-sm leading-7 text-gray-800 sm:text-base">
                    <ReactMarkdown
                      remarkPlugins={[remarkBreaks]}
                      components={{
                        h1: ({ children }) => (
                          <h1 className="font-hiro mb-2 text-2xl font-bold text-red-900">
                            {children}
                          </h1>
                        ),
                        h2: ({ children }) => (
                          <h2 className="font-hiro mb-2 text-xl font-bold text-red-900">
                            {children}
                          </h2>
                        ),
                        h3: ({ children }) => (
                          <h3 className="font-hiro mb-1 text-lg font-bold text-red-900">
                            {children}
                          </h3>
                        ),
                        p: ({ children }) => (
                          <p className="mb-2 text-gray-800">{children}</p>
                        ),
                        strong: ({ children }) => (
                          <strong className="font-bold text-red-900">
                            {children}
                          </strong>
                        ),
                        ul: ({ children }) => (
                          <ul className="mb-2 list-disc space-y-1 pl-5">
                            {children}
                          </ul>
                        ),
                        ol: ({ children }) => (
                          <ol className="mb-2 list-decimal space-y-1 pl-5">
                            {children}
                          </ol>
                        ),
                        li: ({ children }) => (
                          <li className="text-gray-800">{children}</li>
                        ),
                      }}
                    >
                      {tripPlan}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>
            </div>
          )}

          {savedShops && savedShops.length > 0 ? (
            <div className="mt-6 grid grid-cols-1 gap-6 p-4 sm:grid-cols-2 lg:grid-cols-3">
              {savedShops.map((shop) => (
                <div key={shop.id}>
                  <ShopCard
                    shop={shop}
                    action={
                      <button
                        className="flex cursor-pointer justify-self-end self-end rounded-full bg-red-900 px-5 py-2 font-medium text-white shadow-md transition-all hover:bg-red-700 hover:shadow-lg"
                        onClick={() => handleRemoveShop(shop.id)}
                      >
                        Remove Shop
                      </button>
                    }
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-1 items-center justify-center">
              <p className="text-center text-yellow-500">
                Please add shops to the list via the All Shops tab
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
