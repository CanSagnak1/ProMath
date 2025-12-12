# 🧮 MathPro Calculator

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

**Gelişmiş Matematiksel Hesap Makinesi Web Uygulaması**

[Özellikler](#-özellikler) •
[Kurulum](#-kurulum) •
[Kullanım](#-kullanım) •
[Teknik Detaylar](#-teknik-detaylar) •
[API](#-api-referansı)

</div>

---

## 📋 İçindekiler

- [Genel Bakış](#-genel-bakış)
- [Özellikler](#-özellikler)
- [Kurulum](#-kurulum)
- [Kullanım](#-kullanım)
- [Hesap Makinesi Modları](#-hesap-makinesi-modları)
- [Teknik Detaylar](#-teknik-detaylar)
- [Mimari](#-mimari)
- [API Referansı](#-api-referansı)
- [Performans](#-performans)
- [Tarayıcı Desteği](#-tarayıcı-desteği)
- [Katkıda Bulunma](#-katkıda-bulunma)
- [Lisans](#-lisans)

---

## 🎯 Genel Bakış

**MathPro Calculator**, modern web teknolojileri kullanılarak geliştirilmiş, profesyonel ve ileri düzey matematiksel işlemleri destekleyen bir hesap makinesi uygulamasıdır. Temel aritmetik işlemlerden ileri düzey bilimsel hesaplamalara, matris işlemlerinden denklem çözücüye kadar geniş bir fonksiyon yelpazesi sunar.

### ✨ Temel Özellikler

- 🎨 **Premium Dark Theme** - Glassmorphism efektler ile modern arayüz
- 🧮 **5 Farklı Hesaplama Modu** - Temel, Bilimsel, Matris, Çözücü, Dönüştürücü
- ⚡ **Yüksek Performans** - Vanilla JavaScript ile optimize edilmiş
- 📱 **Fully Responsive** - Tüm cihazlarda mükemmel çalışır
- ⌨️ **Klavye Desteği** - Hızlı kullanım için keyboard shortcuts
- 💾 **Persistent Storage** - LocalStorage ile geçmiş ve ayar kaydetme
- 🎭 **Smooth Animations** - Hardware-accelerated CSS animations

---

## 🚀 Özellikler

### Hesaplama Yetenekleri

#### 🔢 Temel Mod
- Aritmetik işlemler (toplama, çıkarma, çarpma, bölme)
- Ondalık sayı desteği
- Akıllı parantez sistemi
- Yüzde hesaplamaları
- İşlem önceliği (PEMDAS)

#### 🔬 Bilimsel Mod
- **Trigonometrik Fonksiyonlar**: sin, cos, tan, asin, acos, atan
- **Açı Birimleri**: Derece (DEG) ve Radyan (RAD) desteği
- **Logaritmik Fonksiyonlar**: log (taban 10), ln (doğal logaritma)
- **Üstel Fonksiyonlar**: eˣ, xʸ, x²
- **Kök Fonksiyonlar**: √x (karekök)
- **Faktöriyel**: n!
- **Sabitler**: π (pi), e (euler sabiti)

#### 🔳 Matris Modu
- Determinant hesaplama
- Ters matris (inverse)
- Transpose işlemi
- Matris toplama ve çıkarma
- Matris çarpma
- JSON formatında matris girişi

#### 🧩 Çözücü Modu
- **Doğrusal Denklem**: ax + b = c formatında
- **İkinci Derece Denklem**: ax² + bx + c = 0 (gerçel ve kompleks kökler)
- **Türev Hesaplama**: Sembolik türev alma

#### 🔄 Dönüştürücü Modu
- **Uzunluk**: Meter, Kilometer, Mile, Foot, Inch, vb.
- **Kütle**: Kilogram, Gram, Pound, Ounce, vb.
- **Sıcaklık**: Celsius, Fahrenheit, Kelvin
- **Zaman**: Second, Minute, Hour, Day, Week, Year

### Kullanıcı Arayüzü

#### 🎨 Tasarım Sistemi
- **CSS Custom Properties** - Tutarlı design tokens
- **Glassmorphism Effects** - Blur ve transparency
- **Gradient Backgrounds** - Animated radial gradients
- **Color Palette**:
  - Primary: `#0a0e27` (Deep Navy)
  - Accent: `#6366f1` → `#8b5cf6` (Indigo to Purple)
  - Text: `#f1f5f9` (Soft White)

#### ✨ Animasyonlar
- **Entrance Animations**: Fade-in, Slide-down effects
- **Button Interactions**: Ripple, Scale, Glow effects
- **Panel Transitions**: Smooth sliding animations
- **Number Display**: Cascade effect
- **Background**: Subtle gradient animation (15s cycle)

#### 🎯 Kullanıcı Deneyimi
- **Geçmiş Yönetimi**:
  - Son 50 hesaplama otomatik kaydedilir
  - Tek tıkla geçmişten yükleme
  - Geçmişi temizleme
  
- **Ayarlar**:
  - Hassasiyet (0-15 ondalık basamak)
  - Açı birimi (DEG/RAD)
  - Ses efektleri toggle

- **Sidebar Navigation**:
  - Geçmiş sidebar (sağdan kayarak)
  - Ayarlar sidebar
  - Overlay ile focus

---

## 📦 Kurulum

### Gereksinimler

- Modern web tarayıcısı (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- JavaScript etkin
- İnternet bağlantısı (Math.js CDN için)

### Hızlı Başlangıç

1. **Projeyi İndirin**
```bash
git clone https://github.com/CanSagnak/promath.git
cd mathpro-calculator
```

2. **Dosyayı Açın**
```bash
open index.html
```

veya

Tarayıcınızda `index.html` dosyasını açın.

### Offline Kullanım

Math.js kütüphanesini lokal olarak kullanmak için:

1. Math.js'i indirin:
```bash
npm install mathjs
```

2. `index.html` içindeki CDN linkini güncelleyin:
```html
<!-- CDN yerine -->
<script src="node_modules/mathjs/lib/browser/math.js"></script>
```

### Yapı

```
mathpro-calculator/
├── index.html          # Ana HTML dosyası
├── style.css           # Stil dosyası
├── script.js           # JavaScript mantığı
└── README.md           # Dokümantasyon
```

---

## 💻 Kullanım

### Temel Kullanım

1. **Hesaplama Yapma**:
   - Butonları tıklayarak veya klavyeden giriş yapın
   - `=` veya `Enter` ile hesaplayın
   - Sonuç otomatik görüntülenir

2. **Mod Değiştirme**:
   - Üst sekmeleri kullanarak mod değiştirin
   - Her mod özel işlevlere sahiptir

3. **Geçmiş Görüntüleme**:
   - Sağ üstteki saat ikonuna tıklayın
   - Geçmiş hesaplamalara göz atın
   - İlgili sonuca tıklayarak yükleyin

### Klavye Kısayolları

| Tuş | İşlev |
|-----|-------|
| `0-9` | Rakam girişi |
| `+` `-` `*` `/` | Operatörler |
| `.` | Ondalık nokta |
| `Enter` | Hesaplama |
| `Backspace` | Silme |
| `Escape` | Temizleme |
| `(` `)` | Parantezler |

### Örnekler

#### Temel Hesaplamalar
```
5 + 3 × 2 = 11
(5 + 3) × 2 = 16
100 ÷ 4 = 25
```

#### Bilimsel Hesaplamalar
```
sin(30) = 0.5        (DEG modunda)
log(100) = 2
5! = 120
π × 2 = 6.283...
√16 = 4
2^8 = 256
```

#### Matris İşlemleri
```javascript
// Matris A
[[1, 2], [3, 4]]

// Determinant
-2

// Ters Matris
[[-2, 1], [1.5, -0.5]]
```

#### Denklem Çözme
```
// Doğrusal
2*x + 5 = 15  →  x = 5

// İkinci Derece
x² - 5x + 6 = 0  →  x₁ = 3, x₂ = 2

// Türev
d/dx(x² + 2x + 1) = 2x + 2
```

---

## 🛠️ Teknik Detaylar

### Teknoloji Yığını

| Kategori | Teknoloji | Versiyon |
|----------|-----------|----------|
| Markup | HTML5 | - |
| Styling | CSS3 | - |
| Scripting | Vanilla JavaScript | ES6+ |
| Math Engine | Math.js | 12.2.1 |

### CSS Mimarisi

#### Custom Properties Sistemi
```css
:root {
  --color-bg-primary: #0a0e27;
  --color-accent-primary: #6366f1;
  --spacing-md: 1rem;
  --font-family: 'Inter', sans-serif;
  --transition-base: 250ms ease;
}
```

#### Temel Componentler
- **Layout**: Flexbox & Grid
- **Spacing**: 6-step scale (xs → 2xl)
- **Typography**: Inter font family, 7 size scales
- **Colors**: Semantic naming convention
- **Radius**: 4-step scale
- **Transitions**: 3-speed system

### JavaScript Mimarisi

#### State Management
```javascript
const state = {
  currentExpression: '0',
  currentResult: '',
  currentMode: 'basic',
  angleMode: 'deg',
  precision: 10,
  history: [],
  parenthesesOpen: 0
};
```

#### Core Functions

**Expression Evaluation**
```javascript
function evaluateExpression(expr) {
  // Symbol replacement (π → pi, × → *)
  // Angle mode handling (DEG/RAD conversion)
  // Factorial processing
  // Math.js evaluation
  // Result formatting
}
```

**Matrix Operations**
```javascript
function handleMatrixOperation(operation) {
  // Parse JSON input
  // Execute operation (det, inv, transpose, etc.)
  // Format and display result
}
```

**Unit Conversion**
```javascript
function convertUnits() {
  // Get conversion factors
  // Handle special cases (temperature)
  // Calculate and display result
}
```

#### Event System
- **Delegation**: Event delegation for buttons
- **Keyboard**: Global keyboard listener
- **State Updates**: Reactive display updates
- **Storage**: Auto-save to localStorage

### Data Structures

#### History Item
```javascript
{
  expression: String,   // "2 + 2"
  result: String,       // "4"
  timestamp: Number     // Unix timestamp
}
```

#### Unit Definitions
```javascript
{
  length: {
    meter: 1,
    kilometer: 1000,
    // ...
  },
  temperature: {
    celsius: { offset: 0, factor: 1 },
    // Special handling
  }
}
```

---

## 🏗️ Mimari

### Component Hiyerarşisi

```
App
├── Header
│   ├── Logo
│   └── Actions (History, Settings buttons)
├── Calculator Card
│   ├── Mode Tabs
│   ├── Display Container
│   │   ├── Expression Display
│   │   └── Result Display
│   └── Panels
│       ├── Basic Panel
│       ├── Scientific Panel
│       ├── Matrix Panel
│       ├── Solver Panel
│       └── Converter Panel
├── Sidebars
│   ├── History Sidebar
│   └── Settings Sidebar
└── Overlay
```

### Data Flow

```
User Input → Event Handler → State Update → Display Render
                                  ↓
                          LocalStorage Sync
```

### Module Pattern

```javascript
// State Management
const state = { ... };

// DOM Cache
const elements = { ... };

// Initialization
function init() { ... }

// Event Handlers
function handleButtonClick() { ... }

// Business Logic
function evaluateExpression() { ... }

// Utility Functions
function formatResult() { ... }
```

---

## 📚 API Referansı

### Core Functions

#### `evaluateExpression(expr: string): number`
Matematiksel ifadeyi değerlendirir.

**Parameters:**
- `expr` (string): Matematiksel ifade

**Returns:**
- `number`: Hesaplama sonucu

**Throws:**
- `Error`: Geçersiz ifade durumunda

**Example:**
```javascript
evaluateExpression("2 + 2")  // 4
evaluateExpression("sin(30)") // 0.5 (DEG mode)
```

#### `calculateResult(): void`
Mevcut ifadeyi hesaplar ve gösterir.

**Side Effects:**
- State güncelleme
- Display render
- History ekleme

#### `switchMode(mode: string): void`
Hesap makinesi modunu değiştirir.

**Parameters:**
- `mode` (string): 'basic' | 'scientific' | 'matrix' | 'solver' | 'converter'

**Example:**
```javascript
switchMode('scientific')
```

### Matrix Operations

#### `handleMatrixOperation(operation: string): void`
Matris işlemi gerçekleştirir.

**Parameters:**
- `operation` (string): 'determinant' | 'inverse' | 'transpose' | 'add' | 'subtract' | 'multiply'

**Example:**
```javascript
// matrixA = [[1,2],[3,4]]
handleMatrixOperation('determinant')  // -2
```

### Solver Functions

#### `solveLinearEquation(): void`
Doğrusal denklemi çözer.

**Input:** `linearEq` element value

**Example:**
```javascript
// Input: "2*x + 5 = 15"
// Output: "x = 5"
```

#### `solveQuadraticEquation(): void`
İkinci derece denklemi çözer.

**Input:** `quadA`, `quadB`, `quadC` element values

**Example:**
```javascript
// Input: a=1, b=-5, c=6
// Output: "x₁ = 3\nx₂ = 2"
```

### Utility Functions

#### `formatResult(result: number): string`
Sonucu kullanıcı dostu formatta gösterir.

**Parameters:**
- `result` (number): Ham sonuç

**Returns:**
- `string`: Formatlanmış sonuç

**Features:**
- Precision control
- Scientific notation for large/small numbers
- Zero threshold handling

#### `addToHistory(expression: string, result: string): void`
Geçmişe yeni hesaplama ekler.

**Parameters:**
- `expression` (string): Hesaplama ifadesi
- `result` (string): Sonuç

**Side Effects:**
- State update
- LocalStorage sync
- History limit (50 items)

---

## ⚡ Performans

### Optimizasyonlar

1. **Minimal Dependencies**
   - Sadece Math.js external dependency
   - Vanilla JavaScript (framework yok)
   - Bundle size: ~51KB (gzipped ~15KB)

2. **CSS Performansı**
   - Hardware-accelerated animations (transform, opacity)
   - CSS containment where applicable
   - Efficient selectors

3. **JavaScript Performansı**
   - Event delegation
   - Debounced calculations
   - Efficient DOM updates
   - LocalStorage throttling

4. **Rendering**
   - 60 FPS animations
   - Reflow/repaint optimization
   - Layout thrashing prevention

### Benchmark Sonuçları

| İşlem | Süre |
|-------|------|
| Temel hesaplama | <1ms |
| Bilimsel fonksiyon | ~1-2ms |
| Matris (3x3) | ~5ms |
| Denklem çözme | ~10ms |
| Component render | <16ms |

### Bundle Analizi

```
index.html:  ~14KB
style.css:   ~17KB
script.js:   ~20KB
-----------------------
Total:       ~51KB (uncompressed)
Math.js:    ~500KB (CDN)
```

---

## 🌐 Tarayıcı Desteği

| Tarayıcı | Minimum Versiyon | Test Edildi |
|----------|------------------|-------------|
| Chrome | 90+ | ✅ 120+ |
| Firefox | 88+ | ✅ 115+ |
| Safari | 14+ | ✅ 16+ |
| Edge | 90+ | ✅ 120+ |
| Opera | 76+ | ✅ 105+ |

### Gerekli Özellikler

- ✅ ES6+ JavaScript
- ✅ CSS Grid & Flexbox
- ✅ CSS Custom Properties
- ✅ CSS Animations
- ✅ LocalStorage API
- ✅ Fetch API (future)

---

## 🎨 Özelleştirme

### Tema Değiştirme

CSS custom properties'i değiştirerek tema özelleştirin:

```css
:root {
  --color-bg-primary: #your-color;
  --color-accent-primary: #your-accent;
  /* ... */
}
```

### Hassasiyet Ayarlama

Default precision değiştirmek için:

```javascript
state.precision = 15; // 0-15 arası
```

### Yeni Fonksiyon Ekleme

1. HTML'e buton ekleyin
2. Event handler  kaydedin
3. İlgili fonksiyonu implement edin

---

## 🤝 Katkıda Bulunma

Katkılarınızı bekliyoruz! Lütfen şu adımları izleyin:

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/AmazingFeature`)
3. Commit edin (`git commit -m 'Add some AmazingFeature'`)
4. Push edin (`git push origin feature/AmazingFeature`)
5. Pull Request açın

### Geliştirme Kuralları

- Clean, okunabilir kod yazın
- Consistent naming conventions
- Comment ekleyin (ihtiyaç halinde)
- Responsive tasarıma dikkat edin
- Performance optimize edin

---

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için `LICENSE` dosyasına bakın.

---

## 🙏 Teşekkürler

- [Math.js](https://mathjs.org/) - Güçlü matematik kütüphanesi
- [Inter Font](https://rsms.me/inter/) - Modern typography
- [Google Fonts](https://fonts.google.com/) - Font hosting
- Tüm katkıda bulunanlara


<div align="center">

**⭐ Projeyi beğendiyseniz yıldız vermeyi unutmayın!**

Made with Can Sağnak

</div>
