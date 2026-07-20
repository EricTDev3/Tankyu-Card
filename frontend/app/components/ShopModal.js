import axios from "axios";

export default function ShopModal({ shop, onClose }) {
  const handleAddShop = async (id) => {
    try {
      const reponse = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/shops/savedShops`,
        { shopId: id },
        { withCredentials: true },
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <dialog
        open
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
        className="m-auto flex flex-col max-w-xl rounded-lg bg-white p-6 shadow-lg backdrop:bg-black/50 bg-[url('/images/sakuraModal.png')] bg-cover bg-no-repeat"
      >
        <div className="flex flex-col gap-5">
          <div className="flex items-start justify-between">
            <h2
              id="modalTitle"
              className="font-hiro text-3xl text-red-900 drop-shadow-sm"
            >
              {shop.shop_name}
            </h2>

            <button
              type="button"
              data-modal-close
              className="-me-4 -mt-4 rounded-full border-2 border-red-800 bg-white/80 p-2 text-red-800 transition hover:bg-red-800 hover:text-white cursor-pointer"
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
          <p
            id="modalDescription"
            className="rounded-md bg-white/70 px-4 py-3 text-base leading-7 text-gray-800 backdrop-blur-sm"
          >
            <span className="font-semibold text-red-900">Address:</span>{" "}
            {shop.address}
          </p>
          <p
            id="modalDescription"
            className="rounded-md bg-white/70 px-4 py-3 text-base leading-7 text-gray-800 backdrop-blur-sm"
          >
            <span className="font-semibold text-red-900">Shop Hours:</span>{" "}
            {shop.store_hours}
          </p>
          <p
            id="modalDescription"
            className="rounded-md bg-white/70 px-4 py-3 text-base leading-7 text-gray-800 backdrop-blur-sm"
          >
            <span className="font-semibold text-red-900">Neighborhood:</span>{" "}
            {shop.neighborhood}{" "}
            <span className="font-semibold text-red-900">City:</span>{" "}
            {shop.city}
          </p>
          <p className="mt-2 line-clamp-2 text-pretty">
            <span className="font-semibold text-red-900">TCG Sets sold:</span>{" "}
            {shop.card_set_sold.map((set, index) =>
              index === shop.card_set_sold.length - 1 ? `${set}` : `${set}, `,
            )}
          </p>
          <p
            id="modalDescription"
            className="mt-2 rounded-md bg-white/60 p-4 leading-7 text-gray-700 backdrop-blur-sm"
          >
            {shop.description}
          </p>
        </div>
        <button
          className="self-end rounded-full bg-red-900 px-5 py-2 font-medium text-white shadow-md cursor-pointer transition-all hover:bg-red-700 hover:shadow-lg"
          onClick={() => {
            handleAddShop(shop.id);
            onClose();
          }}
        >
          Add Shop
        </button>
      </dialog>
    </div>
  );
}
