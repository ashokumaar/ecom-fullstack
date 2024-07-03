const booksNavigation = {
    categories: [
        {
            id: 'genres',
            name: 'Genres',
            sections: [
                {
                    id:'software engineering',
                    name:'Software Engineering',
                    items:[
                        {name:'java', id:'java'},
                        {name:'internet', id:'internet'},
                        {name:'microsoft .net', id:'microsoft .net'},
                        {name:'web development', id:'web development'},
                        {name:'programming', id:'programming'},
                        {name:'business', id:'business'},
                        {name:'client-server', id:'client-server'},
                        {name:'microsoft', id:'microsoft'},
                        {name:'powerbuilder', id:'powerbuilder'},
                        {name:'networking', id:'networking'},
                        {name:'theory', id:'theory'},
                        {name:'python', id:'python'},
                        {name:'perl', id:'perl'},
                        {name:'mobile technology', id:'mobile technology'},
                        {name:'object-oriented programming', id:'object-oriented programming'},
                        // {name:'', id:''},
                    ]
                },
                {
                    id: 'fiction',
                    name: 'Fiction',
                    items: [
                        { name: 'Literary Fiction', id: 'literary_fiction' },
                        { name: 'Science Fiction', id: 'science_fiction' },
                        { name: 'Fantasy', id: 'fantasy' },
                        { name: 'Mystery & Thriller', id: 'mystery_thriller' },
                        { name: 'Romance', id: 'romance' },
                        { name: 'Historical Fiction', id: 'historical_fiction' },
                    ],
                },
                {
                    id: 'non_fiction',
                    name: 'Non Fiction',
                    items: [
                        { name: 'Biographies', id: 'biographies' },
                        { name: 'Self-Help', id: 'self_help' },
                        { name: 'Cookbooks', id: 'cookbooks' },
                        { name: 'Health & Wellness', id: 'health_wellness' },
                        { name: 'Business', id: 'business' },
                        { name: 'Travel', id: 'travel' },
                    ],
                },
                {
                    id: 'children',
                    name: 'Childrens Books',
                    items: [
                        { name: 'Picture Books', id: 'picture_books' },
                        { name: 'Early Readers', id: 'early_readers' },
                        { name: 'Middle Grade', id: 'middle_grade' },
                        { name: 'Young Adult', id: 'young_adult' },
                    ],
                },
            ],
            featured: [
                {
                    name: 'Award-Winning Fiction',
                    id: '#',
                    imageSrc: 'https://example.com/images/award-winning-fiction.jpg',
                    imageAlt: 'Image of award-winning fiction books.',
                },
                {
                    name: 'Best Non-Fiction',
                    id: '#',
                    imageSrc: 'https://example.com/images/best-non-fiction.jpg',
                    imageAlt: 'Image of best non-fiction books.',
                },
            ],
        },
        // {
        //     id: 'bestsellers',
        //     name: 'Bestsellers',
        //     sections: [
        //         {
        //             id: 'current_bestsellers',
        //             name: 'Current Bestsellers',
        //             items: [
        //                 { name: 'Fiction Bestsellers', id: 'fiction_bestsellers' },
        //                 { name: 'Non-Fiction Bestsellers', id: 'non_fiction_bestsellers' },
        //                 { name: 'Childrens Bestsellers', id: 'childrens_bestsellers' },
        //             ],
        //         },
        //         {
        //             id: 'classic_bestsellers',
        //             name: 'Classic Bestsellers',
        //             items: [
        //                 { name: 'To Kill a Mockingbird', id: 'to_kill_a_mockingbird' },
        //                 { name: '1984 by George Orwell', id: '1984_george_orwell' },
        //                 { name: 'The Great Gatsby', id: 'the_great_gatsby' },
        //                 { name: 'Pride and Prejudice', id: 'pride_and_prejudice' },
        //             ],
        //         },
        //     ],
        //     featured: [
        //         {
        //             name: 'Top Sellers This Week',
        //             id: '#',
        //             imageSrc: 'https://example.com/images/top-sellers.jpg',
        //             imageAlt: 'Image of top-selling books this week.',
        //         },
        //         {
        //             name: 'All-Time Bestsellers',
        //             id: '#',
        //             imageSrc: 'https://example.com/images/all-time-bestsellers.jpg',
        //             imageAlt: 'Image of all-time best-selling books.',
        //         },
        //     ],
        // },
        // {
        //     id: 'authors',
        //     name: 'Authors',
        //     sections: [
        //         {
        //             id: 'popular_authors',
        //             name: 'Popular Authors',
        //             items: [
        //                 { name: 'J.K. Rowling', id: 'jk_rowling' },
        //                 { name: 'Stephen King', id: 'stephen_king' },
        //                 { name: 'George R.R. Martin', id: 'george_rr_martin' },
        //                 { name: 'J.R.R. Tolkien', id: 'jrr_tolkien' },
        //                 { name: 'Agatha Christie', id: 'agatha_christie' },
        //             ],
        //         },
        //         {
        //             id: 'new_authors',
        //             name: 'New & Emerging Authors',
        //             items: [
        //                 { name: 'Sally Rooney', id: 'sally_rooney' },
        //                 { name: 'R.F. Kuang', id: 'rf_kuang' },
        //                 { name: 'Brandon Sanderson', id: 'brandon_sanderson' },
        //                 { name: 'Madeline Miller', id: 'madeline_miller' },
        //             ],
        //         },
        //         {
        //             id: 'classic_authors',
        //             name: 'Classic Authors',
        //             items: [
        //                 { name: 'William Shakespeare', id: 'william_shakespeare' },
        //                 { name: 'Jane Austen', id: 'jane_austen' },
        //                 { name: 'Mark Twain', id: 'mark_twain' },
        //                 { name: 'Charles Dickens', id: 'charles_dickens' },
        //                 { name: 'Leo Tolstoy', id: 'leo_tolstoy' },
        //             ],
        //         },
        //     ],
        //     featured: [
        //         {
        //             name: 'Featured Authors',
        //             id: '#',
        //             imageSrc: 'https://example.com/images/featured-authors.jpg',
        //             imageAlt: 'Image of featured authors.',
        //         },
        //         {
        //             name: 'Rising Stars',
        //             id: '#',
        //             imageSrc: 'https://example.com/images/rising-stars.jpg',
        //             imageAlt: 'Image of rising star authors.',
        //         },
        //     ],
        // },
    ],
    pages: [
        { name: 'Company', id: '/' },
        { name: 'Stores', id: '/' },
    ],
}
export default booksNavigation;