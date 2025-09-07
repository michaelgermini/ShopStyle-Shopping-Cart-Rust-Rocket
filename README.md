# 🛍️ ShopStyle - Mega Menu E-commerce

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![Rust](https://img.shields.io/badge/Rust-1.70+-orange.svg)](https://www.rust-lang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.0+-blue.svg)](https://tailwindcss.com/)

Un site e-commerce moderne avec un **mega menu étendu** à 7 colonnes, développé avec **HTML5**, **TailwindCSS**, **Node.js** et **Rust**. Inclut un démonstrateur HTML autonome et un serveur backend complet.

## 🚀 Quick Start

### Prerequisites
- Node.js installed on your system (v18+)
- Rust installed (optional, for backend development)

### Installation and Launch
```bash
# Clone the repository
git clone https://github.com/your-username/shopstyle.git
cd shopstyle

# Install dependencies
npm install

# Start the server
node server.js
# OR
npm start
```

### Access the Website
Open your browser and go to:
- **http://127.0.0.1:8000**
- **http://localhost:8000**

### Alternative: Standalone Demo
```bash
# Open the standalone HTML demo
# Simply double-click on mega-menu-demo.html in your file explorer
# No server required!
```

## 🎯 Key Features

### 📱 Extended Mega Menu (7 Columns)
1. **🔵 Electronics** - Smartphones, Laptops, Gaming, Audio
2. **👕 Fashion & Lifestyle** - Clothing, New Arrivals, Collections
3. **🏠 Home & Garden** - Home Decor, Kitchen, Smart Home
4. **⚽ Sports & Fitness** - Equipment, Gym, Outdoor, Cycling
5. **💄 Beauty & Health** - Skincare, Makeup, Wellness
6. **📚 Books & Entertainment** - Books, Games, Movies, Music
7. **🛠️ Services & Support** - Shipping, Support, FAQ, Contact

### 🛒 Available Products
- **Smartphones** : iPhone 15 Pro Max ($1,299)
- **Computers** : MacBook Pro 16" ($2,499)
- **Clothing** : Premium Cotton Shirt ($89)
- **Sports** : Mountain Bike Pro ($599)
- **Beauty** : Anti-Aging Face Cream ($89)
- **Books** : The Great Adventure ($19.99)
- **Gaming** : Ultimate Quest RPG ($69.99)
- **Fitness** : Pro Treadmill ($1,299)

### 🎨 Technical Features
- ✅ **Responsive design** (mobile, tablet, desktop)
- ✅ **Smooth animations** and transitions
- ✅ **Functional cart API** with CORS
- ✅ **Dynamic category system**
- ✅ **Navigation without 404 errors**
- ✅ **Icons and thematic colors**

## 📁 Project Structure

```
├── static/
│   ├── index.html                 # Main page with mega menu
│   ├── css/
│   │   └── tailwind.css          # TailwindCSS styles
│   ├── products/                  # Individual product pages
│   │   ├── product-smartphone.html
│   │   ├── product-laptop.html
│   │   ├── product-shirt.html
│   │   ├── product-bike.html
│   │   └── ...
│   ├── categories/                # Category pages
│   │   └── category.html          # Dynamic category system
│   └── pages/                     # Various pages
│       ├── cart.html
│       ├── contact.html
│       ├── about.html
│       └── ...
├── server.js                      # Node.js server
├── package.json                   # NPM configuration
├── mega-menu-demo.html            # Standalone HTML demo
├── CONTRIBUTING.md                # Contribution guidelines
├── LICENSE                        # MIT License
└── README.md                      # Documentation
```

## 🔧 API Endpoints

The server provides the following endpoints:

### Cart
- `GET /cart` - Retrieve cart contents
- `GET /cart/total` - Get cart total
- `POST /cart/add` - Add product to cart
- `DELETE /cart/remove/<name>` - Remove product from cart

### Products and Categories
- All static pages are served automatically
- Dynamic category system via URL parameters
- Example: `/categories/category.html?cat=sports`

## 🎨 Technologies Used

- **Frontend** : HTML5, CSS3, TailwindCSS
- **Backend** : Node.js with native HTTP server
- **Animations** : CSS transitions and keyframes
- **Responsive** : Mobile-first design
- **API** : RESTful with CORS handling

## 🚀 Deployment

### Development
```bash
npm install
npm start
```

### Production
```bash
npm run build-css  # Compile TailwindCSS
npm start
```

### Standalone Demo
```bash
# Just open mega-menu-demo.html in your browser
# No server required!
```

## 📱 Mega Menu Features

### Interactive Navigation
- **Hover** : Smooth opening animation
- **Clicks** : Navigation to correct pages
- **Sub-categories** : Hierarchical organization
- **Icons** : Intuitive visual interface

### Dynamic Content
- **URL Categories** : `?cat=electronics`, `?cat=sports`
- **Related Products** : Automatic suggestions
- **Updated Prices** : Real-time display
- **Breadcrumb Navigation** : User orientation

## 🎯 Strengths

### ✅ User Experience
- Modern and intuitive interface
- Smooth navigation without lag
- Responsive design on all platforms
- Professional animations

### ✅ Performance
- Optimized Node.js server
- Fast page loading
- Efficient cache management
- Lightweight and reactive API

### ✅ Maintainability
- Organized and modular code
- Scalable architecture
- Complete documentation
- Easy addition of new features

## 🔧 Troubleshooting

### Common Issues
- **Port occupied** : `netstat -ano | findstr :8000`
- **Server won't start** : Check if Node.js is installed
- **CORS errors** : Server configured to handle them
- **Files not found** : Check folder structure

### Useful Commands
```bash
# Check port
netstat -ano | findstr :8000

# Kill a process
taskkill /PID <PID> /F

# Restart server
node server.js
```

## 📞 Support

For any questions or issues:
- Check browser console (F12)
- Check server logs
- Test different browsers

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎉 Final Result

**ShopStyle** is now a complete e-commerce website with:
- ✅ Professional mega menu with 7 columns
- ✅ 20+ detailed product pages
- ✅ Dynamic category system
- ✅ Functional cart API
- ✅ Responsive and modern design
- ✅ Error-free navigation

**Ready for production!** 🚀✨

---

*Developed with ❤️ for an exceptional e-commerce experience*

---

## 📊 Project Stats

- **⭐ Stars**: GitHub stars
- **🍴 Forks**: GitHub forks
- **🐛 Issues**: Bug reports and feature requests
- **📈 Contributors**: Community contributors
- **💻 Languages**: HTML, CSS, JavaScript, Rust

## 🔗 Links

- **📱 Demo**: [Live Demo](https://your-username.github.io/shopstyle)
- **📖 Documentation**: [Wiki](https://github.com/your-username/shopstyle/wiki)
- **🐛 Issues**: [GitHub Issues](https://github.com/your-username/shopstyle/issues)
- **💬 Discussions**: [GitHub Discussions](https://github.com/your-username/shopstyle/discussions)

---

**Made with ❤️ by the ShopStyle Team**