export const useHelper = () => {
  function formatPrice(price) {
    price = price.toLocaleString("vi", {
      style: "currency",
      currency: "VND",
    });
    return price;
  }

  function b () {
    console.log("b");
  }

  return { formatPrice, b }
}