const electronicsNavigation = {
    categories: [
        {
            id: 'mobiles',
            name: 'Mobiles',
            sections: [
                {
                    id: 'smartphones',
                    name: 'Smartphones',
                    items: [
                        { name: 'Android Phones', id: 'android_phones' },
                        { name: 'iPhones', id: 'iphones' },
                        { name: 'Feature Phones', id: 'feature_phones' },
                        { name: 'Foldable Phones', id: 'foldable_phones' },
                    ],
                },
                {
                    id: 'accessories',
                    name: 'Accessories',
                    items: [
                        { name: 'Phone Cases', id: 'phone_cases' },
                        { name: 'Screen Protectors', id: 'screen_protectors' },
                        { name: 'Chargers', id: 'chargers' },
                        { name: 'Headphones', id: 'headphones' },
                    ],
                },
                {
                    id: 'brands',
                    name: 'Brands',
                    items: [
                        { name: 'Samsung', id: 'samsung' },
                        { name: 'Apple', id: 'apple' },
                        { name: 'OnePlus', id: 'oneplus' },
                        { name: 'Xiaomi', id: 'xiaomi' },
                        { name: 'Google', id: 'google' },
                        { name: 'Nokia', id: 'nokia' },
                    ],
                },
            ],
            featured: [
                {
                    name: 'Latest Smartphones',
                    id: '#',
                    imageSrc: 'https://example.com/images/latest-smartphones.jpg',
                    imageAlt: 'Image of the latest smartphones.',
                },
                {
                    name: 'Top Accessories',
                    id: '#',
                    imageSrc: 'https://example.com/images/top-accessories.jpg',
                    imageAlt: 'Image of popular mobile accessories.',
                },
            ],
        },
        {
            id: 'smartwatches',
            name: 'Smartwatches',
            sections: [
                {
                    id: 'smartwatch_models',
                    name: 'Smartwatch Models',
                    items: [
                        { name: 'Apple Watch', id: 'apple_watch' },
                        { name: 'Samsung Galaxy Watch', id: 'samsung_galaxy_watch' },
                        { name: 'Fitbit', id: 'fitbit' },
                        { name: 'Garmin', id: 'garmin' },
                    ],
                },
                {
                    id: 'accessories',
                    name: 'Accessories',
                    items: [
                        { name: 'Watch Bands', id: 'watch_bands' },
                        { name: 'Chargers', id: 'watch_chargers' },
                        { name: 'Screen Protectors', id: 'watch_screen_protectors' },
                    ],
                },
                {
                    id: 'brands',
                    name: 'Brands',
                    items: [
                        { name: 'Apple', id: 'apple' },
                        { name: 'Samsung', id: 'samsung' },
                        { name: 'Fitbit', id: 'fitbit' },
                        { name: 'Garmin', id: 'garmin' },
                        { name: 'Huawei', id: 'huawei' },
                    ],
                },
            ],
            featured: [
                {
                    name: 'New Arrivals',
                    id: '#',
                    imageSrc: 'https://example.com/images/new-smartwatches.jpg',
                    imageAlt: 'Image of new smartwatch arrivals.',
                },
                {
                    name: 'Fitness Trackers',
                    id: '#',
                    imageSrc: 'https://example.com/images/fitness-trackers.jpg',
                    imageAlt: 'Image of popular fitness trackers.',
                },
            ],
        },
        {
            id: 'laptops',
            name: 'Laptops',
            sections: [
                {
                    id: 'types',
                    name: 'Types',
                    items: [
                        { name: 'Ultrabooks', id: 'ultrabooks' },
                        { name: 'Gaming Laptops', id: 'gaming_laptops' },
                        { name: '2-in-1 Laptops', id: '2_in_1_laptops' },
                        { name: 'MacBooks', id: 'macbooks' },
                    ],
                },
                {
                    id: 'accessories',
                    name: 'Accessories',
                    items: [
                        { name: 'Laptop Bags', id: 'laptop_bags' },
                        { name: 'Cooling Pads', id: 'cooling_pads' },
                        { name: 'Docking Stations', id: 'docking_stations' },
                        { name: 'External Hard Drives', id: 'external_hard_drives' },
                    ],
                },
                {
                    id: 'brands',
                    name: 'Brands',
                    items: [
                        { name: 'Apple', id: 'apple' },
                        { name: 'Dell', id: 'dell' },
                        { name: 'HP', id: 'hp' },
                        { name: 'Lenovo', id: 'lenovo' },
                        { name: 'Asus', id: 'asus' },
                        { name: 'Acer', id: 'acer' },
                    ],
                },
            ],
            featured: [
                {
                    name: 'Latest Laptops',
                    id: '#',
                    imageSrc: 'https://example.com/images/latest-laptops.jpg',
                    imageAlt: 'Image of the latest laptops.',
                },
                {
                    name: 'Gaming Gear',
                    id: '#',
                    imageSrc: 'https://example.com/images/gaming-gear.jpg',
                    imageAlt: 'Image of gaming laptops and accessories.',
                },
            ],
        },
        {
            id: 'tablets',
            name: 'Tablets',
            sections: [
                {
                    id: 'types',
                    name: 'Types',
                    items: [
                        { name: 'Android Tablets', id: 'android_tablets' },
                        { name: 'iPads', id: 'ipads' },
                        { name: 'Windows Tablets', id: 'windows_tablets' },
                        { name: 'Convertible Tablets', id: 'convertible_tablets' },
                    ],
                },
                {
                    id: 'accessories',
                    name: 'Accessories',
                    items: [
                        { name: 'Cases', id: 'tablet_cases' },
                        { name: 'Screen Protectors', id: 'tablet_screen_protectors' },
                        { name: 'Keyboards', id: 'tablet_keyboards' },
                        { name: 'Stylus Pens', id: 'stylus_pens' },
                    ],
                },
                {
                    id: 'brands',
                    name: 'Brands',
                    items: [
                        { name: 'Apple', id: 'apple' },
                        { name: 'Samsung', id: 'samsung' },
                        { name: 'Microsoft', id: 'microsoft' },
                        { name: 'Lenovo', id: 'lenovo' },
                        { name: 'Amazon', id: 'amazon' },
                        { name: 'Huawei', id: 'huawei' },
                    ],
                },
            ],
            featured: [
                {
                    name: 'Latest Tablets',
                    id: '#',
                    imageSrc: 'https://example.com/images/latest-tablets.jpg',
                    imageAlt: 'Image of the latest tablets.',
                },
                {
                    name: 'Top Accessories',
                    id: '#',
                    imageSrc: 'https://example.com/images/top-tablet-accessories.jpg',
                    imageAlt: 'Image of popular tablet accessories.',
                },
            ],
        },
    ],
    pages: [
        { name: 'Company', id: '/' },
        { name: 'Stores', id: '/' },
    ],
}
export default electronicsNavigation;