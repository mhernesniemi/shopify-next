import Image from "next/image";
import { useState } from "react";
import Select from "../components/select";
import { formatPrice, storefront } from "../lib/utils";
import Layout from "./layout";
import Link from "next/link";

export default function Home({ data }: any) {
  const [selectValue, setSelectValue] = useState("all");
  const products = data.data?.products.edges;

  const artists = Array.from(
    new Set(
      products.map((item: any) => item.node.collections.edges[1].node.title)
    )
  );

  const artistsSelect = [{ name: "All", value: "all" }];
  artists.map((item: any) => artistsSelect.push({ name: item, value: item }));

  return (
    <Layout>
      <div className="mb-20 text-xl">
        <Select
          label="Artist"
          value={selectValue}
          onChange={(event: any) => setSelectValue(event.target.value)}
          options={artistsSelect}
        />
      </div>

      <ul className="grid mb-20 gap-x-20 gap-y-20 md:grid-cols-2 lg:grid-cols-3">
        {products
          ?.filter(
            (item: any) =>
              selectValue === "all" ||
              item.node.collections.edges[1].node.title === selectValue
          )
          .map((item: any, index: number) => (
            <li key={index}>
              <Link href={item.node.handle}>
                <Image
                  src={item.node.images?.edges[0].node.url}
                  alt="deco"
                  width="350"
                  height="500"
                  className="mb-5 lg:w-full ring-orange-200 hover:ring-8"
                />
              </Link>
              <div className="mb-3">
                {item.node.collections.edges[1].node.title}
              </div>
              <div className="mb-3">
                <Link
                  href={item.node.handle}
                  className="hover:underline underline-offset-4"
                >
                  <h2 className="inline text-xl font-bold">
                    {item.node.title}
                  </h2>
                </Link>
              </div>
              <div className="text-xl">
                {formatPrice(item.node.priceRange.minVariantPrice.amount)}
              </div>
            </li>
          ))}
      </ul>
    </Layout>
  );
}

export async function getStaticProps() {
  const data = await storefront(productsQuery);

  return {
    props: { data },
  };
}

const gql = String.raw;

const productsQuery = gql`
  {
    products(first: 50) {
      edges {
        node {
          id
          title
          tags
          handle
          collections(first: 2) {
            edges {
              node {
                id
                title
              }
            }
          }
          priceRange {
            minVariantPrice {
              amount
            }
          }
          images(first: 1) {
            edges {
              node {
                id
                url
              }
            }
          }
        }
      }
    }
  }
`;
