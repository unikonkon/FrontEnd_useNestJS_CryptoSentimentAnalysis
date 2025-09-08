TailwindCSS สไตล์ 8-bit (โทนพาเล็ตแบบเกมยุคเก่า + ปุ่ม/การ์ดมุมเหลี่ยม + เอฟเฟกต์พิกเซล) พร้อมใช้งานกับ Next.js/
ใช้พาเล็ตแบบ PICO-8 (16 สี) + คอมโพเนนต์ 8-bit (ปุ่ม/การ์ด/ป้าย) + ยูทิลิตี้พิเศษ (pixelated, scanlines, pixel-corners)
โดยที่ เคล็ดลับให้ “ฟีล 8-bit” ชัดขึ้น
ใช้คลาส .pixelated กับ <img>/<video>/แผนที่ไทล์ เพื่อคมแบบพิกเซล
ใช้ .crt กับกล่อง/พื้นหลัง เพื่อให้เกิด scanlines เบา ๆ
ปรับตัวแปร --pc (เช่นใส่ style="--pc:12px") เพื่อเปลี่ยนขนาด “บากมุม”
ยึดพาเล็ต p8 เป็นหลัก (เช่น bg-p8-1, text-p8-7, border-p8-0, bg-primary)
ฟอนต์: ใช้ VT323 สำหรับเนื้อความเพื่ออ่านง่าย, Press Start 2P สำหรับหัวข้อ/ปุ่ม

# 🎮 8-Bit Theme Guide

This project now features a complete 8-bit retro gaming theme with PICO-8 color palette and pixel-perfect styling.

## 🎨 Color Palette (PICO-8)

The theme uses the classic PICO-8 16-color palette:

| Color | Class | Hex | Usage |
|-------|-------|-----|-------|
| Black | `p8-0` | `#000000` | Background, text |
| Dark Blue | `p8-1` | `#1d2b53` | Cards, panels |
| Dark Purple | `p8-2` | `#7e2553` | Gradients |
| Dark Green | `p8-3` | `#008751` | Success states |
| Brown | `p8-4` | `#ab5236` | Warning accents |
| Dark Grey | `p8-5` | `#5f574f` | Panel backgrounds |
| Light Grey | `p8-6` | `#c2c3c7` | Borders, muted text |
| White | `p8-7` | `#fff1e8` | Primary text |
| Red | `p8-8` | `#ff004d` | Error states |
| Orange | `p8-9` | `#ffa300` | Warning states |
| Yellow | `p8-10` | `#ffec27` | Accent, highlights |
| Green | `p8-11` | `#00e436` | Success states |
| Blue | `p8-12` | `#29adff` | Primary actions |
| Indigo | `p8-13` | `#83769c` | Info states |
| Pink | `p8-14` | `#ff77a8` | Secondary actions |
| Peach | `p8-15` | `#ffccaa` | Light accents |

## 🔤 Typography

### Fonts
- **VT323**: Body text, readable content
- **Press Start 2P**: Headings, buttons, titles

### Font Classes
- `font-pixel-body`: VT323 font
- `font-pixel-title`: Press Start 2P font

### Font Sizes
- `text-pixel-xs`: 10px
- `text-pixel-sm`: 12px
- `text-pixel-base`: 16px
- `text-pixel-lg`: 20px
- `text-pixel-xl`: 24px
- `text-pixel-2xl`: 32px
- `text-pixel-3xl`: 48px

## 🎯 Components

### Buttons
```jsx
// Primary button
<button className="btn-pixel">Click Me</button>

// Secondary button
<button className="btn-pixel-secondary">Secondary</button>

// Success button
<button className="btn-pixel-success">Success</button>

// Danger button
<button className="btn-pixel-danger">Danger</button>
```

### Cards
```jsx
// Standard card
<div className="card-pixel">
  <h3>Card Title</h3>
  <p>Card content...</p>
</div>
```

### Panels
```jsx
// Inset panel
<div className="panel-pixel">
  <p>Panel content...</p>
</div>
```

### Inputs
```jsx
// Text input
<input className="input-pixel" type="text" placeholder="Enter text..." />
```

### Badges
```jsx
// Standard badge
<span className="badge-pixel">Label</span>

// Colored badge
<span className="badge-pixel bg-p8-12">Blue Badge</span>
```

