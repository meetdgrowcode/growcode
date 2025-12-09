export function Footer() {
  const footerLinks = [
    {
      title: "Resources",
      links: [
        { name: "Flowbite", url: "https://flowbite.com/" },
        { name: "Tailwind CSS", url: "https://tailwindcss.com/" },
      ],
    },
    {
      title: "Follow us",
      links: [
        { name: "Github", url: "https://github.com/themesberg/flowbite" },
        { name: "Discord", url: "https://discord.gg/4eeurUVvTy" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", url: "#" },
        { name: "Terms & Conditions", url: "#" },
      ],
    },
  ];

  return (
    <footer className="bg-neutral-primary-soft">
      <div className="mx-auto w-full max-w-screen p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-evenly items-center">
          {/* MID-SIZE RESPONSIVE LOGO */}
          <div className="mb-6 md:mb-0">
            <a href="/" className="flex items-center justify-center group">
              <img
                src="/growcode2.png"
                alt="Growcode Solution"
                className="
                  h-10     /* Mobile */
                  sm:h-11  /* Larger phones */
                  md:h-12  /* Tablets */
                  lg:h-14  /* Desktop */
                  w-auto 
                  object-contain 
                  transition-transform 
                  duration-300 
                  group-hover:scale-105
                "
                loading="lazy"
              />
            </a>
          </div>

          {/* LINK GRID */}
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            {footerLinks.map((section, index) => (
              <div key={index}>
                <h2 className="mb-6 text-sm font-semibold text-heading uppercase">
                  {section.title}
                </h2>

                <ul className="text-body font-medium">
                  {section.links.map((link, i) => (
                    <li key={i} className="mb-4">
                      <a href={link.url} className="hover:underline">
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <hr className="my-6 border-default sm:mx-auto lg:my-8" />

        {/* BOTTOM SECTION */}
        <div className="sm:flex sm:items-center sm:justify-evenly">
          <span className="text-sm text-body sm:text-center">
            © 2025 Growcode Solution. All Rights Reserved.
          </span>

          {/* SOCIAL ICONS */}
          <div className="flex gap-6 mt-4 sm:justify-center sm:mt-0">
            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/company/growcode-solution-pvt-ltd/posts/?feedView=all"
              className="text-body hover:text-heading"
              aria-label="LinkedIn"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037..." />
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/growcodesolutions/"
              className="text-body hover:text-heading"
              aria-label="Instagram"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C8.74 0 8.333.015 7.053.072..." />
              </svg>
            </a>

            {/* GitHub */}
            <a
              href="#"
              className="text-body hover:text-heading"
              aria-label="GitHub"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12..." />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
