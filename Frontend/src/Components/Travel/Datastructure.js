const travelServicesNavigation = {
    categories: [
        {
            id: 'destinations',
            name: 'Destinations',
            sections: [
                {
                    id: 'popular_destinations',
                    name: 'Popular Destinations',
                    items: [
                        { name: 'New York', id: 'new_york' },
                        { name: 'Paris', id: 'paris' },
                        { name: 'Tokyo', id: 'tokyo' },
                        { name: 'Sydney', id: 'sydney' },
                        { name: 'London', id: 'london' },
                        { name: 'Dubai', id: 'dubai' },
                    ],
                },
                {
                    id: 'adventure_travel',
                    name: 'Adventure Travel',
                    items: [
                        { name: 'Mountain Climbing', id: 'mountain_climbing' },
                        { name: 'Safari', id: 'safari' },
                        { name: 'Scuba Diving', id: 'scuba_diving' },
                        { name: 'Hiking', id: 'hiking' },
                        { name: 'Skiing', id: 'skiing' },
                    ],
                },
                {
                    id: 'beach_destinations',
                    name: 'Beach Destinations',
                    items: [
                        { name: 'Maldives', id: 'maldives' },
                        { name: 'Hawaii', id: 'hawaii' },
                        { name: 'Bahamas', id: 'bahamas' },
                        { name: 'Bali', id: 'bali' },
                        { name: 'Phuket', id: 'phuket' },
                    ],
                },
            ],
            featured: [
                {
                    name: 'Top Cities to Visit',
                    id: '#',
                    imageSrc: 'https://example.com/images/top-cities.jpg',
                    imageAlt: 'Image of popular cities to visit.',
                },
                {
                    name: 'Adventure Escapes',
                    id: '#',
                    imageSrc: 'https://example.com/images/adventure-escapes.jpg',
                    imageAlt: 'Image of adventure travel destinations.',
                },
            ],
        },
        {
            id: 'services',
            name: 'Services',
            sections: [
                {
                    id: 'accommodation',
                    name: 'Accommodation',
                    items: [
                        { name: 'Hotels', id: 'hotels' },
                        { name: 'Hostels', id: 'hostels' },
                        { name: 'Vacation Rentals', id: 'vacation_rentals' },
                        { name: 'Resorts', id: 'resorts' },
                        { name: 'Bed & Breakfasts', id: 'bed_breakfasts' },
                    ],
                },
                {
                    id: 'transportation',
                    name: 'Transportation',
                    items: [
                        { name: 'Flights', id: 'flights' },
                        { name: 'Car Rentals', id: 'car_rentals' },
                        { name: 'Trains', id: 'trains' },
                        { name: 'Cruises', id: 'cruises' },
                        { name: 'Bus Services', id: 'bus_services' },
                    ],
                },
                {
                    id: 'tours_activities',
                    name: 'Tours & Activities',
                    items: [
                        { name: 'City Tours', id: 'city_tours' },
                        { name: 'Guided Tours', id: 'guided_tours' },
                        { name: 'Outdoor Activities', id: 'outdoor_activities' },
                        { name: 'Cultural Experiences', id: 'cultural_experiences' },
                        { name: 'Food & Wine Tours', id: 'food_wine_tours' },
                    ],
                },
            ],
            featured: [
                {
                    name: 'Luxury Stays',
                    id: '#',
                    imageSrc: 'https://example.com/images/luxury-stays.jpg',
                    imageAlt: 'Image of luxury accommodations.',
                },
                {
                    name: 'Top-Rated Tours',
                    id: '#',
                    imageSrc: 'https://example.com/images/top-rated-tours.jpg',
                    imageAlt: 'Image of top-rated tours and activities.',
                },
            ],
        },
        {
            id: 'travel_deals',
            name: 'Travel Deals',
            sections: [
                {
                    id: 'seasonal_deals',
                    name: 'Seasonal Deals',
                    items: [
                        { name: 'Summer Specials', id: 'summer_specials' },
                        { name: 'Winter Getaways', id: 'winter_getaways' },
                        { name: 'Spring Break', id: 'spring_break' },
                        { name: 'Autumn Adventures', id: 'autumn_adventures' },
                    ],
                },
                {
                    id: 'last_minute_deals',
                    name: 'Last Minute Deals',
                    items: [
                        { name: 'Weekend Getaways', id: 'weekend_getaways' },
                        { name: 'Last Minute Flights', id: 'last_minute_flights' },
                        { name: 'Hotel Discounts', id: 'hotel_discounts' },
                    ],
                },
                {
                    id: 'package_deals',
                    name: 'Package Deals',
                    items: [
                        { name: 'All-Inclusive Resorts', id: 'all_inclusive_resorts' },
                        { name: 'Flight + Hotel', id: 'flight_hotel' },
                        { name: 'Cruise Packages', id: 'cruise_packages' },
                    ],
                },
            ],
            featured: [
                {
                    name: 'Exclusive Deals',
                    id: '#',
                    imageSrc: 'https://example.com/images/exclusive-deals.jpg',
                    imageAlt: 'Image of exclusive travel deals.',
                },
                {
                    name: 'Holiday Packages',
                    id: '#',
                    imageSrc: 'https://example.com/images/holiday-packages.jpg',
                    imageAlt: 'Image of holiday travel packages.',
                },
            ],
        },
    ],
    pages: [
        { name: 'Company', id: '/' },
        { name: 'Stores', id: '/' },
    ],
}

export default travelServicesNavigation;