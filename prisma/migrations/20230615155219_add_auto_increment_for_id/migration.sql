-- AlterTable
CREATE SEQUENCE admin_types_id_seq;
ALTER TABLE "admin_types" ALTER COLUMN "id" SET DEFAULT nextval('admin_types_id_seq');
ALTER SEQUENCE admin_types_id_seq OWNED BY "admin_types"."id";

-- AlterTable
CREATE SEQUENCE admin_users_id_seq;
ALTER TABLE "admin_users" ALTER COLUMN "id" SET DEFAULT nextval('admin_users_id_seq');
ALTER SEQUENCE admin_users_id_seq OWNED BY "admin_users"."id";

-- AlterTable
CREATE SEQUENCE cart_items_id_seq;
ALTER TABLE "cart_items" ALTER COLUMN "id" SET DEFAULT nextval('cart_items_id_seq');
ALTER SEQUENCE cart_items_id_seq OWNED BY "cart_items"."id";

-- AlterTable
CREATE SEQUENCE carts_id_seq;
ALTER TABLE "carts" ALTER COLUMN "id" SET DEFAULT nextval('carts_id_seq');
ALTER SEQUENCE carts_id_seq OWNED BY "carts"."id";

-- AlterTable
CREATE SEQUENCE discounts_id_seq;
ALTER TABLE "discounts" ALTER COLUMN "id" SET DEFAULT nextval('discounts_id_seq');
ALTER SEQUENCE discounts_id_seq OWNED BY "discounts"."id";

-- AlterTable
CREATE SEQUENCE order_items_id_seq;
ALTER TABLE "order_items" ALTER COLUMN "id" SET DEFAULT nextval('order_items_id_seq');
ALTER SEQUENCE order_items_id_seq OWNED BY "order_items"."id";

-- AlterTable
CREATE SEQUENCE orders_id_seq;
ALTER TABLE "orders" ALTER COLUMN "id" SET DEFAULT nextval('orders_id_seq');
ALTER SEQUENCE orders_id_seq OWNED BY "orders"."id";

-- AlterTable
CREATE SEQUENCE payments_id_seq;
ALTER TABLE "payments" ALTER COLUMN "id" SET DEFAULT nextval('payments_id_seq');
ALTER SEQUENCE payments_id_seq OWNED BY "payments"."id";

-- AlterTable
CREATE SEQUENCE product_cartegories_id_seq;
ALTER TABLE "product_cartegories" ALTER COLUMN "id" SET DEFAULT nextval('product_cartegories_id_seq');
ALTER SEQUENCE product_cartegories_id_seq OWNED BY "product_cartegories"."id";

-- AlterTable
CREATE SEQUENCE product_inventories_id_seq;
ALTER TABLE "product_inventories" ALTER COLUMN "id" SET DEFAULT nextval('product_inventories_id_seq');
ALTER SEQUENCE product_inventories_id_seq OWNED BY "product_inventories"."id";

-- AlterTable
CREATE SEQUENCE products_id_seq;
ALTER TABLE "products" ALTER COLUMN "id" SET DEFAULT nextval('products_id_seq');
ALTER SEQUENCE products_id_seq OWNED BY "products"."id";

-- AlterTable
CREATE SEQUENCE user_addresses_id_seq;
ALTER TABLE "user_addresses" ALTER COLUMN "id" SET DEFAULT nextval('user_addresses_id_seq');
ALTER SEQUENCE user_addresses_id_seq OWNED BY "user_addresses"."id";

-- AlterTable
CREATE SEQUENCE user_payments_id_seq;
ALTER TABLE "user_payments" ALTER COLUMN "id" SET DEFAULT nextval('user_payments_id_seq');
ALTER SEQUENCE user_payments_id_seq OWNED BY "user_payments"."id";

-- AlterTable
CREATE SEQUENCE users_id_seq;
ALTER TABLE "users" ALTER COLUMN "id" SET DEFAULT nextval('users_id_seq');
ALTER SEQUENCE users_id_seq OWNED BY "users"."id";
