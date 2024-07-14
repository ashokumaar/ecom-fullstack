const fashionNavigation = {
    categories: [
        {
            // index: 1,
            id: 'men',
            name: 'Men',
            sections: [
                {
                    // index: 11,
                    id: 'clothing',
                    name: 'Clothing',
                    items: [
                        { name: 'Mens Kurtas', id: 'mens_kurta' },
                        { name: 'Shirt', id: 'shirt' },
                        { name: 'Men Jeans', id: 'men_jeans' },
                        { name: 'Sweaters', id: '#' },
                        { name: 'T-Shirts', id: 't-shirt' },
                        { name: 'Jackets', id: '#' },
                        { name: 'Activewear', id: '#' },

                    ],
                },
                {
                    // index: 12,
                    id: 'accessories',
                    name: 'Accessories',
                    items: [
                        { name: 'Watches', id: 'Watches' },
                        { name: 'Wallets', id: 'Wallets' },
                        { name: 'Bags', id: 'Bags' },
                        { name: 'Sunglasses', id: 'Sunglasses' },
                        { name: 'Hats', id: 'Hats' },
                        { name: 'Belts', id: 'Belts' },
                    ],
                },
                {
                    // index: 13,
                    id: 'brands',
                    name: 'Brands',
                    items: [
                        { name: 'PETER ENGLAND', id: 'PETER ENGLAND' },
                        { name: 'FUBAR', id: 'FUBAR' },
                        { name: 'HIGHLANDER', id: 'HIGHLANDER' },
                        { name: 'Majestic Man', id: 'Majestic Man' },
                        { name: 'Vida Loca', id: 'Vida Loca' },
                        { name: 'linaria', id: 'linaria' },
                        { name: '3BROS', id: '3BROS' },
                        { name: 'ARROW', id: 'KOTTY' },
                        { name: 'COPER BUCK', id: 'COPER BUCK' },
                        { name: 'ZAYSH', id: 'ZAYSH' },
                    ],
                },
                {
                    id: 'shoes',
                    name: 'Shoes',
                    items: [
                        
                    ]
                }
            ],
            featured: [
                {
                    // index: 14,
                    name: 'New Arrivals',
                    id: '#',
                    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg',
                    imageAlt: 'Drawstring top with elastic loop closure and textured interior padding.',
                },
                {
                    // index: 15,
                    name: 'Artwork Tees',
                    id: '#',
                    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-06.jpg',
                    imageAlt:
                        'Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.',
                },
            ],
        },
        {
            // index: 2,
            id: 'women',
            name: 'Women',
            sections: [
                {
                    // index: 21,
                    id: 'clothing',
                    name: 'Clothing',
                    items: [
                        { name: 'Tops', id: "top", href: `{women/clothing/tops}` },
                        { name: 'Dresses', id: "women_dress", href: '#' },
                        { name: 'Women Jeans', id: 'women_jeans' },
                        { name: 'Lengha Choli', id: 'lehenga_choli' },
                        { name: 'Sweaters', id: 'sweater' },
                        { name: 'T-Shirts', id: 't-shirt' },
                        { name: 'Jackets', id: 'jacket' },
                        { name: 'Gouns', id: 'gouns' },
                        { name: 'Sarees', id: 'saree' },
                        { name: 'Kurtas', id: 'kurtas' },
                    ],
                },
                {
                    // index: 22,
                    id: 'accessories',
                    name: 'Accessories',
                    items: [
                        { name: 'Watches', id: 'watch' },
                        { name: 'Wallets', id: 'wallet' },
                        { name: 'Bags', id: 'bag' },
                        { name: 'Sunglasses', id: 'sunglasse' },
                        { name: 'Hats', id: 'hat' },
                        { name: 'Belts', id: 'belt' },
                    ],
                },
                {
                    // index: 23,
                    id: 'brands',
                    name: 'Brands',
                    items: [
                        { name: 'Tokyo Talkies', id: 'Tokyo Talkies' },
                        { name: 'KOTTY', id: 'KOTTY' },
                        { name: 'Aarvia', id: 'Aarvia' },
                        { name: 'TYFFYN', id: 'TYFFYN' },
                        { name: `LEVI'S`, id: `LEVI'S` },
                        { name: 'Madstitches Apparels Private Limited', id: 'Madstitches Apparels Private Limited' },
                        { name: 'Keep Cart', id: 'Keep Cart' },
                        { name: 'SASSAFRAS', id: 'SASSAFRAS' },
                        { name: 'Crazeis', id: 'Crazeis' },
                        { name: 'Universaloutfit', id: 'Universaloutfit' },
                    ],
                },
            ],
            featured: [
                {
                    // index: 24,
                    name: 'New Arrivals',
                    href: '/',
                    imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg',
                    imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.',
                },
                {
                    // index: 25,
                    name: 'Basic Tees',
                    href: '/',
                    imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg',
                    imageAlt: 'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
                },
            ],
        },
    ],
    pages: [
        { name: 'Company', id: '/' },
        { name: 'Stores', id: '/' },
    ],
}
export default fashionNavigation;