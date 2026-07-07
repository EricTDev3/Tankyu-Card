export default function ShopModal({ shop, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <dialog
        open
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
        className="m-auto max-w-xl rounded-lg bg-white p-6 shadow-lg backdrop:bg-black/50"
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-start justify-between">
            <h2
              id="modalTitle"
              className="text-xl font-bold text-gray-900 sm:text-2xl"
            >
              {shop.shop_name}
            </h2>

            <button
              type="button"
              data-modal-close
              className="-me-4 -mt-4 rounded-full p-2 text-gray-600 transition-colors hover:text-gray-900 focus:ring-2 cursor-pointer focus:ring-indigo-600 border-2 border-indigo-600 focus:ring-offset-2 focus:ring-offset-white focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:outline-none"
              aria-label="Close"
              onClick={onClose}
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

          <p id="modalDescription" className="text-pretty text-gray-700">
            <span className="font-bold">Address:</span> {shop.address}
          </p>
          <p id="modalDescription" className="text-pretty text-gray-700">
            <span className="font-bold">Shop Hours:</span> {shop.store_hours}
          </p>
          <p id="modalDescription" className="text-pretty text-gray-700">
            <span className="font-bold">Neighborhood:</span> {shop.neighborhood}{" "}
            <span className="font-bold">City:</span> {shop.city}
          </p>
          <p className="mt-2 line-clamp-2 text-pretty">
            <span className="font-bold">TCG Sets sold:</span>{" "}
            {shop.card_set_sold.map((set, index) =>
              index === shop.card_set_sold.length - 1 ? `${set}` : `${set}, `,
            )}
          </p>
          <p id="modalDescription" className="text-pretty text-gray-700">
            {shop.description}
          </p>
        </div>
      </dialog>
    </div>
  );
}
