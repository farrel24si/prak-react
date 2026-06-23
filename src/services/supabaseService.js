import { supabase } from "@/lib/supabaseClient";

const tierDiscounts = {
  Bronze: 0.05,
  Silver: 0.1,
  Gold: 0.15,
  Platinum: 0.2,
};

export function getDiscountPercentage(tier = "Bronze") {
  return tierDiscounts[tier] ?? tierDiscounts.Bronze;
}

function tierFromPoints(points = 0) {
  if (points > 3000) return "Platinum";
  if (points >= 1501) return "Gold";
  if (points >= 501) return "Silver";
  return "Bronze";
}

export const authAPI = {
  async signIn({ email, password }) {
    return await supabase.auth.signInWithPassword({ email, password });
  },

  async signUp({ email, password, full_name }) {
    const res = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name,
        },
      },
    });

    try {
      const userId = res?.data?.user?.id;
      if (userId) {
        const { data: existing } = await supabase.from("profiles").select("user_id").eq("user_id", userId).single();
        if (!existing) {
          await supabase.from("profiles").insert([
            {
              user_id: userId,
              email,
              full_name: full_name || null,
              role: "member",
              loyalty_tier: "Bronze",
              points: 0,
            },
          ]);
        }
      }
    } catch (e) {
      console.warn("Failed to ensure profile after signUp:", e);
    }

    return res;
  },
};

export const profileAPI = {
  async fetchProfile(userId) {
    return await supabase.from("profiles").select("*").eq("user_id", userId).single();
  },

  async fetchAllProfiles() {
    return await supabase.from("profiles").select("*").order("created_at", { ascending: false });
  },

  async updateProfile(userId, updates) {
    return await supabase.from("profiles").update({ full_name: updates.full_name }).eq("user_id", userId);
  },
};

export const productAPI = {
  async fetchProducts() {
    return await supabase.from("products").select("*").order("created_at", { ascending: false });
  },

  async fetchProductById(id) {
    return await supabase.from("products").select("*").eq("id", id).single();
  },

  async createProduct(product) {
    return await supabase.from("products").insert([product]);
  },

  async updateProduct(id, updates) {
    return await supabase.from("products").update(updates).eq("id", id);
  },

  async deleteProduct(id) {
    return await supabase.from("products").delete().eq("id", id);
  },
};

export const orderAPI = {
  async fetchOrders() {
    return await supabase.from("orders").select("*").order("created_at", { ascending: false });
  },

  async fetchOrdersByUser(userId) {
    return await supabase.from("orders").select("*").eq("user_id", userId).order("created_at", { ascending: false });
  },

  async fetchDashboardStats() {
    const { data: allOrders, error } = await supabase.from("orders").select("status, final_amount, created_at");
    if (error) return { error };

    const totalOrders = allOrders.length;
    const totalDelivered = allOrders.filter((o) => o.status === "Completed").length;
    const totalCanceled = allOrders.filter((o) => o.status === "Cancelled").length;
    const totalRevenue = allOrders
      .filter((o) => o.status === "Completed")
      .reduce((sum, o) => sum + Number(o.final_amount || 0), 0);

    return {
      data: { totalOrders, totalDelivered, totalCanceled, totalRevenue },
      error: null,
    };
  },

  async fetchDashboardStatsByUser(userId) {
    const { data: userOrders, error } = await supabase
      .from("orders")
      .select("status, final_amount, created_at")
      .eq("user_id", userId);
    if (error) return { error };

    const totalOrders = userOrders.length;
    const totalDelivered = userOrders.filter((o) => o.status === "Completed").length;
    const totalCanceled = userOrders.filter((o) => o.status === "Cancelled").length;
    const totalSpent = userOrders
      .filter((o) => o.status === "Completed")
      .reduce((sum, o) => sum + Number(o.final_amount || 0), 0);

    return {
      data: { totalOrders, totalDelivered, totalCanceled, totalSpent },
      error: null,
    };
  },

  async fetchRecentOrdersByUser(userId, limit = 5) {
    return await supabase
      .from("orders")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(limit);
  },

  async fetchRecentOrders(limit = 5) {
    return await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(limit);
  },

  async createOrderWithItem(order, item) {
    const { data: orderData, error: orderError } = await supabase
      .from("orders")
      .insert([order])
      .select("id")
      .single();

    if (orderError) {
      return { error: orderError };
    }

    const orderId = orderData.id;
    const { data: itemData, error: itemError } = await supabase.from("order_items").insert([
      {
        order_id: orderId,
        product_id: item.product_id,
        quantity: item.quantity,
        unit_price: item.unit_price,
      },
    ]);

    return { data: { order: orderData, item: itemData }, error: itemError };
  },

  // Admin: proses pesanan — ubah status dan beri poin jika Completed
  async processOrder(orderId, newStatus) {
    // Ambil data order dulu
    const { data: orderData, error: fetchError } = await supabase
      .from("orders")
      .select("*")
      .eq("id", orderId)
      .single();

    if (fetchError) return { error: fetchError };

    // Update status
    const { error: updateError } = await supabase
      .from("orders")
      .update({ status: newStatus })
      .eq("id", orderId);

    if (updateError) return { error: updateError };

    // Jika status diubah ke Completed, beri poin ke member via RPC (bypass RLS)
    if (newStatus === "Completed") {
      try {
        const userId = orderData.user_id;
        const finalAmount = Number(orderData.final_amount || 0);
        const pointsEarned = Math.floor(finalAmount / 10000);

        if (userId && pointsEarned > 0) {
          // Panggil RPC function security definer agar bisa update profile member
          const { error: rpcError } = await supabase.rpc("award_points", {
            p_user_id: userId,
            p_points_earned: pointsEarned,
          });

          if (rpcError) {
            console.warn("RPC award_points error:", rpcError);
          }
        }
      } catch (e) {
        console.warn("Failed to update profile points/tier:", e);
      }
    }

    return { data: orderData, error: null };
  },
};