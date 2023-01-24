import Image from "next/image";
import Layout from "./layout";
import { formatPrice, storefront } from "../lib/utils";
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import Loading from "../components/loading";
import Modal from "../components/modal";
const gql = String.raw;

export default function Handle({ product }: any) {
  let [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const item = product.data.productByHandle;
  const variantId = item.variants.edges[0].node.id;

  async function checkout() {
    setLoading(true);
    const checkout = await storefront(checkoutMutation, { variantId });
    const webUrl = checkout.data.checkoutCreate.checkout.webUrl;
    window.location.href = webUrl;
  }

  return (
    <Layout header="‹ Back" title={item.title}>
      <div className="gap-20 md:flex">
        <button
          onClick={() => setDialogOpen(true)}
          className="ring-orange-200 hover:ring-8"
        >
          <Image
            src={item.images.edges[0].node.url}
            alt="deco"
            width="350"
            height="500"
          />
        </button>
        <div>
          <h1 className="mb-20 text-4xl font-bold">{item.title}</h1>
          <div
            className="prose"
            dangerouslySetInnerHTML={{ __html: item.descriptionHtml }}
          />
          <div className="mt-5 text-xl font-bold">
            {formatPrice(item.priceRange.minVariantPrice.amount)}
          </div>
          <div className="my-10">
            <button
              onClick={() => checkout()}
              className="px-5 py-3 font-bold tracking-wide uppercase rounded-lg bg-lime-300 active:bg-lime-400"
            >
              <span className="flex items-center">
                {loading && <Loading />}
                Buy
              </span>
            </button>
          </div>
        </div>
      </div>

      <Modal isOpen={dialogOpen} setIsOpen={setDialogOpen}>
        <Image
          src={item.images.edges[0].node.url}
          alt="deco"
          width="560"
          height="800"
        />
      </Modal>
    </Layout>
  );
}

export async function getStaticPaths() {
  const response = await storefront(gql`
    {
      products(first: 20) {
        edges {
          node {
            handle
          }
        }
      }
    }
  `);

  return {
    paths: response.data.products.edges.map((product: any) => ({
      params: { handle: product.node.handle },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }: any) {
  const response = await storefront(singleProductQuery, {
    handle: params.handle,
  });

  return {
    props: {
      product: response,
    },
  };
}

const singleProductQuery = gql`
  query SingleProduct($handle: String!) {
    productByHandle(handle: $handle) {
      title
      descriptionHtml
      tags
      handle
      priceRange {
        minVariantPrice {
          amount
        }
      }
      images(first: 1) {
        edges {
          node {
            url
          }
        }
      }
      variants(first: 1) {
        edges {
          node {
            id
          }
        }
      }
    }
  }
`;

const checkoutMutation = gql`
  mutation CreateCheckout($variantId: ID!) {
    checkoutCreate(
      input: { lineItems: { variantId: $variantId, quantity: 1 } }
    ) {
      checkout {
        webUrl
      }
    }
  }
`;
