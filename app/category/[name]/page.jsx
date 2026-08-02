import prisma from "@/lib/prisma";
import React from "react";

export default async function CategoryProducts({ params }) {
  const { name } = await params;
  const x = await prisma.product.findMany({
    take: 4,
  });
  console.log(x);
  return <div>{name}</div>;
}
