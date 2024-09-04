// -- Union without a discriminant property --
{
  type Product = {
    name: string;
    price: number;
    stock: number;
  };

  type Service = {
    name: string;
    price: number;
  };

  const product: Product = {
    name: "Book",
    price: 9.99,
    stock: 100,
  };

  const service: Service = {
    name: "Consulting",
    price: 99.99,
  };

  type CatalogItem = Product | Service;

  const catalog: CatalogItem[] = [product, service];

  for (let item of catalog) {
    if ("stock" in item) {
      console.log(
        `Product: ${item.name} - $${item.price} - ${item.stock} in stock`
      );
    } else {
      console.log(`Service: ${item.name} - $${item.price}`);
    }
  }
}

// -- Union with a discriminant property (`type`) --
{
  type Product = {
    type: "product";
    // ^^ Discriminant property
    name: string;
    price: number;
    stock: number;
  };

  type Service = {
    type: "service";
    //    ^^ String literal type
    name: string;
    price: number;
  };

  const product: Product = {
    type: "product",
    name: "Book",
    price: 9.99,
    stock: 100,
  };

  const service: Service = {
    type: "service",
    name: "Consulting",
    price: 99.99,
  };

  type CatalogItem = Product | Service;

  const catalog: CatalogItem[] = [product, service];

  for (let item of catalog) {
    if (item.type === "product") {
      console.log(
        `Product: ${item.name} - $${item.price} - ${item.stock} in stock`
      );
    } else {
      console.log(`Service: ${item.name} - $${item.price}`);
    }
  }
}
