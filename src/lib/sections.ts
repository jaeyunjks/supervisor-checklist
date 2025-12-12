// src/lib/sections.ts
export const sections = {
    bathroom: ["Mirror & glass no smudges", "Toilet detailed clean all side", "Towels completed", "Shower amenities completed", "Floor and corners clean", "Bathrobes", "Bathub & salt are spotless"],
    bedroom: ["Bed and furniture symetrical", "No dust in the corners and behind curtain", "No dust behind tv", "Desk and under desk clean ", "Floor and carpet clean", "Totebag,Booklet,Bathrobes,Teddy", "Check ceilings and vents", "Entrance door spotless"],
    minibar: ["Snacks are completed & booklet including water's' and coffes", "Marble surfaces are soft and no dust", "Blanket, Laundry Bag, Slippers", "Hangers wardrobe clean", "Wardobe amenities completed"]
} as const;

export type SectionType = keyof typeof sections;