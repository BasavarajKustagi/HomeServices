"use client";

import {
  createContext, useContext, useReducer, useEffect,
  ReactNode, useCallback,
} from "react";
import { Language } from "@/data/content";

// ── Types ────────────────────────────────────────────────────────────────────

export interface User {
  phone: string;
  name: string;
  city: string;
  address: string;
  referralCode: string;
  credits: number;
  joinedAt: string;
}

export type BookingStatus =
  | "pending"
  | "confirmed"
  | "en_route"
  | "arrived"
  | "in_progress"
  | "completed"
  | "cancelled";

export type PaymentMethod = "upi" | "cash" | "pending";

export interface Booking {
  id: string;
  serviceIds: string[];
  serviceNames: string[];
  address: string;
  city: string;
  phone: string;
  slot: string;
  proId: string;
  proName: string;
  status: BookingStatus;
  totalAmount: number;
  paymentMethod: PaymentMethod;
  paymentStatus: "pending" | "paid";
  isEmergency: boolean;
  issueType?: string;
  photoDescription?: string;
  createdAt: string;
  completedAt?: string;
  etaMinutes?: number;
  rating?: number;
  reviewText?: string;
  warrantyId?: string;
}

export interface WarrantyRecord {
  id: string;
  bookingId: string;
  service: string;
  proName: string;
  amount: number;
  date: string;
  expiresAt: string;
  status: "active" | "expired" | "claimed";
  claimId?: string;
  claimDate?: string;
}

export interface SupportTicket {
  id: string;
  bookingId?: string;
  category: string;
  description: string;
  status: "open" | "in_progress" | "resolved";
  createdAt: string;
}

export interface CartItem {
  serviceId: string;
  serviceName: string;
  price: number;
}

export interface AppNotification {
  id: string;
  type: "booking" | "warranty" | "promo" | "support";
  title: string;
  body: string;
  read: boolean;
  createdAt: string;
  link?: string;
}

// ── State ────────────────────────────────────────────────────────────────────

interface AppState {
  lang: Language;
  user: User | null;
  bookings: Booking[];
  warranties: WarrantyRecord[];
  tickets: SupportTicket[];
  cart: CartItem[];
  notifications: AppNotification[];
}

const INITIAL_STATE: AppState = {
  lang: "en",
  user: null,
  bookings: [],
  warranties: [],
  tickets: [],
  cart: [],
  notifications: [],
};

// ── Actions ──────────────────────────────────────────────────────────────────

type Action =
  | { type: "SET_LANG"; payload: Language }
  | { type: "LOGIN"; payload: User }
  | { type: "LOGOUT" }
  | { type: "UPDATE_USER"; payload: Partial<User> }
  | { type: "ADD_BOOKING"; payload: Booking }
  | { type: "UPDATE_BOOKING"; payload: { id: string; updates: Partial<Booking> } }
  | { type: "ADD_WARRANTY"; payload: WarrantyRecord }
  | { type: "UPDATE_WARRANTY"; payload: { id: string; updates: Partial<WarrantyRecord> } }
  | { type: "ADD_TICKET"; payload: SupportTicket }
  | { type: "SET_CART"; payload: CartItem[] }
  | { type: "ADD_TO_CART"; payload: CartItem }
  | { type: "REMOVE_FROM_CART"; payload: number }
  | { type: "CLEAR_CART" }
  | { type: "ADD_NOTIFICATION"; payload: AppNotification }
  | { type: "MARK_NOTIFICATION_READ"; payload: string }
  | { type: "LOAD_STATE"; payload: Partial<AppState> };

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "LOAD_STATE":
      return { ...state, ...action.payload };
    case "SET_LANG":
      return { ...state, lang: action.payload };
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null, cart: [], notifications: [] };
    case "UPDATE_USER":
      return state.user
        ? { ...state, user: { ...state.user, ...action.payload } }
        : state;
    case "ADD_BOOKING":
      return { ...state, bookings: [action.payload, ...state.bookings] };
    case "UPDATE_BOOKING":
      return {
        ...state,
        bookings: state.bookings.map((b) =>
          b.id === action.payload.id ? { ...b, ...action.payload.updates } : b
        ),
      };
    case "ADD_WARRANTY":
      return { ...state, warranties: [action.payload, ...state.warranties] };
    case "UPDATE_WARRANTY":
      return {
        ...state,
        warranties: state.warranties.map((w) =>
          w.id === action.payload.id ? { ...w, ...action.payload.updates } : w
        ),
      };
    case "ADD_TICKET":
      return { ...state, tickets: [action.payload, ...state.tickets] };
    case "SET_CART":
      return { ...state, cart: action.payload };
    case "ADD_TO_CART":
      return { ...state, cart: [...state.cart, action.payload] };
    case "REMOVE_FROM_CART":
      return { ...state, cart: state.cart.filter((_, i) => i !== action.payload) };
    case "CLEAR_CART":
      return { ...state, cart: [] };
    case "ADD_NOTIFICATION":
      return { ...state, notifications: [action.payload, ...state.notifications] };
    case "MARK_NOTIFICATION_READ":
      return {
        ...state,
        notifications: state.notifications.map((n) =>
          n.id === action.payload ? { ...n, read: true } : n
        ),
      };
    default:
      return state;
  }
}

