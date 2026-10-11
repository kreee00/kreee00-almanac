import type { SiteConfig } from '~/types'

const config: SiteConfig = {
  // Absolute URL to the root of your published site, used for generating links and sitemaps.
  site: 'https://kreee00-almanac.pages.dev',
  // The name of your site, used in the title and for SEO.
  title: 'kreee00\'s almanac',
  // The description of your site, used for SEO and RSS feed.
  description:
    'A personal blog by Mohamad Akram, exploring cybersecurity, tech insights, digital transformation, and reflections on life, politics, and learning.',
  // The author of the site, used in the footer, SEO, and RSS feed.
  author: 'Akram Faisal',
  // The author's personal/portfolio website. Linked from the nav and home banner.
  portfolio: 'https://akramfaisal.org',
  // Keywords for SEO, used in the meta tags.
  tags: [
    'Mohamad Akram',
    'Akram Faisal',
    'kreee00',
    'cybersecurity',
    'CTF writeups',
    'Capture the Flag',
    'digital forensics',
    'malware analysis',
    'open source',
    'cybersecurity blog',
    'tech blog',
    'ethical hacking',
  ],
  // Path to the image used for generating social media previews.
  // Any square image works; it is resized and converted at build time.
  socialCardAvatarImage: './src/content/avatar.jpg',
  // Font imported from @fontsource or elsewhere, used for the entire site.
  // To change this see src/styles/global.css and import a different font.
  font: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  // For pagination, the number of posts to display per page.
  // The homepage will display half this number in the "Latest Posts" section.
  pageSize: 6,
  // Whether Astro should resolve trailing slashes in URLs or not.
  // This value is used in the astro.config.mjs file and in the "Search" component to make sure pagefind links match this setting.
  // It is not recommended to change this, since most links existing in the site currently do not have trailing slashes.
  trailingSlashes: false,
  // The navigation links to display in the header.
  navLinks: [
    {
      name: 'Home',
      url: '/',
    },
    {
      name: 'Archive',
      url: '/posts',
    },
    {
      name: 'About',
      url: 'https://akramfaisal.org',
      external: true,
    },
  ],
  // The theming configuration for the site.
  themes: {
    // The theming mode. One of "single" | "select" | "light-dark-auto".
    mode: 'light-dark-auto',
    // The default theme identifier, used when themeMode is "select" or "light-dark-auto".
    // Make sure this is one of the themes listed in `themes` or "auto" for "light-dark-auto" mode.
    default: 'auto',
    // Shiki themes to bundle with the site.
    // https://expressive-code.com/guides/themes/#using-bundled-themes
    // These will be used to theme the entire site along with syntax highlighting.
    // To use light-dark-auto mode, only include a light and a dark theme in that order.
    include: [
      'github-light',
      'github-dark',
    ],
    // Optional overrides for specific themes to customize colors.
    // Their values can be either a literal color (hex, rgb, hsl) or another theme key.
    // See themeKeys list in src/types.ts for available keys to override and reference.
    overrides: {
      'github-light': {
        background: '#f5f5f7',
        foreground: '#1d1d1f',
        accent: '#00ff41',
        heading1: '#1d1d1f',
        heading2: '#1d1d1f',
        heading3: '#1d1d1f',
        heading4: '#1d1d1f',
        heading5: '#1d1d1f',
        heading6: '#1d1d1f',
        link: '#1d1d1f',
        separator: '#d2d2d7',
        list: '#1d1d1f',
        note: '#00ff41',
        tip: '#22ff11',
        important: '#00ff41',
        caution: '#D97706',
        warning: '#D73A49',
      },
      'github-dark': {
        background: '#111111',
        foreground: '#f5f5f7',
        accent: '#00ff41',
        heading1: '#f5f5f7',
        heading2: '#f5f5f7',
        heading3: '#f5f5f7',
        heading4: '#f5f5f7',
        heading5: '#f5f5f7',
        heading6: '#f5f5f7',
        link: '#f5f5f7',
        separator: '#424245',
        list: '#f5f5f7',
        note: '#00ff41',
        tip: '#22ff11',
        important: '#00ff41',
        caution: '#FBBF24',
        warning: '#F87171',
      },
    },
  },
  // Social links to display in the footer.
  socialLinks: {
    github: 'https://github.com/kreee00',
    // mastodon: 'https://github.com/stelcodes/multiterm-astro',
    email: 'mailto:akram.mfaisal81@gmail.com',
    linkedin: 'https://www.linkedin.com/in/akram-mohdfaisal',
    // bluesky: 'https://github.com/stelcodes/multiterm-astro',
    // twitter: 'https://github.com/stelcodes/multiterm-astro',
    rss: true, // Set to true to include an RSS feed link in the footer
  },
  // Configuration for Giscus comments.
  // To set up Giscus, follow the instructions at https://giscus.app/
  // You'll need a GitHub repository with discussions enabled and the Giscus app installed.
  // Take the values from the generated script tag at https://giscus.app and fill them in here.
  // IMPORTANT: Update giscus.json in the root of the project with your own website URL
  // If you don't want to use Giscus, set this to undefined.
  giscus: {
    repo: 'kreee00/kreee00-almanac',
    repoId: 'R_kgDOQKHjzg',
    category: 'Giscus',
    categoryId: 'DIC_kwDOQKHjzs4CxIdf',
    reactionsEnabled: true, // Enable reactions on post itself
  },
  // These are characters available for the character chat feature.
  // To add your own character, add an image file to the top-level `/public` directory
  // Make sure to compress the image to a web-friendly size (<100kb)
  // Try using the excellent https://squoosh.app web app for creating small webp files
  characters: {
    owl: '/owl.webp',
    unicorn: '/unicorn.webp',
    duck: '/duck.webp',
    penguin_oldmoney: '/penguin-oldmoney.webp',
    penguin_hooded: '/penguin-hooded.webp',
    black_cat: '/black-cat.webp',
  },
}

export default config
