export interface Product {
   id: string | number;
   name: string;
   price: number;
   picture: string;
   description?: string;
   badge?: string;
}

export const FALLBACK: Product[] = [
   { id: 1, name: "Obsidian Reserve Blend", price: 148, picture: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=600&q=80", description: "Single-origin, cold-pressed. A deep, brooding cup.", badge: "New" },
   { id: 2, name: "Amber Harvest Selection", price: 96, picture: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80", description: "Sun-dried Ethiopian micro-lot with notes of fig.", badge: "Hot" },
   { id: 3, name: "Ivory Pour-Over Set", price: 224, picture: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80", description: "Precision-crafted ceramic and steel brewing kit." },
   { id: 4, name: "Golden Hour Espresso", price: 74, picture: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=80", description: "Bright, honey-forward. Best pulled as a ristretto.", badge: "Sale" },
   { id: 5, name: "Midnight Cold Brew", price: 58, picture: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&q=80", description: "18-hour steep. Silky, bold, zero bitterness." },
   { id: 6, name: "Celadon Matcha Grade A", price: 112, picture: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=600&q=80", description: "Ceremonial grade, stone-ground in Uji, Japan." },
];