// ── Context ──────────────────────────────────────────────────────────────────

interface AppContextValue {
  state: AppState;
  dispatch: React.Dispatch<Action>;
  // Convenience helpers
  setLang: (l: Language) => void;
  login: (user: User) => void;
  logout: () => void;
  addBooking: (b: Booking) => void;
  updateBooking: (id: string, updates: Partial<Booking>) => void;
  addWarranty: (w: WarrantyRecord) => void;
  claimWarranty: (id: string) => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (index: number) => void;
  clearCart: () => void;
  addTicket: (t: SupportTicket) => void;
  notify: (n: Omit<AppNotification, "id" | "read" | "createdAt">) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

const STORAGE_KEY = "bijliwala_v2";

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  // Load persisted state on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as Partial<AppState>;
        dispatch({ type: "LOAD_STATE", payload: saved });
      }
    } catch {
      // corrupt storage — ignore
    }
  }, []);

  // Persist state on every change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // storage full — ignore
    }
  }, [state]);

  const setLang = useCallback((l: Language) => dispatch({ type: "SET_LANG", payload: l }), []);
  const login = useCallback((u: User) => dispatch({ type: "LOGIN", payload: u }), []);
  const logout = useCallback(() => dispatch({ type: "LOGOUT" }), []);

  const addBooking = useCallback((b: Booking) => {
    dispatch({ type: "ADD_BOOKING", payload: b });
    dispatch({
      type: "ADD_NOTIFICATION",
      payload: {
        id: `notif-${Date.now()}`,
        type: "booking",
        title: "Booking Confirmed!",
        body: `${b.proName} will arrive at ${b.slot}`,
        read: false,
        createdAt: new Date().toISOString(),
        link: "/profile",
      },
    });
  }, []);

  const updateBooking = useCallback(
    (id: string, updates: Partial<Booking>) =>
      dispatch({ type: "UPDATE_BOOKING", payload: { id, updates } }),
    []
  );

  const addWarranty = useCallback((w: WarrantyRecord) => {
    dispatch({ type: "ADD_WARRANTY", payload: w });
    dispatch({
      type: "ADD_NOTIFICATION",
      payload: {
        id: `notif-w-${Date.now()}`,
        type: "warranty",
        title: "Warranty Activated",
        body: `90-day warranty on ${w.service} is now active`,
        read: false,
        createdAt: new Date().toISOString(),
        link: "/warranty",
      },
    });
  }, []);

  const claimWarranty = useCallback((id: string) => {
    const claimId = `CLM-${Date.now().toString(36).toUpperCase()}`;
    dispatch({
      type: "UPDATE_WARRANTY",
      payload: { id, updates: { status: "claimed", claimId, claimDate: new Date().toISOString() } },
    });
    dispatch({
      type: "ADD_NOTIFICATION",
      payload: {
        id: `notif-claim-${Date.now()}`,
        type: "support",
        title: "Warranty Claim Filed",
        body: `Claim ${claimId} received. Free revisit will be scheduled within 24 hours.`,
        read: false,
        createdAt: new Date().toISOString(),
        link: "/warranty",
      },
    });
  }, []);

  const addToCart = useCallback(
    (item: CartItem) => dispatch({ type: "ADD_TO_CART", payload: item }),
    []
  );
  const removeFromCart = useCallback(
    (index: number) => dispatch({ type: "REMOVE_FROM_CART", payload: index }),
    []
  );
  const clearCart = useCallback(() => dispatch({ type: "CLEAR_CART" }), []);

  const addTicket = useCallback((t: SupportTicket) => {
    dispatch({ type: "ADD_TICKET", payload: t });
    dispatch({
      type: "ADD_NOTIFICATION",
      payload: {
        id: `notif-t-${Date.now()}`,
        type: "support",
        title: "Support Ticket Created",
        body: `Ticket ${t.id} opened. We'll respond within 2 hours.`,
        read: false,
        createdAt: new Date().toISOString(),
        link: "/support",
      },
    });
  }, []);

  const notify = useCallback(
    (n: Omit<AppNotification, "id" | "read" | "createdAt">) =>
      dispatch({
        type: "ADD_NOTIFICATION",
        payload: { ...n, id: `notif-${Date.now()}`, read: false, createdAt: new Date().toISOString() },
      }),
    []
  );

  return (
    <AppContext.Provider
      value={{
        state, dispatch, setLang, login, logout,
        addBooking, updateBooking, addWarranty, claimWarranty,
        addToCart, removeFromCart, clearCart, addTicket, notify,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
