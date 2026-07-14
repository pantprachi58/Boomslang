const navItems = [
  {
    label: "Home",
    href: "/",
  },
   {
    label: "All Product",
    href: "/shop",
  },
  {
    label: "Shop",
    href: "/shop",
    children: [
      {
        label: "Goku Gainz",
        href: "/shop/goku-gainz",
      },
      {
        label: "Strycnnine Pre-Workout",
        href: "/shop/strycnnine",
      },
    ],
  },
  {
    label: "About Us",
    href: "/about",
  },
  {
    label: "FAQs",
    href: "/faqs",
  },
];

export default navItems;
