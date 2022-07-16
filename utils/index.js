export const formatMoney = (money) => {
  return money.toLocaleString("es-ES", {
    style: "currency",
    currency: "EUR",
  });
};

