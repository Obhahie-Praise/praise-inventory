import type { Metadata } from "next";
import ProductsCharts from "@/components/ProductsCharts";
import MobileSideBar from "@/components/MobileSideBar";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { TrendingUp } from "lucide-react";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export const metadata: Metadata = {
  title: "Dashboard | Inventory Management",
  description: "View your inventory dashboard with real-time analytics, stock status, and product insights.",
};

const DashboardPage = async () => {
  const user = await auth.api.getSession({
    headers: await headers(),
  });
  if (!user) {
    redirect("/sign-in");
  }
  const userId = user?.user.id;
  const totalProducts = await prisma.product.count({
    where: { userId },
  });
  const lowStock = await prisma.product.count({
    where: { userId, lowStockAt: { not: null }, quantity: { lte: 5 } },
  });
  const recent = await prisma.product.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: 5,
  });
  const allProducts = await prisma.product.findMany({
    where: { userId },
    select: { price: true, quantity: true, createdAt: true },
  });
  const totalValue = allProducts.reduce(
    (sum, product) => sum + Number(product.price) * Number(product.quantity),
    0
  );

  const inStockCount = allProducts.filter((p) => Number(p.quantity) > 5).length;
  const lowStockCount = allProducts.filter(
    (p) => Number(p.quantity) <= 5 && Number(p.quantity) >= 1
  ).length;
  const outOfStockCount = allProducts.filter(
    (p) => Number(p.quantity) === 0
  ).length;

  const inStockPercentage =
    totalProducts > 0 ? Math.round((inStockCount / totalProducts) * 100) : 0;
  const lowStockPercentage =
    totalProducts > 0 ? Math.round((lowStockCount / totalProducts) * 100) : 0;
  const outOfStockPercentage =
    totalProducts > 0 ? Math.round((outOfStockCount / totalProducts) * 100) : 0;

  const now = new Date();
  const weeklyProductData = [];
  for (let i = 11; i >= 0; i--) {
    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - i * 7);
    weekStart.setHours(0, 0, 0, 0);

    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);
    weekEnd.setHours(23, 59, 59, 999);

    const weekLabel = `${String(weekStart.getMonth() + 1).padStart(
      2,
      "0"
    )}/${String(weekStart.getDate() + 1).padStart(2, "0")}`;
    const weekProduct = allProducts.filter((product) => {
      const productDate = new Date(product.createdAt);
      return productDate >= weekStart && productDate <= weekEnd;
    });

    weeklyProductData.push({
      week: weekLabel,
      products: weekProduct.length,
    });
  }
  //console.log(totalProducts, recent, allProducts, totalValue);
  return (
    <div className="min-h-screen bg-gray-100 flex">
      <MobileSideBar currentPath="/dashboard" />
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <header className="mb-6 sm:mb-8">
          <div className="flex items-center justify-between">
            <div className="">
              <h1 className="text-xl sm:text-2xl font-semibold text-zinc-900">
                DashBoard
              </h1>
              <p className="text-xs sm:text-sm text-zinc-600">
                Welcome Back! Here is an overview of your inventory
              </p>
            </div>
          </div>
        </header>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8">
          <div className="bg-white rounded-lg border border-zinc-300 p-4 sm:p-6">
            <h2 className="text-base sm:text-lg font-semibold text-zinc-800 mb-4 sm:mb-6">
              Key Metrics
            </h2>
            <div className="grid grid-cols-3 gap-3 sm:gap-6">
              <div className="text-center">
                <div className="text-xl sm:text-3xl font-bold text-zinc-900">
                  {totalProducts}
                </div>
                <div className="text-xs sm:text-sm text-zinc-600">Total Products</div>
                <div className="flex items-center justify-center mt-1">
                  <span className="text-xs text-green-600">
                    +{totalProducts}
                  </span>
                  <TrendingUp
                    width={16}
                    height={16}
                    className="text-green-600 ml-1"
                  />
                </div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-3xl font-bold text-zinc-900">
                  ${totalValue.toFixed(0)}
                </div>
                <div className="text-xs sm:text-sm text-zinc-600">Total Value</div>
                <div className="flex items-center justify-center mt-1">
                  <span className="text-xs text-green-600">
                    +{totalValue.toFixed(0)}
                  </span>
                  <TrendingUp
                    width={16}
                    height={16}
                    className="text-green-600 ml-1"
                  />
                </div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-3xl font-bold text-zinc-900">
                  {lowStock}
                </div>
                <div className="text-xs sm:text-sm text-zinc-600">LowStock</div>
                <div className="flex items-center justify-center mt-1">
                  <span className="text-xs text-green-600">+{lowStock}</span>
                  <TrendingUp
                    width={16}
                    height={16}
                    className="text-green-600 ml-1"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Inventory over time */}
          <div className="bg-white rounded-lg border border-zinc-300 p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="capitalize text-sm sm:text-base">New product per week</h2>
            </div>
            <div className="">
              <ProductsCharts data={weeklyProductData} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8">
          {/* Stock Levels */}
          <div className="bg-white rounded-lg border border-zinc-200 p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-base sm:text-lg font-semibold text-gray-800">
                Stock Levels
              </h2>
            </div>
            <div className="space-y-3">
              {recent.map((product, key) => {
                const stockLevel =
                  product.quantity === 0
                    ? 0
                    : product.quantity <= (product.lowStockAt || 5)
                    ? 1
                    : 2;
                const bgColors = [
                  "bg-red-600",
                  "bg-yellow-600",
                  "bg-green-600",
                ];
                const textColors = [
                  "text-red-600",
                  "text-yellow-600",
                  "text-green-600",
                ];
                return (
                  <div
                    key={key}
                    className="flex items-center justify-between p-3 rounded-lg bg-zinc-50 text-xs sm:text-sm"
                  >
                    <div className="flex items-center space-x-3 flex-1 min-w-0">
                      <div
                        className={`w-3 h-3 rounded-full flex-shrink-0 ${bgColors[stockLevel]}`}
                      />
                      <span className="font-medium text-zinc-800 truncate">
                        {product.name}
                      </span>
                    </div>
                    <div
                      className={`font-medium ${textColors[stockLevel]} ml-2 flex-shrink-0`}
                    >
                      {product.quantity} units
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Efficiency */}
          <div className="bg-white rounded-lg border border-zinc-300 p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-sm sm:text-base">Efficiency</h2>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative w-32 h-32 sm:w-48 sm:h-48">
                <div className="absolute inset-0 rounded-full border-8 border-zinc-300"></div>

                <div
                  className="absolute inset-0 rounded-full border-8 border-zinc-800"
                  style={{
                    clipPath:
                      "polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 50%)",
                  }}
                />

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-lg sm:text-2xl font-bold text-zinc-900">
                      {inStockPercentage}%
                    </div>
                    <div className="text-xs sm:text-sm text-zinc-600">In Stock</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 sm:mt-6 space-y-2">
              <div className="flex items-center justify-between text-xs sm:text-sm text-zinc-600">
                <div className="flex items-center space-x-2 min-w-0">
                  <div className="w-3 h-3 rounded-full bg-zinc-800 flex-shrink-0" />
                  <span className="truncate">In Stock ({inStockPercentage}%)</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs sm:text-sm text-zinc-600">
                <div className="flex items-center space-x-2 min-w-0">
                  <div className="w-3 h-3 rounded-full bg-zinc-600 flex-shrink-0" />
                  <span className="truncate">Low Stock ({lowStockPercentage}%)</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs sm:text-sm text-zinc-600">
                <div className="flex items-center space-x-2 min-w-0">
                  <div className="w-3 h-3 rounded-full bg-zinc-300 flex-shrink-0" />
                  <span className="truncate">Out of Stock ({inStockPercentage}%)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
