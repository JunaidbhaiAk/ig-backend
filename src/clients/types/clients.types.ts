export type clientParamsType = {
  id: number;
};

export type createClientType = {
  name: string;
  address: string;
  mob: string;
  email: string;
  discount: number;
  GSTNo: string;
};

export type updateClientType = {
  name?: string;
  address?: string;
  mob?: string;
  email?: string;
  discount?: number;
};
