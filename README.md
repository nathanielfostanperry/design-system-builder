# Design System Color Generator

A modern web application that generates complete color scales for design systems based on a single base color.

## Features

- Input a hex color value to generate a full color scale
- Scale includes steps: 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950
- Intelligent color scale generation accounting for saturation and lightness
- Copy any color value to clipboard with a single click
- Visual color chips with accessible text display

## Technology Stack

- Next.js
- React
- TypeScript
- Tailwind CSS

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

The color generator uses the HSL (Hue, Saturation, Lightness) color model to create a balanced and visually appealing color scale. The algorithm:

1. Converts the base hex color to HSL
2. Maintains the hue of the original color
3. Adjusts saturation based on original saturation and target brightness
4. Sets different lightness values for each step (50-950)
5. Converts back to hex for display and usage

## Using Generated Colors

The generated color scale is designed to be used in design systems, providing a range of shades for various UI components like:

- Primary and secondary button states
- Text colors
- Background colors
- Border colors
- Alert and notification states

## License

This project is licensed under the MIT License - see the LICENSE file for details.
