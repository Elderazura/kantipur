"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import PieceCard, { type PieceCardProduct } from "./PieceCard";
import { Stagger, StaggerItem } from "./motion/Reveal";

const EASE = [0.22, 0.61, 0.36, 1] as const;

type CollectionGridProps = {
  products: PieceCardProduct[];
  filterKey: string;
  featuredLead?: boolean;
};

export default function CollectionGrid({
  products,
  filterKey,
  featuredLead = false,
}: CollectionGridProps) {
  const reduce = useReducedMotion();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={filterKey}
        initial={reduce ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reduce ? undefined : { opacity: 0, y: -8 }}
        transition={{ duration: 0.4, ease: EASE }}
      >
        <Stagger
          as="ul"
          className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-14 lg:grid-cols-3"
          gap={0.06}
        >
          {products.map((product, index) => {
            const featured = featuredLead && index === 0;
            return (
              <StaggerItem
                as="li"
                key={product.slug}
                className={featured ? "lg:col-span-2" : undefined}
              >
                <PieceCard product={product} featured={featured} />
              </StaggerItem>
            );
          })}
        </Stagger>
      </motion.div>
    </AnimatePresence>
  );
}
