import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const DUMMY_PRODUCTS = [
  {
    id: "p1",
    price: 6,
    article: "My First Book",
    description: "First book",
  },
  {
    id: "p2",
    price: 8,
    article: "My First Book",
    description: "First book",
  },
  {
    id: "p3",
    price: 10,
    article: "My First Book",
    description: "First book",
  },
  {
    id: "p4",
    price: 12,
    article: "My First Book",
    description: "First book",
  },
];

const Products = (props) => {
  const productsList = DUMMY_PRODUCTS.map((product) => {
    return (
      <ProductItem
        key={product.id}
        title={product.article}
        id={product.id}
        price={product.price}
        description={product.description}
      />
    );
  });
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>{productsList}</ul>
    </section>
  );
};

export default Products;