### Progress Bars
```jsx
<div className="progress-pixel">
  <div className="progress-bar" style={{width: '70%'}}></div>
</div>
```

### Toasts/Notifications
```jsx
// Error toast
<div className="toast-pixel error">Error message</div>

// Success toast
<div className="toast-pixel success">Success message</div>

// Warning toast
<div className="toast-pixel warning">Warning message</div>
```

## ✨ Special Effects

### Pixelated Images
```jsx
<img src="image.jpg" className="pixelated" alt="Pixelated image" />
```

### CRT Scanlines Effect
```jsx
<div className="crt">
  <p>Content with scanlines effect</p>
</div>
```

### Pixel Corners
```jsx
// Default 8px corners
<div className="pixel-corners">
  <p>Content with pixel corners</p>
</div>

// Custom corner size
<div className="pixel-corners" style={{"--pc": "16px"} as React.CSSProperties}>
  <p>Content with 16px pixel corners</p>
</div>
```

### Animations
```jsx
// Blinking text
<p className="animate-pixel-blink">Blinking text</p>

// Bouncing element
<div className="animate-pixel-bounce">Bouncing element</div>

// Pulsing element
<div className="animate-pixel-pulse">Pulsing element</div>

// Glitch effect
<div className="glitch">Glitchy element</div>
```

## 🎮 Layout Examples

### Header
```jsx
<header className="bg-p8-1 border-b-4 border-p8-6 pixel-corners" 
        style={{"--pc": "12px"} as React.CSSProperties}>
  <h1 className="font-pixel-title text-pixel-2xl text-p8-10">
    GAME TITLE
  </h1>
</header>
```

### Article Card
```jsx
<div className="card-pixel analysis-card hover:animate-pixel-pulse">
  <div className="flex items-center justify-between mb-3">
    <span className="badge-pixel bg-p8-12">Source</span>
    <span className="font-pixel-body text-pixel-xs text-p8-6">Date</span>
  </div>
  
  <h3 className="font-pixel-title text-pixel-sm text-p8-7 mb-3 line-clamp-2">
    Article Title
  </h3>
  
  <p className="font-pixel-body text-pixel-sm text-p8-6 mb-4 line-clamp-3">
    Article description...
  </p>
  
  <button className="btn-pixel w-full">Read More</button>
</div>
```

### Loading Spinner
```jsx
<div className="loading-spinner mx-auto mb-4"></div>
<p className="font-pixel-body text-pixel-lg animate-pixel-blink">
  Loading...
</p>
```

## 🛠 Customization

### Custom Colors
You can extend the color palette in `tailwind.config.ts`:

```typescript
colors: {
  // Add custom colors
  'custom-purple': '#663399',
  'custom-gold': '#ffd700',
}
```

### Custom Pixel Corner Sizes
Use CSS custom properties:

```jsx
<div className="pixel-corners" style={{"--pc": "20px"} as React.CSSProperties}>
  Large pixel corners
</div>
```

### Custom Components
Create your own 8-bit styled components using the base utilities:

```css
.my-custom-component {
  @apply bg-p8-1 border-2 border-p8-6 font-pixel-body text-p8-7;
  box-shadow: 4px 4px 0px 0px rgba(0,0,0,0.8);
}
```

## 📱 Responsive Design

The theme includes responsive considerations:

- Font sizes scale down on mobile
- Button padding adjusts for touch targets
- Scrollbar styling adapts to screen size

## 🎯 Best Practices

1. **Use semantic color classes**: Prefer `bg-primary`, `text-success` over specific palette colors when possible
2. **Combine effects wisely**: Don't overuse animations and effects
3. **Maintain readability**: Ensure sufficient contrast for text
4. **Test on different devices**: The pixelated effects may appear differently on various screens
5. **Use appropriate fonts**: VT323 for body text, Press Start 2P for headings/UI elements

## 🔧 Development Tips

1. The global CRT scanlines effect is applied to the body - disable it by removing the `crt` class if needed
2. All images automatically get pixelated rendering - use the `pixelated` class explicitly for control
3. The theme works with both light and dark mode preferences
4. Custom CSS properties are used for dynamic values (like `--pc` for pixel corners)

Enjoy your retro gaming aesthetic! 🎮✨
