# AI Image Enhancer

A powerful web application that transforms and enhances images using AI technology. Built with Next.js, Together AI, and Cloudinary.

## 🌟 Features

- AI-powered image enhancement using the FLUX.1-depth model
- Real-time image processing
- Cloud storage integration with Cloudinary
- Dark/Light mode support
- Responsive design
- Modern UI with smooth animations

## 🚀 Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS, Framer Motion
- **AI Integration**: Together AI (using black-forest-labs/FLUX.1-depth model)
- **Image Storage**: Cloudinary
- **Styling**: Tailwind CSS

## 💻 Getting Started

### Prerequisites

- Node.js 16.x or later
- npm or yarn
- Together AI API key
- Cloudinary account

### Installation

1. Clone the repository:
```bash
git clone https://github.com/IbrarArif/AI-Image-Enhancer-App.git
cd AI-Image-Enhancer-App
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add:
```bash
TOGETHER_API_KEY=your_together_api_key
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🎨 How It Works

1. Users upload an image through the web interface
2. The image is stored in Cloudinary for reliable access
3. The Together AI API processes the image using the FLUX.1-depth model
4. The enhanced image is returned and displayed to the user

## 📝 Environment Variables

- `TOGETHER_API_KEY`: Your Together AI API key
- `CLOUDINARY_NAME`: Your Cloudinary cloud name
- `CLOUDINARY_API_KEY`: Your Cloudinary API key
- `CLOUDINARY_API_SECRET`: Your Cloudinary API secret

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details

## 👨‍💻 Author

**Malik Ibrar**

## 🙏 Acknowledgments

- [Together AI](https://www.together.ai/) for their powerful AI API
- [black-forest-labs](https://github.com/black-forest-labs) for the FLUX.1-depth model
- [Cloudinary](https://cloudinary.com/) for image storage solutions
