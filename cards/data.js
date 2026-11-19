const catalog = [
  {
    "id": 1,
    "name": "Pass Go",
    "type": "Action Card",
    "rarity": "Normal",
    "color": null,
    "count": 10,
    "price": 1.0,
    "effect": "Draw two extra cards from the draw pile."
  },
  {
    "id": 2,
    "name": "Sly Deal",
    "type": "Action Card",
    "rarity": "Normal",
    "color": null,
    "count": 3,
    "price": 3.0,
    "effect": "Steal one property card from another player."
  },
  {
    "id": 3,
    "name": "Forced Deal",
    "type": "Action Card",
    "rarity": "Normal",
    "color": null,
    "count": 4,
    "price": 3.0,
    "effect": "Swap one property card with another player."
  },
  {
    "id": 4,
    "name": "Deal Breaker",
    "type": "Action Card",
    "rarity": "Super Special Rare",
    "color": null,
    "count": 2,
    "price": 5.0,
    "effect": "Steal a complete property set from another player."
  },
  {
    "id": 5,
    "name": "Debt Collector",
    "type": "Action Card",
    "rarity": "Rare",
    "color": null,
    "count": 3,
    "price": 3.0,
    "effect": "Force another player to pay money."
  },
  {
    "id": 6,
    "name": "It is My Birthday",
    "type": "Action Card",
    "rarity": "Rare",
    "color": null,
    "count": 3,
    "price": 2.0,
    "effect": "All other players pay money to you."
  },
  {
    "id": 7,
    "name": "Just Say No",
    "type": "Action Card",
    "rarity": "Super Rare",
    "color": null,
    "count": 3,
    "price": 4.0,
    "effect": "Cancel the effect of another action card."
  },
  {
    "id": 8,
    "name": "Rent",
    "type": "Rent Card",
    "rarity": "Rare",
    "color": null,
    "count": 10,
    "price": 1.0,
    "effect": "Charge rent from another player based on property colour."
  },
  {
    "id": 9,
    "name": "Multi-coloured Rent Card",
    "type": "Rent Card",
    "rarity": "Super Rare",
    "color": null,
    "count": 3,
    "price": 3.0,
    "effect": "Charge rent using any property colour."
  },
  {
    "id": 10,
    "name": "Double The Rent",
    "type": "Rent Card",
    "rarity": "Super Rare",
    "color": null,
    "count": 2,
    "price": 1.0,
    "effect": "Double the rent charged this turn."
  },
  {
    "id": 11,
    "name": "House",
    "type": "Building Card",
    "rarity": "Rare",
    "color": null,
    "count": 3,
    "price": 3.0,
    "effect": "Add to a complete property set to increase rent."
  },
  {
    "id": 12,
    "name": "Hotel",
    "type": "Building Card",
    "rarity": "Super Rare",
    "color": null,
    "count": 3,
    "price": 4.0,
    "effect": "Add to a property set with a house to increase rent further."
  },
  {
    "id": 13,
    "name": "Money 1M",
    "type": "Money Card",
    "rarity": "Normal",
    "color": null,
    "count": 6,
    "price": 1.0,
    "effect": "Used as money in the bank."
  },
  {
    "id": 14,
    "name": "Money 2M",
    "type": "Money Card",
    "rarity": "Normal",
    "color": null,
    "count": 5,
    "price": 2.0,
    "effect": "Used as money in the bank."
  },
  {
    "id": 15,
    "name": "Money 3M",
    "type": "Money Card",
    "rarity": "Normal",
    "color": null,
    "count": 3,
    "price": 3.0,
    "effect": "Used as money in the bank."
  },
  {
    "id": 16,
    "name": "Money 4M",
    "type": "Money Card",
    "rarity": "Rare",
    "color": null,
    "count": 3,
    "price": 4.0,
    "effect": "Used as money in the bank."
  },
  {
    "id": 17,
    "name": "Money 5M",
    "type": "Money Card",
    "rarity": "Rare",
    "color": null,
    "count": 2,
    "price": 5.0,
    "effect": "Used as money in the bank."
  },
  {
    "id": 18,
    "name": "Money 10M",
    "type": "Money Card",
    "rarity": "Ultra Rare",
    "color": null,
    "count": 1,
    "price": 10.0,
    "effect": "Used as money in the bank."
  },
  {
    "id": 19,
    "name": "Brown Property",
    "type": "Property Card",
    "rarity": "Normal",
    "color": "Brown",
    "count": 2,
    "price": 1.0,
    "effect": "Used to complete a brown property set."
  },
  {
    "id": 20,
    "name": "Dark Blue Property",
    "type": "Property Card",
    "rarity": "Rare",
    "color": "Dark Blue",
    "count": 2,
    "price": 4.0,
    "effect": "Used to complete a dark blue property set."
  },
  {
    "id": 21,
    "name": "Green Property",
    "type": "Property Card",
    "rarity": "Rare",
    "color": "Green",
    "count": 3,
    "price": 4.0,
    "effect": "Used to complete a green property set."
  },
  {
    "id": 22,
    "name": "Red Property",
    "type": "Property Card",
    "rarity": "Rare",
    "color": "Red",
    "count": 3,
    "price": 3.0,
    "effect": "Used to complete a red property set."
  },
  {
    "id": 23,
    "name": "Yellow Property",
    "type": "Property Card",
    "rarity": "Rare",
    "color": "Yellow",
    "count": 3,
    "price": 3.0,
    "effect": "Used to complete a yellow property set."
  },
  {
    "id": 24,
    "name": "Orange Property",
    "type": "Property Card",
    "rarity": "Rare",
    "color": "Orange",
    "count": 3,
    "price": 2.0,
    "effect": "Used to complete a orange property set."
  },
  {
    "id": 25,
    "name": "Pink Property",
    "type": "Property Card",
    "rarity": "Rare",
    "color": "Pink",
    "count": 3,
    "price": 2.0,
    "effect": "Used to complete a green property set."
  },
  {
    "id": 26,
    "name": "Light Blue Property",
    "type": "Property Card",
    "rarity": "Rare",
    "color": "Light Blue",
    "count": 3,
    "price": 1.0,
    "effect": "Used to complete a green property set."
  },
  {
    "id": 27,
    "name": "Railroad Property",
    "type": "Property Card",
    "rarity": "Normal",
    "color": "Railroad",
    "count": 4,
    "price": 2.0,
    "effect": "Used to complete a railroad property set."
  },
  {
    "id": 28,
    "name": "Utility Property",
    "type": "Property Card",
    "rarity": "Normal",
    "color": "Utility",
    "count": 2,
    "price": 2.0,
    "effect": "Used to complete a railroad property set."
  },
  {
    "id": 29,
    "name": "Double-Color Property Wildcard",
    "type": "Property Wildcard",
    "rarity": "Rare",
    "color": null,
    "count": 8,
    "price": 2.0,
    "effect": "Can represent two property colours."
  },
  {
    "id": 30,
    "name": "Multi-Color Property Wildcard",
    "type": "Property Wildcard",
    "rarity": "Super Rare",
    "color": null,
    "count": 2,
    "price": 3.0,
    "effect": "Can represent more than two property colours."
  },
  {
    "id": 31,
    "name": "All-Color Property Wildcard",
    "type": "Property Wildcard",
    "rarity": "Super Special Rare",
    "color": null,
    "count": 1,
    "price": 0.0,
    "effect": "Can represent any property colours."
  }
];
