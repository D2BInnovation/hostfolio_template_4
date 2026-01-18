# HostFolio Template 4 - Next.js Chakra UI

A professional and accessible portfolio built with Next.js 15 and Chakra UI component library.

## 🎨 Design Features

- **Chakra UI Components**: Pre-built accessible components
- **Theme Switching**: Light/Dark mode with custom themes
- **Smooth Animations**: Chakra Motion for fluid transitions
- **Responsive Grid**: Flexible layouts for all devices
- **Accessibility First**: WCAG compliant components
- **Clean Typography**: Professional font system

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **UI Library**: Chakra UI v3
- **Styling**: Emotion (CSS-in-JS)
- **Animations**: Framer Motion (via Chakra)
- **Icons**: Chakra Icons + Lucide React

## 📦 Installation

```bash
# Create Next.js app
npx create-next-app@latest hostfolio_template_4 --typescript --app

# Navigate to directory
cd hostfolio_template_4

# Install Chakra UI and dependencies
npm install @chakra-ui/react @chakra-ui/next-js @emotion/react @emotion/styled framer-motion lucide-react

# Run development server
npm run dev
```

## 📁 Project Structure

```
hostfolio_template_4/
├── app/
│   ├── layout.tsx          # Root layout with ChakraProvider
│   ├── page.tsx            # Home page
│   └── providers.tsx       # Chakra providers setup
├── components/
│   ├── Hero.tsx            # Hero with Chakra components
│   ├── About.tsx           # About with Card, Badge
│   ├── Experience.tsx      # Timeline with Stepper
│   ├── Projects.tsx        # Grid with Image, Text
│   ├── Contact.tsx         # Form with Input, Button
│   └── Navbar.tsx          # Responsive navigation
├── theme/
│   ├── index.ts            # Custom theme
│   ├── colors.ts           # Color palette
│   ├── components.ts       # Component overrides
│   └── fonts.ts            # Typography settings
├── public/
│   └── data.json           # Portfolio data
└── package.json
```

## 🎨 Customization

### Custom Theme

Create your theme in `theme/index.ts`:

```typescript
import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    brand: {
      50: '#e6f7ff',
      100: '#bae7ff',
      // ... more shades
      900: '#003a8c',
    },
  },
  fonts: {
    heading: 'Inter, sans-serif',
    body: 'Inter, sans-serif',
  },
  components: {
    Button: {
      // Custom button styles
    },
    Card: {
      // Custom card styles
    },
  },
});

export default theme;
```

### Update Data

Edit `public/data.json`:

```json
{
  "personal": {
    "name": "Your Name",
    "title": "Your Title"
  }
}
```

## 🌟 Chakra UI Components Used

### Layout Components
- `Box`, `Container`, `Stack`, `Grid`, `Flex`
- `SimpleGrid`, `Center`, `VStack`, `HStack`

### Typography
- `Heading`, `Text`, `Code`, `Link`

### Forms
- `FormControl`, `Input`, `Textarea`, `Button`
- `FormLabel`, `FormErrorMessage`

### Data Display
- `Card`, `Badge`, `Tag`, `Avatar`
- `Stat`, `Progress`, `Divider`

### Feedback
- `Alert`, `Spinner`, `Toast`, `Modal`

### Overlay
- `Menu`, `Drawer`, `Tooltip`, `Popover`

## 🎯 Theme Features

### Color Modes
```typescript
const { colorMode, toggleColorMode } = useColorMode();

// Colors adjust automatically
bg={useColorModeValue('white', 'gray.800')}
color={useColorModeValue('gray.800', 'white')}
```

### Responsive Values
```typescript
<Box
  width={{ base: '100%', md: '50%', lg: '33%' }}
  padding={{ base: 4, md: 6, lg: 8 }}
/>
```

### Custom Variants
```typescript
<Button
  variant="solid"
  colorScheme="brand"
  size="lg"
/>
```

## 🔧 Environment Variables

```env
NEXT_PUBLIC_SITE_URL=https://yoursite.com
NEXT_PUBLIC_FORM_ENDPOINT=your-form-endpoint
```

## 🚀 Deployment

### Vercel

```bash
vercel
```

### Custom Server

```bash
npm run build
npm run start
```

## ⚡ Performance Features

- Server-side rendering with Next.js
- Automatic code splitting
- Image optimization
- Font optimization
- Tree-shaking with Chakra UI

## 🎨 Animations

Chakra Motion provides smooth transitions:

```typescript
import { motion } from 'framer-motion';
import { Box } from '@chakra-ui/react';

const MotionBox = motion(Box);

<MotionBox
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  Content
</MotionBox>
```

## 📱 Responsive Breakpoints

- `base`: 0em (0px)
- `sm`: 30em (480px)
- `md`: 48em (768px)
- `lg`: 62em (992px)
- `xl`: 80em (1280px)
- `2xl`: 96em (1536px)

## 🌐 Accessibility

- ARIA labels on all interactive elements
- Keyboard navigation support
- Focus management
- Screen reader optimized
- WCAG 2.1 Level AA compliance

## 📚 Resources

- [Chakra UI Docs](https://chakra-ui.com/)
- [Next.js Docs](https://nextjs.org/docs)
- [Framer Motion](https://www.framer.com/motion/)

---

Built with ❤️ for HostFolio
