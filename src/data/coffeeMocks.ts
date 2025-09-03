export interface CoffeeItem {
    id: number;
    name: string;
    description: string;
    price: number;
    category: string;
    roast_type: string;
    origin: string[];
    additions: string[];
}

export const coffees: CoffeeItem[] = [
    {
        "id": 1,
        "name": "Classic Espresso",
        "description": "An intense espresso with a strong flavor and notes of dark chocolate.",
        "price": 8.50,
        "category": "Espresso",
        "roast_type": "dark",
        "origin": ["Brazil", "Vietnam"],
        "additions": ["sugar", "milk"]
    },
    {
        "id": 2,
        "name": "Frothy Latte",
        "description": "A delicate combination of steamed milk and espresso, perfect for any time of day.",
        "price": 14.00,
        "category": "Milk-based",
        "roast_type": "light",
        "origin": ["Colombia"],
        "additions": ["syrup", "cinnamon"]
    },
    {
        "id": 3,
        "name": "Brewed Coffee",
        "description": "A classic drip coffee, smooth and mild.",
        "price": 10.00,
        "category": "Drip coffee",
        "roast_type": "medium",
        "origin": ["Peru"],
        "additions": ["none"]
    },
    {
        "id": 4,
        "name": "Foamy Cappuccino",
        "description": "A classic Italian cappuccino with a thick layer of milk foam.",
        "price": 12.00,
        "category": "Milk-based",
        "roast_type": "medium",
        "origin": ["Ethiopia"],
        "additions": ["cocoa powder"]
    },
    {
        "id": 5,
        "name": "Iced Coffee",
        "description": "Coffee cold-steeped for 12 hours, exceptionally smooth and refreshing.",
        "price": 16.00,
        "category": "Cold coffee",
        "roast_type": "light",
        "origin": ["Ethiopia", "Kenya"],
        "additions": ["ice", "lemon slice"]
    },
    {
        "id": 6,
        "name": "Nutty Ground Coffee",
        "description": "Ground coffee with caramel and nutty flavors, ready for brewing.",
        "price": 28.00,
        "category": "Coffee beans",
        "roast_type": "medium",
        "origin": ["Nicaragua"],
        "additions": ["none"]
    },
    {
        "id": 7,
        "name": "Flat White",
        "description": "Two shots of espresso with velvety, delicately frothed milk.",
        "price": 15.00,
        "category": "Milk-based",
        "roast_type": "dark",
        "origin": ["Brazil"],
        "additions": ["sugar"]
    },
    {
        "id": 8,
        "name": "Rich Coffee Beans",
        "description": "Beans with a rich flavor, featuring notes of citrus fruits and chocolate.",
        "price": 55.00,
        "category": "Coffee beans",
        "roast_type": "medium",
        "origin": ["Colombia"],
        "additions": ["none"]
    },
    {
        "id": 9,
        "name": "Simple Americano",
        "description": "A simple combination of a double espresso shot and hot water.",
        "price": 9.00,
        "category": "Espresso",
        "roast_type": "dark",
        "origin": ["Brazil"],
        "additions": ["sugar", "cream"]
    },
    {
        "id": 10,
        "name": "Chocolate Mocha",
        "description": "A mix of espresso, hot chocolate, and milk, topped with whipped cream.",
        "price": 17.00,
        "category": "Sweet coffee",
        "roast_type": "medium",
        "origin": ["Ethiopia"],
        "additions": ["whipped cream", "chocolate shavings"]
    }
];

export const getCategories = () => {
    const categories = new Set<string>();
    coffees.forEach(coffee => {
        categories.add(coffee.category);
    });
    return ["All", ...Array.from(categories)];
};
