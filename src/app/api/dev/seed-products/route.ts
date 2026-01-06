import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const revalidate = 0;

export async function POST() {
  const demoUserId = "OadkXpMIVEBltkT0SqJN5HYaUWcbyTFX";

  await prisma.product.createMany({
    data: Array.from({ length: 25 }).map((_, i) => ({
      userId: demoUserId,
      name: `Product ${i + 1}`,
      price: Number((Math.random() * 90 + 10).toFixed(2)),
      quantity: Math.floor(Math.random() * 20),
      lowStockAt: 5,
    })),
  });

  return NextResponse.json({ success: true });
}
