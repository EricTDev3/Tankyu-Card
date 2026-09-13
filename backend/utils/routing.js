export const getDistance = (lat1, lng1, lat2, lng2) => {
  const radian = (degrees) => {
    return degrees * (Math.PI / 180);
  };

  const lat1Rad = radian(lat1);
  const lng1Rad = radian(lng1);
  const lat2Rad = radian(lat2);
  const lng2Rad = radian(lng2);

  const a =
    Math.sin((lat2Rad - lat1Rad) / 2) ** 2 +
    Math.cos(lat1Rad) *
      Math.cos(lat2Rad) *
      Math.sin((lng2Rad - lng1Rad) / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = 6371 * c;

  return distance;
};

export const nearestNeighborRoute = (shops) => {
  const route = [shops[0]];
  let remaining = shops.slice(1);

  while (remaining.length > 0) {
    let closestShop = remaining[0];
    const current = route[route.length - 1];
    let closestDistance = getDistance(
      current.latitude,
      current.longitude,
      remaining[0].latitude,
      remaining[0].longitude,
    );

    remaining.forEach((shop) => {
      const distance = getDistance(
        shop.latitude,
        shop.longitude,
        current.latitude,
        current.longitude,
      );

      if (distance < closestDistance) {
        closestDistance = distance;
        closestShop = shop;
      }
    });

    route.push(closestShop);
    remaining = remaining.filter((shop) => shop !== closestShop);
  }

  return route;
};

export const buildAllRoutes = (savedShops) => {
  const groupedByCity = savedShops.reduce((accumulator, shop) => {
    if (!accumulator[shop.city]) {
      accumulator[shop.city] = [];
    }
    accumulator[shop.city].push(shop);
    return accumulator;
  }, {});

  const allRoutes = {};
  for (const city in groupedByCity) {
    allRoutes[city] = nearestNeighborRoute(groupedByCity[city]);
  }

  return allRoutes;
};

export const formatRoutesForPrompt = (allRoutes) => {
  const lines = [];

  for (const city in allRoutes) {
    lines.push(`${city}:`);

    allRoutes[city].forEach((shop, index) => {
      lines.push(
        `${index + 1}. ${shop.shop_name} (Hours: ${shop.store_hours})`,
      );
    });
  }
  return lines.join("\n");
};
