function generateUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// Función para generar cupones "FIRSTORDER"
function generateFirstOrderCoupons(count) {
  const baseCoupon = {
    code: "FIRSTORDER",
    description: "5000$ en tu primer pedido",
    expiryDate: "2023-12-31",
    isActive: true,
    redemptionLimit: 1,
    redemptionCount: 0,
    discountType: "PERCENTAGE",
    discountValue: 10,
    minPurchaseAmount: 50,
  };

  const coupons = [];

  for (let i = 0; i < count; i++) {
    coupons.push({
      ...baseCoupon,
      id: generateUUID(),
    });
  }

  return coupons;
}

const initialCoupons = [
  {
    id: 1,
    code: "FIRSTORDER",
    description: "5000$ en tu primer pedido",
    expiryDate: "2023-12-31",
    isActive: true,
    redemptionLimit: 500,
    redemptionCount: 123,
    discountType: "PERCENTAGE",
    discountValue: 10,
    minPurchaseAmount: 50,
  },
  {
    id: 2,
    code: "FREEDELIVERY",
    description: "Free delivery on your next order",
    expiryDate: "2023-12-01",
    isActive: true,
    redemptionLimit: 1000,
    redemptionCount: 432,
    discountType: "FREE_SHIPPING",
    minPurchaseAmount: 25,
  },
  {
    id: 3,
    code: "SAVE50ON200",
    description: "$50 off when you spend $200 or more",
    expiryDate: "2023-10-15",
    isActive: true,
    redemptionLimit: 200,
    redemptionCount: 56,
    discountType: "FIXED_AMOUNT",
    discountValue: 50,
    minPurchaseAmount: 200,
  },
  // ... otros cupones ...
];

const newCoupons = generateFirstOrderCoupons(100);
const allCoupons = [...initialCoupons, ...newCoupons];

const columns = [
  {
    uid: "code",
    name: "Code",
    sortable: true,
  },
  {
    uid: "discount",
    name: "Discount",
    sortable: true,
  },
  {
    uid: "status",
    name: "Status",
    sortable: true,
  },
  {
    uid: "actions",
    name: "Actions",
    sortable: false,
  },
];

const statusOptions = [
  { uid: "active", name: "Active" },
  { uid: "paused", name: "Paused" },
  { uid: "vacation", name: "Vacation" },
];

export { allCoupons as coupons, statusOptions, columns };
