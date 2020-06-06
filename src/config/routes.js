const routes = [
    {
        title: "Home Page | Ecommerce Electronic",
        component:  './components/body/home-page/bodyContent',
        path: "/home",
        isProtected: false,
    },
    {
        title: "Home Page | Ecommerce Electronic",
        component: "./components/body/home-page/bodyContent",
        path: "/",
        isProtected: false,
    },
    {
        title: "Hot Deal Page | Ecommerce Electronic",
        component: "./components/body/hot-deal-page/hotDealPage",
        path: "/hot-deals",
        isProtected: false,
    },
    {
        title: "Laptop Page | Ecommerce Electronic",
        component: "./components/body/laptop-page/laptopPage",
        path: "/laptops",
        isProtected: false,
    },
    {
        title: "Accessories Page | Ecommerce Electronic",
        component: "./components/body/accessories-page/accessoriesPage",
        path: "/accessories",
        isProtected: false,
    },
    {
        title: "Cameras Page | Ecommerce Electronic",
        component: "./components/body/cameras-page/camerasPage",
        path: "/cameras",
        isProtected: false,
    },
    {
        title: "Smart Phone Page | Ecommerce Electronic",
        component: "./components/body/smartphones-page/smartphonePage",
        path: "/smartphones",
        isProtected: false,
    },
    {
        title: "Detail Page | Ecommerce Electronic",
        component: "./components/body/detail-products/detail-product/detailProduct",
        path: "/detail/:id",
        isProtected: false,
    },
    {
        title: "Search Page | Ecommerce Electronic",
        component: "./components/body/search-page/searchPage",
        path: "/search",
        isProtected: false,
    },
    {
        title: "Cart Page | Ecommerce Electronic",
        component: "./components/body/cart-page/cartPage",
        path: "/my-cart",
        isProtected: true,
    },
    {
        title: "Checkout Page | Ecommerce Electronic",
        component: "./components/body/checkout-page/checkoutPage",
        path: "/checkout",
        isProtected: true,
    },
    {
        title: "Not Found Page | Ecommerce Electronic",
        component: "./components/body/not-found-page/404NotFound",
        path: "*",
        isProtected: false,
    },
];

export default routes;