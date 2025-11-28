// src/lib/sections.ts
export const sections = {
    bathroom: ["Mirror & glass no smudges", "Toilet clean", "Towels completed", "Shower amenities completed", "Floor and corners clean"],
    bedroom: ["Bed and furniture symetrical", "No dust in the corners and behind curtain", "No dust behind tv", "Desk and under desk clean ", "Floor and carpet clean", "Bedroom Amenities completed", "(totebag,booklet,bathrobes,teddy)"],
    minibar: ["Snacks are completed & booklet", "Marble surfaces are soft and no dust", "Coffe, 2x still, 2x sparkling", "hangers wardrobe clean", "Wardobe amenities completed"]
} as const;

export type SectionType = keyof typeof sections;