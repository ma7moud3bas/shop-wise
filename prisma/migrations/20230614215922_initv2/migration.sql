-- CreateIndex
CREATE INDEX "order_user_index" ON "orders" USING HASH ("user_id");

-- CreateIndex
CREATE INDEX "category_index" ON "product_cartegories" USING HASH ("name");

-- CreateIndex
CREATE INDEX "SKU_index" ON "products" USING HASH ("SKU");

-- CreateIndex
CREATE INDEX "name_index" ON "products"("name");

-- CreateIndex
CREATE INDEX "price_index" ON "products"("price");
