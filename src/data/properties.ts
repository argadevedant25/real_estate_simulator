
export interface Property {
  id: string;
  name: string;
  cost: number;
  rent: number;
  time: number;
  level: number;
  image: string;
}

export interface PropertyCategory {
  id: string;
  name: string;
  properties: Property[];
}

export const propertyCategories: PropertyCategory[] = [
  {
    id: "starter",
    name: "Starter Properties",
    properties: [
      {
        id: "studio",
        name: "Studio Apartment",
        cost: 5.00,
        rent: 2,
        time: 3,
        level: 0,
        image: "/lovable-uploads/95b9d9d5-ab40-4478-860b-0409b213e16e.png"
      },
      {
        id: "one-bedroom",
        name: "One-Bedroom Apartment",
        cost: 10.00,
        rent: 5,
        time: 6,
        level: 0,
        image: "/lovable-uploads/95b9d9d5-ab40-4478-860b-0409b213e16e.png"
      },
      {
        id: "two-bedroom",
        name: "Two-Bedroom Apartment",
        cost: 20.00,
        rent: 10,
        time: 9,
        level: 0,
        image: "/lovable-uploads/95b9d9d5-ab40-4478-860b-0409b213e16e.png"
      },
      {
        id: "townhouse",
        name: "Townhouse",
        cost: 40.00,
        rent: 20,
        time: 12,
        level: 0,
        image: "/lovable-uploads/95b9d9d5-ab40-4478-860b-0409b213e16e.png"
      },
      {
        id: "small-single",
        name: "Small Single-Family Home",
        cost: 80.00,
        rent: 40,
        time: 15,
        level: 0,
        image: "/lovable-uploads/95b9d9d5-ab40-4478-860b-0409b213e16e.png"
      }
    ]
  },
  {
    id: "residential",
    name: "Residential Properties",
    properties: [
      {
        id: "condo",
        name: "Condo",
        cost: 160.00,
        rent: 80,
        time: 18,
        level: 0,
        image: "/lovable-uploads/f65a2131-d25e-42e4-92f7-9a4925623744.png"
      },
      {
        id: "large-single",
        name: "Large Single Family Home",
        cost: 320.00,
        rent: 160,
        time: 21,
        level: 0,
        image: "/lovable-uploads/f65a2131-d25e-42e4-92f7-9a4925623744.png"
      },
      {
        id: "duplex",
        name: "Duplex",
        cost: 640.00,
        rent: 320,
        time: 24,
        level: 0,
        image: "/lovable-uploads/f65a2131-d25e-42e4-92f7-9a4925623744.png"
      },
      {
        id: "three-bedroom",
        name: "Three Bedroom House",
        cost: 1280.00,
        rent: 640,
        time: 27,
        level: 0,
        image: "/lovable-uploads/f65a2131-d25e-42e4-92f7-9a4925623744.png"
      },
      {
        id: "four-bedroom",
        name: "Four Bedroom House",
        cost: 2560.00,
        rent: 1280,
        time: 30,
        level: 0,
        image: "/lovable-uploads/f65a2131-d25e-42e4-92f7-9a4925623744.png"
      }
    ]
  },
  {
    id: "luxury",
    name: "Luxury Properties",
    properties: [
      {
        id: "luxury-apartment",
        name: "Luxury Apartment",
        cost: 5120.00,
        rent: 2560,
        time: 33,
        level: 0,
        image: "/lovable-uploads/455514b1-7978-4860-958f-54cf4034bb80.png"
      },
      {
        id: "penthouse",
        name: "Penthouse",
        cost: 10240.00,
        rent: 5120,
        time: 36,
        level: 0,
        image: "/lovable-uploads/455514b1-7978-4860-958f-54cf4034bb80.png"
      },
      {
        id: "beachfront",
        name: "Beachfront Property",
        cost: 20480.00,
        rent: 10240,
        time: 39,
        level: 0,
        image: "/lovable-uploads/455514b1-7978-4860-958f-54cf4034bb80.png"
      },
      {
        id: "farmhouse",
        name: "Farmhouse",
        cost: 40960.00,
        rent: 20480,
        time: 42,
        level: 0,
        image: "/lovable-uploads/455514b1-7978-4860-958f-54cf4034bb80.png"
      },
      {
        id: "vacation",
        name: "Vacation Property",
        cost: 81920.00,
        rent: 40960,
        time: 45,
        level: 0,
        image: "/lovable-uploads/455514b1-7978-4860-958f-54cf4034bb80.png"
      }
    ]
  },
  {
    id: "commercial",
    name: "Commercial Properties",
    properties: [
      {
        id: "commercial-retail",
        name: "Commercial Retail Space",
        cost: 163840.00,
        rent: 81920,
        time: 48,
        level: 0,
        image: "/lovable-uploads/84fa6735-3484-4410-9f45-ec5a078b818e.png"
      },
      {
        id: "office-building",
        name: "Office Building",
        cost: 327680.00,
        rent: 163840,
        time: 51,
        level: 0,
        image: "/lovable-uploads/84fa6735-3484-4410-9f45-ec5a078b818e.png"
      },
      {
        id: "industrial-warehouse",
        name: "Industrial Warehouse",
        cost: 655360.00,
        rent: 327680,
        time: 54,
        level: 0,
        image: "/lovable-uploads/84fa6735-3484-4410-9f45-ec5a078b818e.png"
      },
      {
        id: "multi-family",
        name: "Multi-Family Residential Building",
        cost: 1310720.00,
        rent: 655360,
        time: 57,
        level: 0,
        image: "/lovable-uploads/84fa6735-3484-4410-9f45-ec5a078b818e.png"
      },
      {
        id: "mixed-use",
        name: "Mixed-Use",
        cost: 2621440.00,
        rent: 1310720,
        time: 60,
        level: 0,
        image: "/lovable-uploads/84fa6735-3484-4410-9f45-ec5a078b818e.png"
      }
    ]
  }
];
