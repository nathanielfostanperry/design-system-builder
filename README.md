# Design System Color Generator

A modern web application that generates complete color scales for design systems based on user-selected colors.

![Design System Generator](./screenshot.png)

## Features

- **Primary Color Scale**: Input a hex color to generate a full range of shades (50-950)
- **Accent Color Scale**: Add a complementary color for your design system
- **Smart Neutral Colors**: Automatically generates neutral/grey colors derived from your primary color
- **Live Preview**: See how your colors work together in real UI components like buttons, cards, and typography
- **Code Export**: Export your color system as CSS variables, SCSS variables, or Tailwind config

## Why Smart Neutrals?

Most design systems use generic grey colors, but this tool creates neutral colors with a subtle hint of your brand color. This creates a more cohesive design system where even the "grey" colors have a subtle relationship to your brand.

## Technology Stack

- Next.js with App Router
- React with TypeScript
- Tailwind CSS
- Color manipulation using HSL color model

## Getting Started

### Prerequisites

- Node.js 16.8 or later
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/design-system-builder.git
cd design-system-builder
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Run the development server

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## How It Works

The color generator uses the HSL (Hue, Saturation, Lightness) color model to create balanced color scales:

1. **For Primary & Accent Colors**:

   - Maintains the hue of the original color
   - Adjusts saturation based on lightness (lighter colors have lower saturation)
   - Sets different lightness values for each step (50-950)

2. **For Neutral Colors**:
   - Takes the hue from the primary color with a slight shift
   - Significantly reduces saturation to create "near-greys"
   - Maintains a hint of the primary color's character

## Using Generated Colors

The generated color scales are designed to be used in design systems for various UI components:

- Primary colors for main actions and branding
- Accent colors for secondary actions and highlights
- Neutral colors for text, backgrounds, and borders

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
