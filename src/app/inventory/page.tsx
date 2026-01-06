import type { Metadata } from "next";
import Pagination from "@/components/Pagination";
import MobileSideBar from "@/components/MobileSideBar";
import { deleteProduct } from "@/lib/action/auth-actions";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { Trash2 } from "lucide-react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import Loader from "../dashboard/loading";

export const metadata: Metadata = {
  title: "Inventory | Inventory Management",
  description: "Manage your products and track inventory levels with detailed product listings and stock information.",
};

const InventoryPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string }>;
}) => {
  const user = await auth.api.getSession({ headers: await headers() });
  if (!user) {
    redirect("/sign-in");
  }
  const userId = user?.user.id;
  const params = await searchParams;
  const q = (params.q || "").trim();
  const totalCount = await prisma.product.count({
    where: { userId, name: { contains: q, mode: "insensitive" } },
  });
  const items = await prisma.product.findMany({
    where: { userId, name: { contains: q, mode: "insensitive" } },
    orderBy: { createdAt: "desc" },
  });
  const pageSize = 10;

  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  const page = Math.max(1, Number(params.page ?? 1));
  const paginatedProducts = items.slice((page - 1) * pageSize, page * pageSize);
  return (
    <div className="min-h-screen bg-zinc-100 flex">
      <MobileSideBar currentPath="/inventory" />
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <header className="mb-6 sm:mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl sm:text-2xl font-semibold text-zinc-900">
                Inventory
              </h1>
              <p className="text-xs sm:text-sm text-zinc-500">
                Manage your products and track inventory levels.
              </p>
            </div>
          </div>
        </header>

        <Suspense fallback={<Loader />}>
          <div className="space-y-4 sm:space-y-6">
            {/* Search */}
            <div className="bg-white rounded-lg border border-zinc-300 p-4 sm:p-6">
              <form action="/inventory" method="GET" className="flex flex-col sm:flex-row gap-2">
                <input
                  name="q"
                  placeholder="Search Products"
                  type="text"
                  className="flex-1 px-3 sm:px-4 py-2 text-sm border border-zinc-400 rounded-lg focus:border-transparent"
                />
                <button className="px-4 sm:px-6 py-2 bg-zinc-600 text-white rounded-lg hover:bg-zinc-800 font-medium transition-colors cursor-pointer text-sm sm:text-base whitespace-nowrap">
                  Search
                </button>
              </form>
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-lg border border-zinc-300 overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-zinc-100">
                  <tr className="">
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-zinc-600 uppercase">
                      Name
                    </th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-zinc-600 uppercase">
                      SKU
                    </th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-zinc-600 uppercase">
                      Price
                    </th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-zinc-600 uppercase">
                      Quantity
                    </th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-zinc-600 uppercase hidden sm:table-cell">
                      Low Stock At
                    </th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-zinc-600 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>

                {totalCount === 0 ? (
                  <tbody className="bg-zinc-100 divide-y divide-zinc-300">
                    <tr>
                      <td
                        colSpan={6}
                        className="px-3 sm:px-6 py-4 text-center text-xs text-zinc-600 font-medium"
                      >
                        No Product in Inventory
                      </td>
                    </tr>
                  </tbody>
                ) : (
                  <tbody className="bg-white divide-y divide-zinc-300">
                    {paginatedProducts.map((product, key) => {
                      return (
                        <tr className="hover:bg-zinc-100 text-xs sm:text-sm" key={key}>
                          <td className="px-3 sm:px-6 py-4 text-zinc-600 max-w-xs truncate">
                            {product.name}
                          </td>
                          <td className="px-3 sm:px-6 py-4 text-zinc-600 ">
                            {product.sku || "-"}
                          </td>
                          <td className="px-3 sm:px-6 py-4 text-zinc-600 ">
                            ${Number(product.price).toFixed(2)}
                          </td>
                          <td className="px-3 sm:px-6 py-4 text-zinc-600 ">
                            {product.quantity}
                          </td>
                          <td className="px-3 sm:px-6 py-4 text-zinc-600 hidden sm:table-cell">
                            {product.lowStockAt || "-"}
                          </td>
                          <td className="px-3 sm:px-6 py-4 text-zinc-600 ">
                            <form
                              action={async (formData: FormData) => {
                                "use server";
                                await deleteProduct(formData);
                              }}
                              className=""
                            >
                              <input
                                type="hidden"
                                name="id"
                                value={product.id}
                                className=""
                              />
                              <button className="text-red-600 hover:text-red-800 p-1">
                                <Trash2 width={18} height={18} />
                              </button>
                            </form>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                )}
              </table>
            </div>
            {totalPages > 1 && (
              <div className="bg-white rounded-lg border border-zinc-300 p-4 sm:p-6">
                <Pagination
                  currentPage={page}
                  totalPage={totalPages}
                  baseUrl="/inventory"
                  searchParams={{
                    q,
                    pageSize: String(pageSize),
                  }}
                />
              </div>
            )}
          </div>
        </Suspense>
      </main>
    </div>
  );
};

export default InventoryPage;
