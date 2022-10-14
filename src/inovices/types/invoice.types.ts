export type ItemsType = {
  name: string;
  hsn: number;
  qty: number;
  material: number;
  price: number;
};

export type InvoiceParamsType = {
  id: number;
};

export type createInvoiceType = {
  challanNo: string;
  transportaion: number;
  items: Array<ItemsType>;
};

export type findAllReturnType = {
  id: number;
  created_at: string;
  client: {
    name: string;
  };
};

export type findInvoiceByIdReturnType = {
  id: number;
  challanNo: number;
  transportaion: number;
  clientId: number;
  created_at: string;
  items: Array<ItemsType>;
};
