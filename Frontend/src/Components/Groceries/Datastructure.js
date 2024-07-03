const groceriesNavigation = {
    categories: [
        {
            id: 'fruits',
            name: 'Fruits',
            sections: [
                {
                    id: 'fresh_fruits',
                    name: 'Fresh Fruits',
                    items: [
                        { name: 'Apples', id: 'apples' },
                        { name: 'Bananas', id: 'bananas' },
                        { name: 'Oranges', id: 'oranges' },
                        { name: 'Berries', id: 'berries' },
                        { name: 'Grapes', id: 'grapes' },
                    ],
                },
                {
                    id: 'dried_fruits',
                    name: 'Dried Fruits',
                    items: [
                        { name: 'Raisins', id: 'raisins' },
                        { name: 'Dates', id: 'dates' },
                        { name: 'Apricots', id: 'apricots' },
                        { name: 'Figs', id: 'figs' },
                    ],
                },
            ],
            featured: [
                {
                    name: 'Seasonal Fruits',
                    id: '#',
                    imageSrc: 'https://example.com/images/seasonal-fruits.jpg',
                    imageAlt: 'Image of seasonal fruits.',
                },
                {
                    name: 'Organic Fruits',
                    id: '#',
                    imageSrc: 'https://example.com/images/organic-fruits.jpg',
                    imageAlt: 'Image of organic fruits.',
                },
            ],
        },
        {
            id: 'vegetables',
            name: 'Vegetables',
            sections: [
                {
                    id: 'leafy_greens',
                    name: 'Leafy Greens',
                    items: [
                        { name: 'Spinach', id: 'spinach' },
                        { name: 'Lettuce', id: 'lettuce' },
                        { name: 'Kale', id: 'kale' },
                        { name: 'Cabbage', id: 'cabbage' },
                    ],
                },
                {
                    id: 'root_vegetables',
                    name: 'Root Vegetables',
                    items: [
                        { name: 'Carrots', id: 'carrots' },
                        { name: 'Potatoes', id: 'potatoes' },
                        { name: 'Beets', id: 'beets' },
                        { name: 'Turnips', id: 'turnips' },
                    ],
                },
                {
                    id: 'organic_vegetables',
                    name: 'Organic Vegetables',
                    items: [
                        { name: 'Organic Spinach', id: 'organic_spinach' },
                        { name: 'Organic Carrots', id: 'organic_carrots' },
                        { name: 'Organic Tomatoes', id: 'organic_tomatoes' },
                    ],
                },
            ],
            featured: [
                {
                    name: 'Fresh Vegetables',
                    id: '#',
                    imageSrc: 'https://example.com/images/fresh-vegetables.jpg',
                    imageAlt: 'Image of fresh vegetables.',
                },
                {
                    name: 'Organic Produce',
                    id: '#',
                    imageSrc: 'https://example.com/images/organic-vegetables.jpg',
                    imageAlt: 'Image of organic vegetables.',
                },
            ],
        },
        {
            id: 'dairy',
            name: 'Dairy',
            sections: [
                {
                    id: 'milk',
                    name: 'Milk',
                    items: [
                        { name: 'Whole Milk', id: 'whole_milk' },
                        { name: 'Skim Milk', id: 'skim_milk' },
                        { name: 'Almond Milk', id: 'almond_milk' },
                        { name: 'Soy Milk', id: 'soy_milk' },
                    ],
                },
                {
                    id: 'cheese',
                    name: 'Cheese',
                    items: [
                        { name: 'Cheddar', id: 'cheddar' },
                        { name: 'Mozzarella', id: 'mozzarella' },
                        { name: 'Parmesan', id: 'parmesan' },
                        { name: 'Brie', id: 'brie' },
                    ],
                },
                {
                    id: 'yogurt',
                    name: 'Yogurt',
                    items: [
                        { name: 'Greek Yogurt', id: 'greek_yogurt' },
                        { name: 'Regular Yogurt', id: 'regular_yogurt' },
                        { name: 'Flavored Yogurt', id: 'flavored_yogurt' },
                    ],
                },
            ],
            featured: [
                {
                    name: 'Artisan Cheeses',
                    id: '#',
                    imageSrc: 'https://example.com/images/artisan-cheeses.jpg',
                    imageAlt: 'Image of artisan cheeses.',
                },
                {
                    name: 'Dairy Alternatives',
                    id: '#',
                    imageSrc: 'https://example.com/images/dairy-alternatives.jpg',
                    imageAlt: 'Image of dairy alternatives.',
                },
            ],
        },
        {
            id: 'beverages',
            name: 'Beverages',
            sections: [
                {
                    id: 'juices',
                    name: 'Juices',
                    items: [
                        { name: 'Orange Juice', id: 'orange_juice' },
                        { name: 'Apple Juice', id: 'apple_juice' },
                        { name: 'Grape Juice', id: 'grape_juice' },
                        { name: 'Carrot Juice', id: 'carrot_juice' },
                    ],
                },
                {
                    id: 'soft_drinks',
                    name: 'Soft Drinks',
                    items: [
                        { name: 'Cola', id: 'cola' },
                        { name: 'Lemon-Lime Soda', id: 'lemon_lime_soda' },
                        { name: 'Root Beer', id: 'root_beer' },
                        { name: 'Ginger Ale', id: 'ginger_ale' },
                    ],
                },
                {
                    id: 'coffee_tea',
                    name: 'Coffee & Tea',
                    items: [
                        { name: 'Ground Coffee', id: 'ground_coffee' },
                        { name: 'Coffee Beans', id: 'coffee_beans' },
                        { name: 'Black Tea', id: 'black_tea' },
                        { name: 'Green Tea', id: 'green_tea' },
                    ],
                },
            ],
            featured: [
                {
                    name: 'Fresh Juices',
                    id: '#',
                    imageSrc: 'https://example.com/images/fresh-juices.jpg',
                    imageAlt: 'Image of fresh juices.',
                },
                {
                    name: 'Premium Coffees',
                    id: '#',
                    imageSrc: 'https://example.com/images/premium-coffees.jpg',
                    imageAlt: 'Image of premium coffee products.',
                },
            ],
        },
    ],
    pages: [
        { name: 'Company', id: '/' },
        { name: 'Stores', id: '/' },
    ],
}

export default groceriesNavigation;