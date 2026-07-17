export default function ShopCard({ shop, action }) {
  return (
    <a
      href="#"
      className="block border-2 border-black bg-white p-4 text-black shadow-[4px_4px_0_0] shadow-black hover:bg-yellow-200 focus:ring-2 focus:ring-yellow-300 focus:outline-0 sm:p-6"
    >
      <h3 className="mt-1 text-xl font-semibold font-hiro">{shop.shop_name}</h3>

      <p className="mt-2 line-clamp-2 text-pretty">
        <span className="font-bold">Address:</span> {shop.address}
      </p>
      <p className="mt-2 line-clamp-2 text-pretty">
        <span className="font-bold">TCG Sets sold:</span>{" "}
        {shop.card_set_sold.map((set, index) =>
          index === shop.card_set_sold.length - 1 ? `${set}` : `${set}, `,
        )}
      </p>
      {action}
    </a>
  );
}
