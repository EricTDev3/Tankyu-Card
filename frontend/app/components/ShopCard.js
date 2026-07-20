export default function ShopCard({ shop, action }) {
  return (
    <>
      <a
        href="#"
        className="relative block overflow-hidden border-2 border-black bg-[url('/images/sakuraCard.png')] bg-cover bg-center bg-no-repeat shadow-[4px_4px_0_0] shadow-black"
      >
        {/* White overlay */}
        <div className="bg-white/75 backdrop-blur-sm p-4">
          <h3 className="font-hiro mt-1 text-2xl font-bold text-red-900 drop-shadow-sm">
            {shop.shop_name}
          </h3>

          {/* <p className="mt-3 text-base leading-relaxed text-gray-900">
          <span className="font-bold">Address:</span> {shop.address}
        </p> */}
          <div className="mt-4 divide-y divide-red-200 text-sm">
            <div className="flex py-2">
              <span className="w-24 font-semibold text-red-900">Address:</span>
              <span className="flex-1 text-gray-700">{shop.address}</span>
            </div>
          </div>

          <div className="flex py-2">
            <span className="w-24 font-semibold text-red-900">TCG Sets</span>
            <span className="flex-1 text-gray-700">
              {shop.card_set_sold.join(", ")}
            </span>
          </div>

          {/* <p className="mt-2 text-base leading-relaxed text-gray-900">
            <span className="font-bold">TCG Sets sold:</span>{" "}
            {shop.card_set_sold.join(", ")}
          </p> */}

          {action}
        </div>
      </a>
    </>
  );
}
