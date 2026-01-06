"use server";

import { headers } from "next/headers";
import { auth } from "../auth";
import prisma from "../prisma";
import { revalidatePath } from "next/cache";
import z from "zod";
import { redirect } from "next/navigation";

const ProductSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.coerce.number().nonnegative("Price must be non-negative"),
  quantity: z.coerce.number().int().min(0, "Quantity must be non-negative"),
  sku: z.string().optional(),
  lowStockAt: z.coerce.number().int().min(0).optional(),
});

export const deleteProduct = async (formData: FormData) => {
  const session = await auth.api.getSession({ headers: await headers() });
  const id = String(formData.get("id") || "");

  await prisma.product.deleteMany({
    where: { id, userId: session?.user.id },
  });

  revalidatePath("/inventory");
};

export const createProduct = async (formData: FormData) => {
  const session = await auth.api.getSession({ headers: await headers() });
  const user = session?.user;

  const parsed = ProductSchema.safeParse({
    name: formData.get("name"),
    price: formData.get("price"),
    quantity: formData.get("quantity"),
    sku: formData.get("sku") || undefined,
    lowStockAt: formData.get("lowStockAt") || undefined,
  });

  if (!parsed.success) {
    throw new Error("Validation failed");
  }

    await prisma.product.create({
      data: {
        ...parsed.data,
        userId: String(user?.id),
      },
    });

  redirect("/inventory");
};
