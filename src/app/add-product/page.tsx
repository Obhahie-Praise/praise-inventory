import type { Metadata } from "next";
import SideBarWrapper from "@/components/SideBarWrapper";
import { createProduct } from "@/lib/action/auth-actions";
import { auth } from "@/lib/auth";
import { getSession } from "better-auth/api";
import { Asterisk } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "Add Product | Inventory Management",
  description: "Add new products to your inventory and keep track of your stock.",
};

const AddProductPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;
  return (
    <div className="min-h-screen bg-zinc-200 flex">
      <SideBarWrapper currentPath="/add-product" />
      <main className="flex-1 lg:ml-60 p-4 sm:p-6 lg:p-8">
        <header className="mb-6 sm:mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl sm:text-2xl font-semibold text-zinc-900">
                Add Product
              </h1>
              <p className="text-xs sm:text-sm text-zinc-500">
                Add new product to your inventory.
              </p>
            </div>
          </div>
        </header>
        <div className="max-w-2xl mx-auto lg:mx-0">
          <div className="bg-white rounded-lg border border-zinc-300 p-4 sm:p-6">
            <form action={createProduct} className="space-y-4 sm:space-y-6">
              <div className="">
                <div className="block">
                  <label htmlFor="name" className="text-xs sm:text-sm font-medium">
                    Product Name{" "}
                    <Asterisk
                      className="text-red-500 inline"
                      width={15}
                      height={15}
                    />
                  </label>
                </div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-3 py-2 text-sm border border-zinc-300 rounded-lg focus:border-transparent"
                  placeholder="Enter Product Name"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6">
                <div className="">
                  <div className="block">
                    <label htmlFor="quantity" className="text-xs sm:text-sm font-medium">
                      Quantity {" "}
                      <Asterisk
                        className="text-red-500 inline"
                        width={15}
                        height={15}
                      />
                    </label>
                  </div>
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    required
                    className="w-full px-3 py-2 text-sm border border-zinc-300 rounded-lg focus:border-transparent"
                    placeholder="0.0"
                  />
                </div>
                <div className="">
                  <div className="block">
                    <label htmlFor="price" className="text-xs sm:text-sm font-medium">
                      Price{" "}
                      <Asterisk
                        className="text-red-500 inline"
                        width={15}
                        height={15}
                      />
                    </label>
                  </div>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    step="0.01"
                    min="0"
                    required
                    className="w-full px-3 py-2 text-sm border border-zinc-300 rounded-lg focus:border-transparent"
                    placeholder="0.0"
                  />
                </div>
              </div>
              <div className="">
                  <div className="block">
                    <label htmlFor="sku" className="text-xs sm:text-sm font-medium">
                      SKU {" "}
                      <span className="text-zinc-300">(optional)</span>
                    </label>
                  </div>
                  <input
                    type="text"
                    id="sku"
                    name="sku"
                    step="1"
                    min="0"
                    
                    className="w-full px-3 py-2 text-sm border border-zinc-300 rounded-lg focus:border-transparent"
                    placeholder="Enter SKU"
                  />
                </div>
              <div className="">
                  <div className="block">
                    <label htmlFor="sku" className="text-xs sm:text-sm font-medium">
                      Low Stock At {" "}
                      <span className="text-zinc-300">(optional)</span>
                    </label>
                  </div>
                  <input
                    type="number"
                    id="lowStockAt"
                    name="lowStockAt"
                    step="1"
                    min="0"
                    
                    className="w-full px-3 py-2 text-sm border border-zinc-300 rounded-lg focus:border-transparent"
                    placeholder="Enter low stock treshold"
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-5">
                    <button className="px-4 sm:px-6 py-2 sm:py-3 bg-black text-white rounded-lg hover:bg-zinc-800 transition-colors font-medium text-sm sm:text-base" type="submit">
                        Add Product
                    </button>
                    <Link className="px-4 sm:px-6 py-2 sm:py-3 bg-zinc-500 text-white rounded-lg hover:bg-zinc-400 transition-colors font-medium text-sm sm:text-base text-center" href="">Cancel</Link>
                </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AddProductPage;
